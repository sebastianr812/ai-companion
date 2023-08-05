'use client';

import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';

const routes = [
    {
        icon: Home,
        href: '/',
        label: 'Home',
        pro: false
    },
    {
        icon: Plus,
        href: '/companion/new',
        label: 'Create',
        pro: true
    },
    {
        icon: Settings,
        href: '/settings',
        label: 'Settings',
        pro: false
    },
]

const Sidebar = () => {

    const router = useRouter();
    const pathname = usePathname();
    const onNavigate = (url: string, pro: boolean) => {
        // TODO: Check if they are pro
        return router.push(url);
    }

    return (
        <div className="flex flex-col h-full space-y-4 text-primary bg-secondary">
            <div className="flex justify-center flex-1 p-3">
                <div className="space-y-2">
                    {routes.map((route) => (
                        <div
                            key={route.href}
                            onClick={() => onNavigate(route.href, route.pro)}
                            className={cn('text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                                pathname === route.href && 'bg-primary/10 text-primary'
                            )}>
                            <div className="flex flex-col items-center flex-1 gap-y-2">
                                <route.icon className="w-5 h-5" />
                                {route.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;