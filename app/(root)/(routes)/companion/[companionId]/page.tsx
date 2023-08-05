import CompanionForm from '@/components/CompanionForm';
import { db } from '@/lib/db';
import { FC } from 'react'

interface pageProps {
    params: {
        companionId: string;
    }
}

const page = async ({
    params: {
        companionId
    }
}: pageProps) => {

    // TODO: check for subscription

    const companion = await db.companion.findUnique({
        where: {
            id: companionId
        }
    });

    const categories = await db.category.findMany();



    return (
        <CompanionForm
            initalData={companion}
            categories={categories} />
    )
}

export default page