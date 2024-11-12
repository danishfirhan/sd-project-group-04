'use server'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { insertBookingSchema } from '../validator' // You'll need to create this schema
import db from '@/db/drizzle'
import { bookings, events, users } from '@/db/schema'
import { formatError } from '../utils'
import { PAGE_SIZE } from '../constants'
import { count, desc, eq, sql } from 'drizzle-orm'

// GET
export async function getBookingById(bookingId: string) {
    return await db.query.bookings.findFirst({
        where: eq(bookings.id, bookingId),
        with: {
            user: { columns: { name: true, email: true } },
            event: true, // Assuming you want to get event details
        },
    })
}

export async function getMyBookings({
    limit = PAGE_SIZE,
    page,
}: {
    limit?: number
    page: number
}) {
    const session = await auth()
    if (!session) throw new Error('User  is not authenticated')

    const data = await db.query.bookings.findMany({
        where: eq(bookings.userId, session.user.id!),
        orderBy: [desc(bookings.createdAt)],
        limit,
        offset: (page - 1) * limit,
    })
    const dataCount = await db
        .select({ count: count() })
        .from(bookings)
        .where(eq(bookings.userId, session.user.id!))

    return {
        data,
        totalPages: Math.ceil(dataCount[0].count / limit),
    }
}

// CREATE
export const createBooking = async (eventId: string, qty: number) => {
    try {
        const session = await auth()
        if (!session) throw new Error('User  is not authenticated')

        const user = await db.query.users.findFirst({
            where: eq(users.id, session.user.id!),
        })
        if (!user) throw new Error('User  not found')

        const event = await db.query.events.findFirst({
            where: eq(events.id, eventId),
        })
        if (!event) throw new Error('Event not found')

        if (event.availableTickets < qty) {
            throw new Error('Not enough tickets available')
        }

        const bookingData = insertBookingSchema.parse({
            userId: user.id,
            eventId: event.id,
            qty: qty.toString(),
            totalPrice: (Number(event.ticketPrice) * qty).toString(), // Ensure ticketPrice is a number
        })

        const insertedBookingId = await db.insert(bookings).values({
            ...bookingData,
            qty: qty.toString(),
            totalPrice: (Number(event.ticketPrice) * qty).toString(),
        }).returning()

        // Update event tickets available
        await db
            .update(events)
            .set({
                availableTickets: sql`${events.availableTickets} - ${qty}`,
            })
            .where(eq(events.id, eventId))

        redirect(`/booking/${insertedBookingId[0].id}`)
    } catch (error) {
        return { success: false, message: formatError(error) }
    }
}

// DELETE
export async function deleteBooking(id: string) {
    try {
        const booking = await db.query.bookings.findFirst({
            where: eq(bookings.id, id),
        })
        if (!booking) throw new Error('Booking not found')

        // Optional: Update event tickets available
        await db
            .update(events)
            .set({
                availableTickets: sql`${events.availableTickets} + ${booking.qty}`,
            })
            .where(eq(events.id, booking.eventId!))

        await db.delete(bookings).where(eq(bookings.id, id))
        return {
            success: true,
            message: 'Booking deleted successfully',
        }
    } catch (error) {
        return { success: false, message: formatError(error) }
    }
}

// ADD ITEM TO BOOKINGS
export const addItemToBookings = async ({
    eventId,
    qty,
}: {
    eventId: string;
    qty: number;
}) => {
    try {
        // Call the createBooking function with the provided eventId and qty
        await createBooking(eventId, qty);
        return { success: true, message: 'Booking added successfully!' };
    } catch (error) {
        return { success: false, message: formatError(error) };
    }
};
// Additional functions can be added as needed, such as updating bookings, etc.