import { StreamingTextResponse, LangChainStream } from "ai";
import { auth, currentUser } from '@clerk/nextjs';
import { CallbackManager } from 'langchain/callbacks';
import { NextResponse } from "next/server";
import { MemoryManager } from "@/lib/memory";
import { rateLimit } from "@/lib/rate-limit";
import { db } from "@/lib/db";
import { Replicate } from 'langchain/llms/replicate';

export async function POST(
    req: Request,
    { params }: { params: { chatId: string } }
) {
    try {
        const { prompt } = await req.json();
        const user = await currentUser();

        if (!user || !user.firstName || !user.id) {
            return new NextResponse('unauthorized', { status: 401 });
        }

        const identifier = req.url + '-' + user.id;
        const { success } = await rateLimit(identifier);

        if (!success) {
            return new NextResponse('rate limit exceeded', { status: 429 });
        }

        const companion = await db.companion.update({
            where: {
                id: params.chatId,
                userId: user.id,
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: 'user',
                        userId: user.id
                    }
                }
            }
        });

        if (!companion) {
            return new NextResponse('companion not found', { status: 404 });
        }

        const name = companion.id;
        const companion_file_name = name + '.txt'

        const companionKey = {
            companionName: name,
            userId: user.id,
            modelName: 'llama2-13b'
        }

        const memoryManager = await MemoryManager.getInstance();

        const records = await memoryManager.readLatestHistory(companionKey);

        if (records.length === 0) {
            await memoryManager.seedChatHistory(companion.seed, '\n\n', companionKey);
        }

        await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);

        const recentChatHistory = await memoryManager.readLatestHistory(companionKey);

        const similarDocs = await memoryManager.vectorSearch(recentChatHistory, companion_file_name);

        let relevantHistory = '';

        if (!!similarDocs && similarDocs.length !== 0) {
            relevantHistory = similarDocs.map((doc) => doc.pageContent).join('\n');
        }

        const { handlers } = LangChainStream();

        const model = new Replicate({
            model: "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
            input: {
                max_length: 2048
            },
            apiKey: process.env.REPLICATE_API_TOKEN,
            callbackManager: CallbackManager.fromHandlers(handlers)
        });
        model.verbose = true;

        const resp = String(
            await model.call(`
            ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${name}:
             prefix.
             ${companion.instructions}

             Below are the relevant details about ${name}'s past and the conversation you are in.
             ${relevantHistory}

             ${recentChatHistory}\n${name}:
            `)
                .catch(console.error)
        );




    } catch (e) {
        return new NextResponse('inernal error POST:CHAT/chatId', { status: 500 });
    }
}