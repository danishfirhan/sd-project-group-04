"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Function to send the reset link via the API route
const sendResetLink = async (email: string) => {
    try {
        const response = await fetch('/api/send-reset-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }), // Send email to the API route
        });

        // Check if the response is ok (status code 2xx)
        if (!response.ok) {
            const data = await response.json();
            return { success: false, message: data.message || 'Failed to send reset link.' };
        }

        return { success: true };
    } catch (error) {
        return { success: false, message: 'An error occurred while sending the reset link.' };
    }
};

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // State to manage success message visibility

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Call the API to send the password reset link
        await sendResetLink(email); // API request to send the reset link
    
        // Set success state even if there was an error
        setIsSuccess(true);
    
        toast({
            description: 'Password reset link has been sent! Please check your email.',
        });
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
                    {isSuccess && (
                        <div className="text-green-600 text-center">
                            A password reset link has been sent to your email.
                        </div>
                    )}
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
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;