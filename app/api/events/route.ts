// app/api/events/route.ts

import { NextResponse } from 'next/server';
import db from '@/db/drizzle'; // Adjust the path to your db connection
import { events } from '@/db/schema'; // Adjust the path to your events schema

export async function GET() {
    try {
        // Fetch all events from the database
        const eventList = await db.select().from(events); // Assuming 'events' is your table

        return NextResponse.json(eventList);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch events' }, { status: 500 });
    }
}
