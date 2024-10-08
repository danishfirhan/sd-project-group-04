'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { changePassword, updateProfile } from '@/lib/actions/user.actions'
import { updateProfileSchema, changePasswordSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z, ZodObject } from 'zod'

// Function to get the shape of a ZodObject safely
const getShape = (schema: z.ZodTypeAny) => {
    if (schema instanceof ZodObject) {
        return schema.shape;
    }
    return {};
};

// Ensure both schemas are Zod objects and combine their shapes
const combinedSchema = z.object({
    ...getShape(updateProfileSchema),
    ...getShape(changePasswordSchema),
});

const ProfileForm = () => {
    const { data: session, update } = useSession()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof combinedSchema>>({
        resolver: zodResolver(combinedSchema),
        defaultValues: {
            name: session?.user.name || '',
            email: session?.user.email || '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof combinedSchema>) => {
        const { currentPassword, newPassword, confirmNewPassword, ...profileData } = values;

        // Ensure profileData contains the expected properties
        const profileDataForUpdate = {
            name: profileData.name,
            email: profileData.email,
        };

        // Update profile
        const profileRes = await updateProfile(profileDataForUpdate);
        if (!profileRes.success) {
            return toast({
                variant: 'destructive',
                description: profileRes.message,
            });
        }

        // Handle password change if passwords are provided
        if (newPassword && confirmNewPassword) {
            const passwordRes = await changePassword({ currentPassword, newPassword });
            if (!passwordRes.success) {
                return toast({
                    variant: 'destructive',
                    description: passwordRes.message,
                });
            }
        }

        // Update session with new name
        const newSession = {
            ...session,
            user: {
                ...session?.user,
                name: values.name,
            },
        }
        await update(newSession);
        toast({
            description: 'Profile updated successfully',
        });

        // Reset form after successful submission
        form.reset({
            name: values.name,
            email: values.email,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        disabled
                                        placeholder="Email"
                                        {...field}
                                        className="input-field"
                                        id="email" // Added id for accessibility
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder="Name"
                                        {...field}
                                        className="input-field"
                                        id="name" // Added id for accessibility
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Password Fields */}
                <div className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Current Password"
                                        {...field}
                                        className="input-field"
                                        id="currentPassword" // Added id for accessibility
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="New Password"
                                        {...field}
                                        className="input-field"
                                        id="newPassword" // Added id for accessibility
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        {...field}
                                        className="input-field"
                                        id="confirmNewPassword" // Added id for accessibility
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Update Profile'}
                </Button>
            </form>
        </Form>
    );
}

export default ProfileForm;
