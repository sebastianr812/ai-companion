import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";

interface MobileSidebarProps {
    isPro: boolean;
}

const MobileSidebar = ({ isPro }: MobileSidebarProps) => {
    return (
        <Sheet>
            <SheetTrigger className="pr-4 md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent side='left' className="w-32 p-0 pt-10 bg-secondary">
                <Sidebar isPro={isPro} />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar;