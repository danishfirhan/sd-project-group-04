'use server';
import db from '@/db/drizzle';
import { eventBookings } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Function to get all bookings
export const getAllBookings = async () => {
    try {
        const bookings = await db.select().from(eventBookings);
        return bookings;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw new Error('Could not fetch bookings');
    }
};

// Function to delete a booking by ID
export const deleteBooking = async (id: string) => {
    try {
        await db.delete(eventBookings).where(eq(eventBookings.id, id));
        return { success: true, message: 'Booking deleted successfully' };
    } catch (error) {
        console.error('Error deleting booking:', error);
        return { success: false, message: 'Could not delete booking' };
    }
};

// Function to add a booking
export const addItemToBookings = async ({ eventId, qty }: { eventId: string; qty: number }) => {
    try {
        // You might want to retrieve user details from the session or context
        const userId = 'example-user-id'; // Replace with actual user ID from session/context

        // Create a new booking entry
        const newBooking = {
            eventId,
            userId,
            eventName: 'Example Event', // Replace with actual event name retrieval
            name: 'John Doe', // Replace with actual user name retrieval
            email: 'john.doe@example.com', // Replace with actual user email retrieval
            paymentMethod: 'Credit Card', // Replace with actual payment method
            totalPrice: '100.00', // Replace with actual total price calculation
            bookingDate: new Date(),
            status: 'pending',
        };

        // Insert the new booking into the database
        await db.insert(eventBookings).values(newBooking);

        return { success: true, message: 'Booking added successfully' };
    } catch (error) {
        console.error('Error adding booking:', error);
        return { success: false, message: 'Could not add booking' };
    }
};