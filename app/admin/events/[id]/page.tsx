'use client'; // Ensure this component is a Client Component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getEventById } from '@/lib/actions/event.actions';
import EventForm from '@/components/shared/admin/event-form'
import { Event } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const AdminEventPage = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchEvent = async () => {
            if (id) {
                try {
                    const fetchedEvent = await getEventById(id as string);
                    if (fetchedEvent) {
                        setEvent(fetchedEvent);
                    } else {
                        toast({ variant: 'destructive', description: 'Event not found' });
                    }
                } catch (error) {
                    toast({ variant: 'destructive', description: 'Failed to fetch event' });
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchEvent();
    }, [id, toast]);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or skeleton loader
    }

    if (!event) {
        return <div>No event found.</div>; // Handle the case where the event is not found
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold">Update Event</h1>
            <EventForm type="Update" event={event} eventId={id as string} /> {/* Use EventForm instead of UpdateEventForm */}
        </div>
    );
};

export default AdminEventPage;