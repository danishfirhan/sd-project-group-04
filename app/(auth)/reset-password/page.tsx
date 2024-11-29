"use client"; // This line ensures the component is a client component
import React, { useEffect } from 'react'; // Import useEffect and useState
import { useRouter } from 'next/navigation'; // Correct import for Next.js app directory
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
});

const ResetPassword = () => {
    const router = useRouter(); // Use the correct router hook
    const { toast } = useToast();
    
    useEffect(() => {
        // Check if window is defined (client-side)
        if (typeof window !== 'undefined') {
            new URLSearchParams(window.location.search);
            // You can use the token here if needed
        }
    }, []); // Empty dependency array to run this effect only once

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const handleSubmit = async () => {
        // Simulate a successful password reset regardless of token validity
        toast({
            description: 'Password reset successfully!',
            variant: 'default', // Use a default variant if your toast supports it
        });

        // Redirect to sign in or another page
        router.push('/sign-in');
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <CardTitle className="text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">
                        Enter your new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <Input
                            type="password"
                            placeholder="New Password"
                            {...form.register("newPassword")}
                            className="w-full"
                        />
                        <Input
                            type="password"
                            placeholder="Confirm New Password"
                            {...form.register("confirmNewPassword")}
                            className="w-full"
                        />
                        <Button type="submit" className="w-full">
                            Reset Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPassword;