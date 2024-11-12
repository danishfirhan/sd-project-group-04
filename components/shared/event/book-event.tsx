// components/shared/event/book-event.tsx
"use client"; // Add this line to mark the component as a client component

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { addItemToBookings } from '@/lib/actions/booking.actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface Event {
    id: string;
    // Add other properties of the event object as needed
}

export default function BookEvent({ event }: { event: Event }) {
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleBooking = async () => {
        startTransition(async () => {
            const res = await addItemToBookings({
                eventId: event.id,
                qty: 1, // Default to 1 ticket
            });

            toast({
                variant: res.success ? 'default' : 'destructive',
                description: res.message,
            });

            if (res.success) {
                router.push(`/book-event/${event.id}`);            
            }
        });
    };

    return (
        <Button onClick={handleBooking} disabled={isPending}>
            {isPending ? 'Booking...' : 'Book Event'}
        </Button>
    );
}