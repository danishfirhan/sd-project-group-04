// app/api/events/[eventId]/route.ts
import { NextResponse } from 'next/server';
import { events } from '@/db/schema'; // Adjust the path to your events schema
import db from '@/db/drizzle';
import { eq } from 'drizzle-orm';


// Function to fetch event by ID
async function getEventById(eventId: string) {
    // Simulate fetching from a database
    const event = await db.select().from(events).where(eq(events.id, eventId)).limit(1);
    return event[0] || null;
}

// Handle GET requests to fetch event details
export async function GET(request: Request, { params }: { params: { eventId: string } }) {
    const { eventId } = params;

    // Fetch the event from the simulated database
    const event = await getEventById(eventId);

    if (!event) {
        return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
}