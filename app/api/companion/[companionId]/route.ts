import { db } from '@/lib/db';
import { FormValidator } from '@/lib/validators/form';
import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import * as z from 'zod';

export async function PATCH(
    req: Request,
    { params }: { params: { companionId: string } }
) {
    try {
        const body = await req.json();
        const user = await currentUser();

        const {
            categoryId,
            description,
            instructions,
            name,
            seed,
            src
        } = FormValidator.parse(body);

        if (!params.companionId) {
            return new NextResponse('companion id is required', { status: 400 });
        }

        if (!user || !user.id || !user.firstName) {
            return new NextResponse('unauthorized', { status: 401 });
        }

        // check for subscription

        const companion = await db.companion.update({
            where: {
                id: params.companionId,
                userId: user.id
            },
            data: {
                description,
                instructions,
                name,
                seed,
                src,
                categoryId,
                userId: user.id,
                userName: user.firstName
            }
        });

        return NextResponse.json(companion);

    } catch (e) {
        if (e instanceof z.ZodError) {
            return new NextResponse('invalid data passed for api', { status: 400 });
        }
        return new NextResponse('internal error PATCH:COMPANION', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { companionId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('unauthorized', { status: 401 });
        }

        if (!params.companionId) {
            return new NextResponse('companion id is required to delete', { status: 400 });
        }

        const companion = await db.companion.findUnique({
            where: {
                userId,
                id: params.companionId
            }
        });

        if (!companion) {
            return new NextResponse('companion does not exist', { status: 400 });
        }

        await db.companion.delete({
            where: {
                userId,
                id: params.companionId
            }
        });

        return NextResponse.json('ok', { status: 200 });
    } catch (e) {
        return new NextResponse('internal error DELETE:companionId', { status: 500 });
    }
}