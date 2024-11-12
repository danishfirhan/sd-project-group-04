    // app/(root)/place-event-booking/page.tsx
    import { redirect } from 'next/navigation'
    import { auth } from '@/auth'
    import { Button } from '@/components/ui/button'
    import { Card, CardContent } from '@/components/ui/card'
    import { getUserById } from '@/lib/actions/user.actions'
    import { formatCurrency } from '@/lib/utils'
    import { getSelectedEvent } from '@/lib/actions/event.actions' // Add this line to import getSelectedEvent
    import PlaceEventBookingForm from './place-event-booking-form'

    export const metadata = {
    title: `Place Event Booking`,
    }

    export default async function PlaceEventBookingPage() {
    const session = await auth()
    const user = await getUserById(session?.user.id!)
    const eventId = 'b52c2c42-d877-4323-b716-bca9fe6938da' // Replace with actual event ID
    const selectedEvent = await getSelectedEvent(eventId) // Fetch event details based on selection
    const selectedTicketQuantity = 1 // Replace with actual ticket quantity logic

    if (!user.paymentMethod) redirect('/payment-method')

    return (
        <>
        <h1 className="py-4 text-2xl">Place Event Booking</h1>
        <div className="grid md:grid-cols-3 md:gap-5">
            <div className="overflow-x-auto md:col-span-2 space-y-4">
            <Card>
                <CardContent className="p-4 gap-4">
                <h2 className="text-xl pb-4">Event Details</h2>
                {selectedEvent ? (
                    <>
                        <p>{selectedEvent.name}</p>
                        <p>{selectedEvent.date.toDateString()}</p>
                        <p>{selectedEvent.venue}</p>
                    </>
                ) : (
                    <p>Event details not available</p>
                )}
                <div>
                    <Button variant="outline">Edit</Button>
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-4 gap-4">
                <h2 className="text-xl pb-4">Payment Method</h2>
                <p>{user.paymentMethod}</p>
                <div>
                    <Button variant="outline">Edit</Button>
                </div>
                </CardContent>
            </Card>
            </div>
            
            <div>
            <Card>
                <CardContent className="p-4 gap-4 space-y-4">
                <div className="flex justify-between">
                    <div>Total Price</div>
                    <div>{selectedEvent && typeof selectedEvent.ticketPrice === 'number' ? formatCurrency(selectedEvent.ticketPrice * selectedTicketQuantity) : 'N/A'}</div>
                </div>
                <PlaceEventBookingForm />
                </CardContent>
            </Card>
            </div>
        </div>
        </>
    )
    }
