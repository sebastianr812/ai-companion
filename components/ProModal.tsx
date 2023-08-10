'use client';

import useProModal from "@/hooks/use-pro-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";

const ProModal = () => {

    const proModal = useProModal();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onSubscribe = async () => {
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

    if (!isMounted) {
        return null
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        Upgrade to Pro
                    </DialogTitle>
                    <DialogDescription className="space-y-2 text-center">
                        Create <span className="font-medium text-sky-500">Custom AI</span> Companions!
                    </DialogDescription>
                </DialogHeader>
                <Separator className="bg-primary/10" />
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">
                        $9
                        <span className="text-sm font-normal">.99 /mo</span>
                    </p>
                    <Button
                        disabled={loading}
                        variant='premium'
                        onClick={onSubscribe}>
                        Subscribe
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProModal;