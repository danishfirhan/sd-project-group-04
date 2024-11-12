/* 'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { updateUserEventPaymentMethod } from '@/lib/actions/user.actions'
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants'
import { paymentMethodSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'

interface PaymentMethodFormProps {
    preferredPaymentMethod: string | null
    eventId: string // Event ID for event-specific payments
}

export default function PaymentMethodForm({
    preferredPaymentMethod,
    eventId,
}: PaymentMethodFormProps) {
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)

    const form = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
            type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
        },
    })

    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    // Set mounted state to true after the component has mounted
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Retrieve registration data from sessionStorage only after the component has mounted
    const registrationData = isMounted ? sessionStorage.getItem('registrationData') : null
    const registration = registrationData ? JSON.parse(registrationData) : null

    // If registration data is not found or it's still in loading state, render a loading indicator
    if (!isMounted) {
        return <div>Loading...</div> // Or any loading UI
    }

    // If registration data is not found, redirect to the event page
    if (!registration) {
        router.push(`/events/${eventId}`)
        return null
    }

    async function onSubmit(values: z.infer<typeof paymentMethodSchema>) {
        startTransition(async () => {
            // Call event-specific payment update action
            const res = await updateUserEventPaymentMethod({ ...values, eventId });

            // Debugging: Log the response
            console.log('Payment method update response:', res);

            if (!res.success) {
                toast({
                    variant: 'destructive',
                    description: res.message,
                });
                return; // Exit if the update was not successful
            }

            // Directly redirect to the place event booking page after payment method is updated
            router.push(`/events`);
        });
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="h2-bold mt-4">Payment Method for {registration.name}&apos;s Registration</h1>
            <p className="text-sm text-muted-foreground">
                Please select your preferred payment method for the event
            </p>

            <Form {...form}>
                <form
                    method="post"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            className="flex flex-col space-y-2"
                                        >
                                            {PAYMENT_METHODS.map((paymentMethod) => (
                                                <FormItem
                                                    key={paymentMethod}
                                                    className="flex items-center space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={paymentMethod}
                                                            checked={field.value === paymentMethod}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {paymentMethod}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Loader className="animate-spin w-4 h-4" />
                            ) : (
                                <ArrowRight className="w-4 h-4" />
                            )}
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
} */