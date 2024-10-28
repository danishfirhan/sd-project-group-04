"use client"; // Add this line at the top

import React, { useEffect, useState } from 'react';
import EventList from '@/components/shared/event/event-list';
import { Event } from '@/types'; // Adjust the import path according to your project structure

const EventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Replace with your API endpoint or data fetching logic
                const response = await fetch('/api/events'); // Example API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
            {loading ? (
                <p>Loading events....</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <EventList title="Events" data={events} />
            )}
        </div>
    );
};

export default EventsPage;
