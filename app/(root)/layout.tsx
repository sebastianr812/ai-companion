import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { checkSubscription } from "@/lib/subscription";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {

    const isPro = await checkSubscription();
    return (
        <div className="h-full">
            <Navbar isPro={isPro} />
            <div className="fixed inset-y-0 flex-col hidden w-20 mt-16 md:flex">
                <Sidebar isPro={isPro} />
            </div>
            <main className="h-full pt-16 md:pl-20">
                {children}
            </main>
        </div>
    );
}

export default RootLayout;