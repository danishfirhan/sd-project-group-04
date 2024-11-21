'use client';
import slugify from 'slugify';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { createEvent, updateEvent } from '@/lib/actions/event.actions';
import { insertEventSchema, updateEventSchema } from '@/lib/validator';
import { Event } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { UploadButton } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';

type ClientUploadedFileData<T> = {
    url: string;
    key: string;
    uploadedBy?: T;
};

export default function EventForm({
    type,
    event,
    eventId,
}: {
    type: 'Create' | 'Update';
    event?: Event;
    eventId?: string;
}) {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof insertEventSchema>>({
        resolver: type === 'Update' ? zodResolver(updateEventSchema) : zodResolver(insertEventSchema),
        defaultValues: event && type === 'Update'
            ? {
                ...event,
                title: event.name, 
                ticketPrice: Number(event.ticketPrice),
                availableTickets: Number(event.availableTickets),
                isFeatured: event.isFeatured || false,
                date: new Date(event.date), 
            }
            : {
                title: '',
                slug: '',
                date: new Date(), 
                venue: '',
                ticketPrice: 0,
                availableTickets: 0,
                images: [],
                description: '',
                isFeatured: false,
            },
    });

    useEffect(() => {
        if (event && type === 'Update') {
            form.setValue('date', new Date(event.date.toISOString().split('T')[0])); 
        }
    }, [event, type, form]);

    const onSubmit = async (values: z.infer<typeof insertEventSchema>) => {
        const formattedValues = {
            ...values,
            name: values.title, 
            ticketPrice: Number(values.ticketPrice), // Ensure ticketPrice is a number
            availableTickets: Number(values.availableTickets), // Ensure availableTickets is a number
            date: new Date(values.date), 
        };

        try {
            // Disable the submit button during submission
            form.formState.isSubmitting = true;

            if (type === 'Create') {
                const res = await createEvent(formattedValues);
                if (!res.success) {
                    throw new Error(res.message);
                }
                toast({ description: res.message });
                router.push(`/admin/events`);
            } else if (type === 'Update') {
                if (!eventId) {
                    router.push(`/admin/events`);
                    return;
                }
                const res = await updateEvent({ ...formattedValues, id: eventId });
                if (!res.success) {
                    throw new Error(res.message);
                }
                toast({ description: res.message });
                router.push(`/admin/events`);
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                description: (error as Error).message,
            });
        } finally {
            // Re-enable the submit button after submission
            form.formState.isSubmitting = false;
        }
    };

    const images: string[] = form.watch('images') || [];

    return (
        <Form {...form}>
            <form
                method="post"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Event Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter event title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Enter event slug"
                                            className="pl-8"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                form.setValue(
                                                    'slug',
                                                    slugify(form.getValues('title'), { lower: true })
                                                );
                                            }}
                                        >
                                            Generate
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
                                        onChange={e => field.onChange(e.target.value)} // Ensure value is a string
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        ref={field.ref}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="venue"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Venue</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter event venue" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="ticketPrice"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Ticket Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter ticket price"
                                        {...field}
                                        onChange={e => field.onChange(Number(e.target.value) || 0)} // Convert to number
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="availableTickets"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Available Tickets</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter available tickets"
                                        {...field}
                                        onChange={e => field.onChange(Number(e.target.value) || 0)} // Convert to number
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                            <FormItem className="w-full">
                                <FormLabel>Images</FormLabel>
                                <Card>
                                    <CardContent className="space-y-2 mt-2 min-h-48">
                                        <div className="flex-start space-x-2">
                                            {images.map((image: string) => (
                                                <Image
                                                    key={image}
                                                    src={image}
                                                    alt="Event Image"
                                                    width={100}
                                                    height={100}
                                                />
                                            ))}
                                        </div>
                                        <UploadButton
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res: ClientUploadedFileData<{ uploadedBy: string | undefined; }>[]) => {
                                                const currentImages = form.getValues('images') || [];
                                                const newImages = res.map(file => file.url);
                                                form.setValue('images', [...currentImages, ...newImages]);
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form .control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter event description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end space-x-2">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {type === 'Create' ? 'Create Event' : 'Update Event'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}