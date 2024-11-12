'use client'
import React from 'react'
import { Check, Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { createEventBooking } from '@/lib/actions/event.actions'

// Custom function to validate UUID format
const isValidUUID = (id: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}

export default function PlaceEventBookingForm({ eventId }: { eventId: string }) {
    const {  handleSubmit, formState: { isSubmitting, errors } } = useForm()

    const onSubmit = async () => {
        // Validate the event ID
        if (!isValidUUID(eventId)) {
            console.error('Invalid event ID:', eventId);
            return; // Handle invalid UUID case
        }

        // Call the action to create the event booking
        const result = await createEventBooking();
        if (!result.success) {
            console.error('Error creating booking:', result.message);
        } else {
            // Handle successful booking (e.g., redirect or show a success message)
            console.log('Booking successful:', result);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            
            <PlaceEventBookingButton isSubmitting={isSubmitting} />
            {errors.eventId && (
                <p className="text-destructive py-4">{String(errors.eventId.message)}</p>
            )}
        </form>
    )
}

const PlaceEventBookingButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
    return (
        <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
                <Loader className="w-4 h-4 animate-spin" />
            ) : (
                <Check className="w-4 h-4" />
            )}{' '}
            Place Event Booking
        </Button>
    )
}