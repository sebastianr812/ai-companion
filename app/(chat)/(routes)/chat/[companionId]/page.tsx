import ChatClient from "@/components/ChatClient";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

interface ChatIdPageProps {
    params: {
        companionId: string;
    }
}

const ChatIdPage = async ({
    params: {
        companionId
    }
}: ChatIdPageProps) => {

    const { userId } = auth();
    if (!userId) {
        return redirectToSignIn();
    }

    const companion = await db.companion.findUnique({
        where: {
            id: companionId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'asc'
                },
                where: {
                    userId
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    if (!companion) {
        return redirect('/');
    }

    return (
        <ChatClient
            companion={companion} />
    );
}

export default ChatIdPage;