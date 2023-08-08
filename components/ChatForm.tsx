'use client';

import { ChangeEvent, FC, FormEvent } from 'react'
import { type ChatRequestOptions } from 'ai';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizonal } from 'lucide-react';

interface ChatFormProps {
    isLoading: boolean;
    input: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
}

const ChatForm: FC<ChatFormProps> = ({
    input,
    handleInputChange,
    isLoading,
    onSubmit
}) => {
    return (
        <form onSubmit={onSubmit} className='flex items-center py-4 border-t border-primary/10 gap-x-2'>
            <Input
                disabled={isLoading}
                value={input}
                onChange={handleInputChange}
                placeholder='Type a message'
                className='rounded-lg bg-primary/10' />
            <Button
                disabled={isLoading}
                variant='ghost'>
                <SendHorizonal className='w-6 h-6 ' />
            </Button>
        </form>
    )
}

export default ChatForm