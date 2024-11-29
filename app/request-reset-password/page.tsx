"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

// Simulate sending the reset link via the API route
const sendResetPasswordEmail = async (email: string) => {
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds to simulate API request

    console.log(`Sending password reset link to ${email}`); // Use the email parameter

    return { success: true };
};

const RequestResetPassword = () => {
    const [email, setEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // State to manage success message visibility

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate sending the password reset email
        await sendResetPasswordEmail(email); // Simulated API request to send the reset link

        // Set success state
        setIsSuccess(true);
        toast({
            description: 'Password reset link has been sent! Please check your email.',
        });
        setEmail(''); // Clear the email input
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <CardTitle className="text-center">Request Password Reset</CardTitle>
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

export default RequestResetPassword;