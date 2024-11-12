'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Function to send the reset link via the API route
const sendResetLink = async (email: string) => {
    try {
        const response = await fetch('/api/auth/request-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }), // Send email to the API route
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, message: data.message || 'Failed to send reset link.' };
        }

        return { success: true, message: data.message || 'Password reset link sent successfully!' };
    } catch (error) {
        return { success: false, message: 'An error occurred while sending the reset link.' };
    }
};

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Call the API to send the password reset link
        const response = await sendResetLink(email); // API request to send the reset link

        // Set the message based on the response from the API
        setMessage(response.message);

        // Show toast notification for success or error
        if (response.success) {
            toast({
                description: response.message,
            });
        } else {
            toast({
                variant: 'destructive',
                description: response.message,
            });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <CardTitle className="text-center">Forgot Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to receive a password reset link.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                        />
                        <Button type="submit" className="w-full">
                            Send Reset Link
                        </Button>
                    </form>
                    {/* Display message to the user */}
                    {message && <p className="text-center mt-4">{message}</p>}
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;
