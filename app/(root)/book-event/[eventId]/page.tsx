"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm, FormProvider } from 'react-hook-form';

interface Params {
    eventId: string;
}

interface Event {
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
}

export default function BookEventPage({ params }: { params: Params }) {
    const router = useRouter();
    const { eventId } = params;
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const methods = useForm();
    const { handleSubmit, control, formState: { errors } } = methods;

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`/api/events/${eventId}`);
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`Failed to fetch event details: ${response.status} ${errorMessage}`);
                }
                const eventData = await response.json();
                setEvent(eventData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    const onSubmit = async (data: any) => {
        try {
            // Store registration data temporarily in sessionStorage
            sessionStorage.setItem('registrationData', JSON.stringify({ eventId, ...data }));

            // Redirect to the payment method page
            router.push(`/payment-method?eventId=${eventId}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred during registration');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!event) return <div>No event found.</div>;

    return (
        <div className="p-6 bg-white dark:bg-gray-900 dark:shadow-gray-700 shadow-md rounded-md max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Register for {event.name}</h1>
            <div className="mb-6">
                <p className="mt-2 text-gray-700 dark:text-gray-300">{event.description}</p>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem>
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <>
                                    <FormLabel className="text-gray-900 dark:text-gray-100">Name</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="text"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 sm:text-sm"
                                        />
                                    </FormControl>
                                    {errors.name && <FormMessage className="text-red-500 dark:text-red-400">{String(errors.name.message)}</FormMessage>}
                                </>
                            )}
                        />
                    </FormItem>
                    <FormItem>
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <>
                                    <FormLabel className="text-gray-900 dark:text-gray-100">Email</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="email"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 sm:text-sm"
                                        />
                                    </FormControl>
                                    {errors.email?.message && <FormMessage className="text-red-500 dark:text-red-400">{String(errors.email.message)}</FormMessage>}
                                </>
                            )}
                        />
                    </FormItem>
                    <Button type="submit" className="mt-4 w-full bg-orange-500 text-white dark:bg-orange-600">Proceed to Payment</Button>
                </form>
            </FormProvider>
        </div>
    );
}
