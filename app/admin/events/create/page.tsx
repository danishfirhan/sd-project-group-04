import EventForm from '@/components/shared/admin/event-form'
import { APP_NAME } from '@/lib/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
title: `Create event - ${APP_NAME}`,
}

export default async function CreateEventPage() {
return (
<>
    <h1 className="h2-bold">Create Event</h1>
    <div className="my-8">
    <EventForm type="Create" />
    </div>
</>
)
}
