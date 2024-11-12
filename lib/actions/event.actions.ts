// lib/actions/event.actions.ts

'use server';

import { and, count, desc, eq, ilike } from 'drizzle-orm/sql';
import { PAGE_SIZE } from '../constants';
import { revalidatePath } from 'next/cache';
import { formatError } from '../utils';
import db from '@/db/drizzle';
import { events, eventBookings, eventRegistrations } from '@/db/schema';
import { z } from 'zod';
import { insertEventSchema, updateEventSchema, eventRegistrationSchema } from '../validator';
import { auth } from '@/auth';
import { getUserById } from './user.actions';
import { redirect } from 'next/navigation';

// CREATE
export async function createEvent(data: z.infer<typeof insertEventSchema>) {
    try {
        // Validate and parse the incoming data
        const event = insertEventSchema.parse(data);

        // Construct the new event object
        const newEvent = {
            id: crypto.randomUUID(), // Assuming you generate a unique ID
            name: event.title, // Map title to name
            slug: event.slug, // Now slug is included
            images: event.images || [], // Ensure images is an array
            description: event.description || '', // Default to empty string if not provided
            date: new Date(event.date), // Convert to Date
            venue: event.venue,
            organizer: event.organizer, // Ensure organizer is included
            ticketPrice: event.ticketPrice.toString(), // Convert ticketPrice to string
            availableTickets: event.availableTickets, // Now availableTickets is included
        };

        // Insert the constructed event object into the database
        await db.insert(events).values(newEvent);
        revalidatePath('/admin/events');
        return {
            success: true,
            message: 'Event created successfully',
        };
    } catch (error) {
        return { success: false, message: formatError(error) };
    }
}

// UPDATE
export async function updateEvent(data: z.infer<typeof updateEventSchema>) {
    try {
        const event = updateEventSchema.parse(data);
        const eventExists = await db.query.events.findFirst({
            where: eq(events.id, event.id),
        });
        if (!eventExists) throw new Error('Event not found');
        
        await db.update(events).set({ ...event, ticketPrice: event.ticketPrice.toString() }).where(eq(events.id, event.id));
        revalidatePath('/admin/events');
        return {
            success: true,
            message: 'Event updated successfully',
        };
    } catch (error) {
        return { success: false, message: formatError(error) };
    }
}

// GET Event by ID
export async function getEventById(eventId: string) {
    return await db.query.events.findFirst({
        where: eq(events.id, eventId),
    });
}

// GET Latest Events
export async function getLatestEvents() {
    const data = await db.query.events.findMany({
        orderBy: [desc(events.date)],
        limit: 12,
    });
    return data;
}

// GET Event by Slug
export async function getEventBySlug(slug: string) {
    return await db.query.events.findFirst({
        where: eq(events.slug, slug),
    });
}

// GET All Categories (Event Venues)
export async function getAllVenues() {
    const data = await db
        .selectDistinctOn([events.venue], { name: events.venue })
        .from(events)
        .orderBy(events.venue);
    return data;
}

// GET Featured Events
export async function getFeaturedEvents() {
    const data = await db.query.events.findMany({
        where: eq(events.isFeatured, true),
        orderBy: [desc(events.date)],
        limit: 4,
    });
    return data;
}

// GET All Events with filters and pagination
export async function getAllEvents({
    query,
    limit = PAGE_SIZE,
    page,
    venue,
    date,
    sort,
}: {
    query: string;
    venue: string;
    limit?: number;
    page: number;
    date?: string;
    sort?: string;
}) {
    const queryFilter = query && query !== 'all' ? ilike(events.name, `%${query}%`) : undefined;
    const venueFilter = venue && venue !== 'all' ? eq(events.venue, venue) : undefined;
    const dateFilter = date ? eq(events.date, new Date(date)) : undefined;
    
    const order = sort === 'latest' ? desc(events.date) : events.date;
    
    const condition = and(queryFilter, venueFilter, dateFilter);
    const data = await db
        .select()
        .from(events)
        .where(condition)
        .orderBy(order)
        .offset((page - 1) * limit)
        .limit(limit);

    const dataCount = await db
        .select({ count: count() })
        .from(events)
        .where(condition);

    return {
        data,
        totalPages: Math.ceil(dataCount[0].count / limit),
    };
}

// GET Event of the Day
export async function getEventOfTheDay() {
    const eventOfTheDay = await db.query.events.findFirst({
        where: eq(events.isFeatured, true),
        orderBy: [desc(events.date)],
    });

    if (eventOfTheDay) {
        return {
            id: eventOfTheDay.id,
            title: eventOfTheDay.name,
            description: eventOfTheDay.description,
            date: eventOfTheDay.date,
            venue: eventOfTheDay.venue,
            coverImage: eventOfTheDay.images?.[0] || undefined,
        };
    }

    return null;
}

// DELETE Event
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

export const registerForEvent = async (data: z.infer<typeof eventRegistrationSchema>) => {
    try {
    const validatedData = eventRegistrationSchema.parse(data);
    await db.insert(eventRegistrations).values(validatedData);
    return { success: true, message: 'Registration successful' };
    } catch (error) {
    return { success: false, message: formatError(error) };
}
};
//export async function createEventBooking(data: { name: string; email: string; eventId: string }) {
export const createEventBooking = async () => {
try {
    const session = await auth()
    if (!session) throw new Error('User is not authenticated')
    const user = await getUserById(session?.user.id!)
    if (!user.paymentMethod) redirect('/payment-method')
    
    const selectedEventId = 'some-event-id'; // Define the selectedEventId variable
    const selectedTicketQuantity = 1; // Define the selectedTicketQuantity variable

    // Fetch the selected event details
    const selectedEvent = await db.query.events.findFirst({
        where: eq(events.id, selectedEventId),
    });
    if (!selectedEvent) throw new Error('Selected event not found');

    const eventBooking = {
        userId: user.id,
        eventId: selectedEventId, // You'll need to capture this from the selected event
        ticketQuantity: selectedTicketQuantity, // Capture this as well
        paymentMethod: user.paymentMethod,
        totalPrice: (selectedTicketQuantity * parseFloat(selectedEvent.ticketPrice)).toString(), // Calculate total price based on ticket price
        name: user.name, // Add the name property
        email: user.email, // Add the email property
    }

    const insertedBookingId = await db.transaction(async (tx) => {
    const insertedBooking = await tx.insert(eventBookings).values(eventBooking).returning()
    return insertedBooking[0].id
    })

    if (!insertedBookingId) throw new Error('Event booking failed')

    // Redirect to the event booking confirmation or event history
    redirect(`/event/${insertedBookingId}/confirmation`)
} catch (error) {
    // Handle errors (e.g., show error message)
    return { success: false, message: formatError(error) }
}
}

type DBEvent = {
    id: string;
    name: string;
    slug: string;
    images: string[];
    description: string;
    date: Date;
    venue: string;
    ticketPrice: string;
    availableTickets: number;
    isFeatured: boolean | null;
    createdAt: Date;
};

// Function to get event by ID
export const getSelectedEvent = async (eventId: string): Promise<DBEvent | null> => {
    try {
      // Query the database for the event details using the provided eventId
        const event = await db.select()
            .from(events)
            .where(eq(events.id, eventId))
            .limit(1);
    
        // If event is found, return the first (and only) result
        return event.length > 0 ? event[0] : null;
        } catch (error) {
        console.error('Error fetching event details:', error);
        throw new Error('Failed to fetch event details');
        }
    };