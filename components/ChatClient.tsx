'use client';

import { Companion, Message } from '@prisma/client';
import { FC } from 'react'

interface ChatClientProps {
    companion: (Companion & {
        messages: Message[];
        _count: {
            messages: number
        }
    })
}

const ChatClient: FC<ChatClientProps> = ({
    companion
}) => {
    return <div>ChatClient</div>
}

export default ChatClient