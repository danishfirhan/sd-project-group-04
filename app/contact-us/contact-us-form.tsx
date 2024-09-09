'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ContactFormInputs {
name: string;
email: string;
message: string;
}

export default function ContactUsForm() {
const { register, handleSubmit, formState: { errors } } = useForm<ContactFormInputs>();

const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
// Handle form submission, e.g., sending data to the server
console.log(data);
alert('Message sent successfully');
};

return (
<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
    <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
    </label>
    <Input
        id="name"
        {...register('name', { required: 'Name is required' })}
        className="mt-1 block w-full"
        placeholder="Enter your name"
    />
    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
    </div>

    <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
    </label>
    <Input
        id="email"
        {...register('email', { required: 'Email is required' })}
        className="mt-1 block w-full"
        placeholder="Enter your email"
    />
    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
    </div>

    <div>
    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Type your message here...
    </label>
    <Textarea
        id="message"
        {...register('message', { required: 'Message is required' })}
        className="mt-1 block w-full"
        placeholder="Enter your message"
    />
    {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
    </div>

    <Button type="submit" className="w-full">
    Send Message
    </Button>
</form>
);
}
