import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Event } from '@/types';

const EventCard = ({ event }: { event: Event }) => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="p-0 items-center">
                <Link href={`/event/${event.slug}`}>
                    
                </Link>
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
                <div className="grid gap-1.5 text-sm leading-4">
                    <p className="text-xs leading-3">At {event.venue}</p>
                </div>
                <div className="grid gap-1.5 text-sm leading-4">
                    <Link href={`/event/${event.slug}`}>
                        <h2 className="text-sm font-medium">{event.name}</h2>
                    </Link>
                </div>
                <div className="grid gap-1.5 text-sm leading-4">
                    <p className="text-sm">Held On: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-sm">{event.description}</p>
                </div>
                <div className="flex-between gap-4">
                    {parseFloat(event.ticketPrice) > 0 ? (
                        <p className="text-sm">Price: RM{parseFloat(event.ticketPrice).toFixed(2)}</p>
                    ) : (
                        <p className="text-destructive">Free Event</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default EventCard;
