// app/(root)/book-event/page.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Params {
    eventId: string;
}

export default function BookEventPage({ params }: { params: Params }) {
    const router = useRouter();
    const { eventId } = params; // Assuming you pass the event ID in the URL

    useEffect(() => {
        // Fetch event details using the eventId if needed
        // You can also handle loading states here
    }, [eventId]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const registrationData = {
            name: formData.get('name'),
            email: formData.get('email'),
            // Add other fields as necessary
        };

        // Here you would handle the registration logic, e.g., sending data to your backend
        await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        });

        // After successful registration, redirect to the cart or confirmation page
        router.push('/cart'); // Change this to your desired redirect after registration
    };

    return (
        <div>
            <h1>Register for Event</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required />
                </div>
                {/* Add more fields as necessary */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}