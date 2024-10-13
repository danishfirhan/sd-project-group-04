'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {
    const { toast } = useToast();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            emailNotifications: true,
            smsNotifications: false,
            visibility: 'public',
        }
    });

    const onSubmit = (data: any) => {
        // Handle form submission logic
        toast({ description: 'Settings updated successfully!' });
        console.log('Settings Data:', data);
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-5">Settings</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Notification Preferences */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Notification Preferences</h2>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            {...register('emailNotifications')}
                        />
                        <span>Email Notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            {...register('smsNotifications')}
                        />
                        <span>SMS Notifications</span>
                    </label>
                </div>

                {/* Privacy Settings */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Privacy Settings</h2>
                    <label htmlFor="visibility" className="block mb-1">Profile Visibility</label>
                    <select {...register('visibility')} className="input-field w-full">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                {/* Account Deletion */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Danger Zone</h2>
                    <Button variant="destructive" type="button" onClick={() => alert('Delete account functionality')}>
                        Delete Account
                    </Button>
                </div>

                <Button type="submit" className="w-full">
                    Save Settings
                </Button>
            </form>
        </div>
    );
};

export default SettingsPage;
