import { db } from '@/lib/db';
import { FormValidator } from '@/lib/validators/form';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import * as z from 'zod';

export async function POST(req: Request) {
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

        if (!user || !user.id || !user.firstName) {
            return new NextResponse('unauthorized', { status: 401 });
        }

        // check for subscription

        const companion = await db.companion.create({
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
        return new NextResponse('internal error POST:COMPANION', { status: 500 });
    }
}