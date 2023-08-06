'use client';

import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRequest, FormValidator } from "@/lib/validators/form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import ImageUpload from "./ImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface CompanionFormProps {
    initalData: Companion | null;
    categories: Category[];
}

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

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
                                    <ImageUpload
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            name='name'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Elon Musk"
                                            disabled={isLoading}
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your AI Companion will be named
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            name='description'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="CEO & Founder of Tesla, SpaceX"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Short description for your AI Companion
                                    </FormDescription>
                                </FormItem>
                            )} />
                        <FormField
                            name='categoryId'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder='Select a category' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((categeory) => (
                                                <SelectItem
                                                    key={categeory.id}
                                                    value={categeory.id}
                                                >
                                                    {categeory.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a category for your AI
                                    </FormDescription>
                                </FormItem>
                            )} />
                    </div>
                    <div className="w-full space-y-2">
                        <div>
                            <h3 className="text-lg font-medium">Configuration</h3>
                            <p className="text-sm text-muted-foreground9">Detailed instructins for AI behavior</p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name='instructions'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Instructions</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="resize-none bg-background"
                                        rows={7}
                                        disabled={isLoading}
                                        placeholder={PREAMBLE}
                                        {...field} />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail your Companions&apos;s backstory and relevant details
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                </form>
            </Form>
        </div>
    );
}

export default CompanionForm;