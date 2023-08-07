import Categories from "@/components/Categories";
import Companions from "@/components/Companions";
import SearchInput from "@/components/SearchInput";
import { db } from "@/lib/db";

interface RootPageProps {
    searchParams: {
        categoryId: string;
        name: string;
    }
}

const RootPage = async ({
    searchParams
}: RootPageProps) => {


    const data = await db.companion.findMany({
        where: {
            categoryId: searchParams.categoryId,
            name: {
                search: searchParams.name
            }
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },

    });

    const categories = await db.category.findMany();

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
            <Companions data={data} />
        </div>
    );
}

export default RootPage;