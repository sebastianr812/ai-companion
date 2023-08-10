'use client';

import { FC, useState } from 'react'
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { useToast } from './ui/use-toast';
import axios from 'axios';

interface SubscriptionButtonProps {
    isPro: boolean;
}

const SubscriptionButton: FC<SubscriptionButtonProps> = ({
    isPro = false
}) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);


    const onClick = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get('/api/stripe');

            window.location.href = data.url;
        } catch (e) {
            toast({
                title: 'Something went wrong',
                description: 'Please try again',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            size='sm'
            variant={isPro ? 'default' : 'premium'}
            onClick={onClick}
            disabled={loading} >
            {isPro ? 'Manage Subscription' : 'Upgrade'}
            {!isPro && <Sparkles className='w-4 h-4 ml-2 fill-white' />}
        </Button>
    )
}

export default SubscriptionButton