import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { Menu, Sparkles } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { FC } from 'react'
import { Button } from './ui/button'
import { ThemeToggle } from './theme-toggle'
import MobileSidebar from './MobileSidebar'

const poppins = Poppins({
    weight: '600',
    subsets: ['latin']
})
const Navbar = () => {
    return (
        <div className='fixed z-50 flex items-center justify-between w-full h-16 px-4 py-2 border-b border-primary/10 bg-secondary'>
            <div className='flex items-center'>
                <MobileSidebar />
                <Link href='/'>
                    <h1 className={cn('hidden text-xl font-bold md:block md:text-3xl text-primary', poppins.className)}>
                        Companion.AI
                    </h1>
                </Link>
            </div>
            <div className='flex items-center gap-x-3'>
                <Button
                    variant='premium'
                    size='sm'>
                    Upgrade
                    <Sparkles className='w-4 h-4 ml-2 text-white fill-white' />
                </Button>
                <ThemeToggle />
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Navbar