// admin/events/[id]/page.tsx

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EventForm from '@/components/shared/admin/event-form'
import { getEventById } from '@/lib/actions/event.actions' // Ensure this function exists
import { APP_NAME } from '@/lib/constants'

export const metadata: Metadata = {
    title: `Update Event - ${APP_NAME}`,
}

export default async function UpdateEventPage({
    params: { id },
}: {
    params: {
        id: string
    }
}) {
    const event = await getEventById(id) // Fetch the event by ID
    if (!event) notFound() // Redirect if the event is not found
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="h2-bold">Update Event</h1>
            <EventForm type="Update" event={event} eventId={event.id} /> {/* Use the EventForm component */}
        </div>
    )
}
