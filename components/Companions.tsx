import { Companion } from '@prisma/client'
import Image from 'next/image'
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { MessagesSquare } from 'lucide-react'


interface CompanionsProps {
    data: (Companion & {
        _count: {
            messages: number
        }
    })[]
}

const Companions = ({
    data
}: CompanionsProps) => {

    if (data.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center pt-10 space-y-3'>
                <div className='relative w-60 h-60'>
                    <Image
                        alt="empty state"
                        fill
                        className='grayscale'
                        src='/empty.png'
                    />
                </div>
                <p className='text-sm text-muted-foreground'>No companions found</p>
            </div>
        )
    }
    return (
        <div className='grid grid-cols-2 gap-2 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {data.map((companion) => (
                <Card
                    key={companion.id}
                    className='transition border-0 cursor-pointer bg-primary/10 rounded-xl hover:opacity-75'>
                    <Link href={`/chat/${companion.id}`}>
                        <CardHeader className='flex items-center justify-center text-center text-muted-foreground'>
                            <div className='relative w-32 h-32'>
                                <Image
                                    alt='companion image'
                                    src={companion.src}
                                    fill
                                    className='object-cover rounded-xl' />
                            </div>
                            <p className='font-bold'>
                                {companion.name}
                            </p>
                            <p className='text-xs'>
                                {companion.description}
                            </p>
                        </CardHeader>
                        <CardFooter className='flex items-center justify-between text-xs text-muted-foreground'>
                            <p className='lowercase'>@{companion.userName}</p>
                            <div className='flex items-center'>
                                <MessagesSquare className='w-3 h-3 mr-1' />
                                {companion._count.messages}
                            </div>
                        </CardFooter>
                    </Link>
                </Card>
            ))}
        </div>
    )
}

export default Companions