'use client';

import { Companion } from '@prisma/client';
import { ElementRef, FC, useEffect, useRef, useState } from 'react'
import ChatMessage, { ChatMessageProps } from './ChatMessage';

interface ChatMessagesProps {
    companion: Companion;
    isLoading: boolean;
    messages: ChatMessageProps[];

}

const ChatMessages: FC<ChatMessagesProps> = ({
    messages = [],
    isLoading,
    companion
}) => {

    const [fakeLoading, setFakeLoading] = useState<boolean>(messages.length === 0 ? true : false);
    const scrollRef = useRef<ElementRef<'div'>>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages.length]);

    return (
        <div className="flex-1 pr-1 over-y-auto">
            <ChatMessage
                isLoading={fakeLoading}
                src={companion.src}
                role='system'
                content={`Hello I am ${companion.name}, ${companion.description}`} />
            {messages.map((message) => (
                <ChatMessage
                    role={message.role}
                    content={message.content}
                    key={message.content}
                    src={message.src} />
            ))}
            {isLoading && (
                <ChatMessage
                    role='system'
                    src={companion.src}
                    isLoading />
            )}
            <div
                ref={scrollRef} />
        </div>
    )
}

export default ChatMessages