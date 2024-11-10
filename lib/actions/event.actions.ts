// lib/actions/event.actions.ts

'use server'

import { count, eq, ilike } from 'drizzle-orm/sql';
import { PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import { formatError } from '../utils';
import db from '@/db/drizzle';
import { events } from '@/db/schema';

// Get all events with pagination and filtering
export async function getAllEvents({
query,
limit = PAGE_SIZE,
page,
}: {
query: string;
limit?: number;
page: number;
}) {
const queryFilter =
    query && query !== 'all' ? ilike(events.name, `%${query}%`) : undefined; // Assuming 'title' is the column name

const data = await db
    .select()
    .from(events)
    .where(queryFilter)
    .offset((page - 1) * limit)
    .limit(limit);

const dataCount = await db
    .select({ count: count() })
    .from(events)
    .where(queryFilter);

return {
    data,
    totalPages: Math.ceil(dataCount[0].count / limit),
};
}

// GET
export async function getEventById(eventId: string) {
    return await db.query.events.findFirst({
        where: eq(events.id, eventId),
    })
    }


// Update an event
export async function updateEvent(id: string, eventData: {
    title: string;
    date: string; // Ensure this is a string in the expected format
    location: string;
    description?: string;
    venue: string;
    ticketPrice: number; // Ensure this is a number
    availableTickets?: number; 
}) {
    try {
        const eventExists = await db.query.events.findFirst({
            where: eq(events.id, id),
        });
        if (!eventExists) throw new Error('Event not found');

        await db.update(events).set({
            name: eventData.title,
            date: new Date(eventData.date), // Ensure this is correctly parsed
            description: eventData.description || undefined,
            venue: eventData.venue,
            ticketPrice: eventData.ticketPrice?.toString(), // Convert to string if needed
            availableTickets: eventData.availableTickets,
        }).where(eq(events.id, id));

        // Revalidate the path for the events page
        revalidatePath('/admin/events');

        return {
            success: true,
            message: 'Event updated successfully',
        };
    } catch (error) {
        console.error("Error updating event:", error); // Add logging
        return { success: false, message: formatError(error) };
    }
}

// Create an event
export async function createEvent(eventData: {
    title: string;
    date: string;
    location: string;
    description?: string; // Optional field
    slug: string;
    venue: string;
    ticketPrice: number; // Ensure this is a number
    availableTickets: number;
}) {
    try {
        const newEvent = await db.insert(events).values({
            id: crypto.randomUUID(),
            name: eventData.title,
            date: new Date(eventData.date),
            description: eventData.description || '', // Use empty string if not provided
            slug: eventData.slug,
            venue: eventData.venue,
            ticketPrice: eventData.ticketPrice.toString(), // Convert number to string
            availableTickets: eventData.availableTickets,
        });

        // Revalidate the path for the events page
        revalidatePath('/admin/events');
        
        return {
            success: true,
            message: 'Event created successfully',
            event: newEvent,
        };
    } catch (error) {
        console.error("Error creating event:", error); // Add logging
        return { success: false, message: formatError(error) };
    }
}


// Delete an event
export async function deleteEvent(id: string) {
try {
    const eventExists = await db.query.events.findFirst({
    where: eq(events.id, id),
    });
    if (!eventExists) throw new Error('Event not found');

    await db.delete(events).where(eq(events.id, id));
    revalidatePath('/admin/events');

    return {
    success: true,
    message: 'Event deleted successfully',
    };
} catch (error) {
    return { success: false, message: formatError(error) };
}
}
