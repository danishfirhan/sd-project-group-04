'use client'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateEvent } from '@/lib/actions/event.actions';
import { updateEventSchema } from '@/lib/validator';
import { Event } from '@/types';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const UpdateEventForm = ({
    event,
    eventId,
}: {
    event: Event;
    eventId: string;
}) => {
    const form = useForm({
        resolver: zodResolver(updateEventSchema),
        defaultValues: event,
    });

    const { toast } = useToast();

    async function onSubmit(values: any) {
        console.log("Form submitted with values:", values); // Debugging line
        const res = await updateEvent(eventId, values);
        if (!res.success) {
            toast({ variant: 'destructive', description: res.message });
        } else {
            toast({ description: res.message });
        }
    }

    useEffect(() => {
        if (event) {
            form.reset(event);
        }
    }, [event, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Event Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Event Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter event name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Event Date */}
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    {...field}
                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                    onChange={(e) => field.onChange(new Date(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Event Venue */}
                <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Venue</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter event venue" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Ticket Price */}
                <FormField
                    control={form.control}
                    name="ticketPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ticket Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter ticket price" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Available Tickets */}
                <FormField
                    control={form.control}
                    name="availableTickets"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Available Tickets</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter number of tickets" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter event description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Submitting...' : 'Update Event'}
                </Button>
            </form>
        </Form>
    );
};

export default UpdateEventForm;