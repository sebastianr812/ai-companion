import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import { db } from "@/lib/db";

const RootPage = async () => {
    const categories = await db.category.findMany();

    return (
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories} />
        </div>
    );
}

export default RootPage;