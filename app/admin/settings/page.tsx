'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';

const adminSettingsSchema = z.object({
    adminEmail: z.string().email('Invalid email'),
    adminName: z.string().min(2, 'Name must be at least 2 characters'),
    featureToggle: z.boolean(),
});

// Define types for your form data
type AdminSettingsFormValues = z.infer<typeof adminSettingsSchema>;

const AdminSettingsPage = () => {
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<AdminSettingsFormValues>({
        resolver: zodResolver(adminSettingsSchema),
        defaultValues: {
            adminEmail: '',
            adminName: '',
            featureToggle: false,
        },
    });

    // Handle form submission
    const onSubmit = async (data: AdminSettingsFormValues) => {
        setIsSaving(true);
        console.log('Admin Settings Updated:', data);
        // Here, you could send the form data to your API or backend service

        setTimeout(() => {
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-semibold mb-6">Admin Settings</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Admin Name */}
                    <FormField
                        control={form.control}
                        name="adminName"
                        render={({ field }) => (
                            <FormItem>
                                <label className="block text-sm font-medium text-gray-700">Admin Name</label>
                                <FormControl>
                                    <Input placeholder="Admin Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Admin Email */}
                    <FormField
                        control={form.control}
                        name="adminEmail"
                        render={({ field }) => (
                            <FormItem>
                                <label className="block text-sm font-medium text-gray-700">Admin Email</label>
                                <FormControl>
                                    <Input type="email" placeholder="Admin Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Feature Toggle */}
                    <FormField
                        control={form.control}
                        name="featureToggle"
                        render={({ field }) => (
                            <FormItem>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        checked={field.value}
                                        onChange={field.onChange}
                                    />
                                    <span className="text-sm font-medium text-gray-700">Enable Feature</span>
                                </label>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AdminSettingsPage;
