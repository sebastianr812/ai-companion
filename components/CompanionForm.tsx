'use client';

import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRequest, FormValidator } from "@/lib/validators/form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "./ui/form";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

interface CompanionFormProps {
    initalData: Companion | null;
    categories: Category[];
}

const CompanionForm = ({
    categories,
    initalData
}: CompanionFormProps) => {

    const form = useForm<FormRequest>({
        resolver: zodResolver(FormValidator),
        defaultValues: initalData || {
            categoryId: undefined,
            description: '',
            instructions: '',
            name: '',
            seed: '',
            src: ''
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: FormRequest) => {
        console.log(data);
    }
    return (
        <div className="h-full max-w-3xl p-4 mx-auto space-y-2">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="pb-10 space-y-8">
                    <div className="w-full space-y-2">
                        <div>
                            <h3 className="text-lg font-medium">General Information</h3>
                            <p className="text-sm text-muted-foreground">General information about your Companion</p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name='src'
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    Image upload component
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                </form>
            </Form>
        </div>
    );
}

export default CompanionForm;