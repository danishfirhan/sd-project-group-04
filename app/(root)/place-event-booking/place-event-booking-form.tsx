'use client'
import { Check, Loader } from 'lucide-react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { createEventBooking } from '@/lib/actions/event.actions'
import { validate as validateUUID } from 'uuid' // Import UUID functions

export default function PlaceEventBookingForm() {
    const [data, action] = useFormState(createEventBooking, {
        success: false,
        message: '',
    })

    const PlaceEventBookingButton = () => {
        const { pending } = useFormStatus()
        return (
            <Button disabled={pending || !data.totalPrice || data.totalPrice === 'N/A'} className="w-full">
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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const eventId = 'some-event-id'; // Replace with the actual event ID you are using

        // Validate the event ID
        if (!validateUUID(eventId)) {
            console.error('Invalid event ID:', eventId);
            return; // Handle invalid UUID case
        }

        // Call the action to create the event booking
        const result = await action({ eventId });
        if (!result.success) {
            console.error('Error creating booking:', result.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <PlaceEventBookingButton />
            {!data.success && (
                <p className="text-destructive py-4">{data.message}</p>
            )}
        </form>
    )
}