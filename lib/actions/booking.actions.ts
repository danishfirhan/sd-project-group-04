'use server';
import db from '@/db/drizzle';
import { eventBookings } from '@/db/schema';
import { eq } from 'drizzle-orm'

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
        const result = await db.delete(eventBookings).where(eq(eventBookings.id, id));
        return { success: true, message: 'Booking deleted successfully' };
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw new Error('Could not delete booking');
    }
    
}; 

// return { success: true, message: 'Booking deleted successfully' }; // Adjust this based on your actual implementation
