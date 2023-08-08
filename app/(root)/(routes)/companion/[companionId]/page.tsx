import CompanionForm from '@/components/CompanionForm';
import { db } from '@/lib/db';
import { auth, redirectToSignIn } from '@clerk/nextjs';

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

    const { userId } = auth();

    // TODO: check for subscription

    if (!userId) {
        return redirectToSignIn();
    }

    const companion = await db.companion.findUnique({
        where: {
            userId,
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