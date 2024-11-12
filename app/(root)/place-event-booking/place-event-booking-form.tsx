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

export default function PlaceEventBookingForm() {
    const { formState: { isSubmitting, errors } } = useForm()

    const PlaceEventBookingButton = () => {
        const pending = isSubmitting
        return (
            <Button disabled={pending} className="w-full">
                {pending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                ) : (
                    <Check className="w-4 h-4" />
                )}{' '}
                Place Event Booking
            </Button>
        )
    }

    // Validate the event ID before submitting
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const eventId = 'some-event-id'; // Replace with the actual event ID you are using

        // Validate the event ID
        if (!isValidUUID(eventId)) {
            console.error('Invalid event ID:', eventId);
            return; // Handle invalid UUID case
        }

        // Call the action to create the event booking
        const result = await createEventBooking();
        if (!result.success) {
            console.error('Error creating booking:', result.message);
        }
    }

    return (
        <form onSubmit={onSubmit} className="w-full">
            <PlaceEventBookingButton />
            {errors.eventId && (
                <p className="text-destructive py-4">{String(errors.eventId.message)}</p>
            )}
        </form>
    )
}