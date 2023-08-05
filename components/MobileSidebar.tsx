import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="pr-4 md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent side='left' className="w-32 p-0 pt-10 bg-secondary">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar;