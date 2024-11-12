    // app/(root)/place-event-booking/page.tsx
    "use client";

    import { useEffect, useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent } from '@/components/ui/card';
    import { formatCurrency } from '@/lib/utils';
    import PlaceEventBookingForm from './place-event-booking-form';

    export default function PlaceEventBookingPage() {
    const [registrationData, setRegistrationData] = useState({ name: '', email: '' });
    const [user, setUser] = useState<{ paymentMethod: string } | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<{ id: string; name: string; date: Date; venue: string; ticketPrice: number } | null>(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem('registrationData');
        if (storedData) {
        setRegistrationData(JSON.parse(storedData));
        }

        // Simulate fetching user and event data, replace with actual fetch logic if needed
        const fetchUserAndEvent = async () => {
        // Replace with actual fetch functions
        const fetchedUser = await fakeFetchUser();
        const fetchedEvent = await fakeFetchEvent();
        setUser(fetchedUser);
        setSelectedEvent(fetchedEvent);
        };

        fetchUserAndEvent();
    }, []);

    if (!user) return <p>Loading...</p>;

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
                <p>{user.paymentMethod || 'No payment method on file'}</p>
                <div>
                    <Button variant="outline">Edit</Button>
                </div>
                </CardContent>
            </Card>
            </div>

            <div>
            <Card>
                <CardContent className="p-4 gap-4 space-y-4">
                <h2 className="text-xl pb-4">Your Details</h2>
                <p>Name: {registrationData.name}</p>
                <p>Email: {registrationData.email}</p>
                <div className="flex justify-between">
                    <div>Total Price</div>
                    <div>{selectedEvent && typeof selectedEvent.ticketPrice === 'number' ? formatCurrency(selectedEvent.ticketPrice) : 'N/A'}</div>
                </div>
                <PlaceEventBookingForm eventId={selectedEvent?.id ?? ''} />
                </CardContent>
            </Card>
            </div>
        </div>
        </>
    );
    }

    // Placeholder functions for fetching user and event
    async function fakeFetchUser() {
    return { paymentMethod: 'Credit Card' };
    }

    async function fakeFetchEvent() {
    return { id: '1', name: 'Concert Event', date: new Date(), venue: 'Concert Hall', ticketPrice: 50 };
    }
