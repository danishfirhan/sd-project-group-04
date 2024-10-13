/*'use client'
import { Button } from '@/components/ui/button'
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { updateEvent } from '@/lib/actions/event.actions'
import { updateEventSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UpdateEventForm({
event,
}: {
event: z.infer<typeof updateEventSchema>
}) {
const router = useRouter()
const form = useForm<z.infer<typeof updateEventSchema>>({
resolver: zodResolver(updateEventSchema),
defaultValues: event,
})
const { toast } = useToast()

async function onSubmit(values: z.infer<typeof updateEventSchema>) {
try {
    const res = await updateEvent(event.id, {
    ...values,
    location: values.venue, // Assuming location is the same as venue
    })
    if (!res.success)
    return toast({
        variant: 'destructive',
        description: res.message,
    })
    toast({
    description: res.message,
    })
    form.reset()
    router.push(`/admin/events`)
} catch (error: any) {
    toast({
    variant: 'destructive',
    description: error.message,
    })
}
}

return (
<Form {...form}>
    <form
    method="post"
    onSubmit={form.handleSubmit(onSubmit)}
    className="space-y-4"
    >
    <div>
        <FormField
        control={form.control}
        name="title"
        render={({ field }: { field: any }) => (
            <FormItem className="w-full">
            <FormLabel>Event Name</FormLabel>
            <FormControl>
                <Input placeholder="Enter event name" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
    <div>
        <FormField
        control={form.control}
        name="date"
        render={({ field }: { field: any }) => (
            <FormItem className="w-full">
            <FormLabel>Event Date</FormLabel>
            <FormControl>
                <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
    <div>
        <FormField
        control={form.control}
        name="venue"
        render={({ field }: { field: any }) => (
            <FormItem className="w-full">
            <FormLabel>Venue</FormLabel>
            <FormControl>
                <Input placeholder="Enter venue" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
    <div>
        <FormField
        control={form.control}
        name="ticketPrice"
        render={({ field }: { field: any }) => (
            <FormItem className="w-full">
            <FormLabel>Ticket Price</FormLabel>
            <FormControl>
                <Input
                type="number"
                placeholder="Enter ticket price"
                {...field}
                />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
    <div>
        <FormField
        control={form.control}
        name="availableTickets"
        render={({ field }: { field: any }) => (
            <FormItem className="w-full">
            <FormLabel>Available Tickets</FormLabel>
            <FormControl>
                <Input
                type="number"
                placeholder="Enter available tickets"
                {...field}
                />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
    <div>
        <FormField
        control={form.control}
        name="description"
        render={({ field }: { field: any }) => (
            <FormItem className="w-full">
            <FormLabel>Description</FormLabel>
            <FormControl>
                <Input
                placeholder="Enter event description"
                {...field}
                />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
    <div className="flex-between">
        <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
        >
        {form.formState.isSubmitting ? 'Submitting...' : `Update Event`}
        </Button>
    </div>
    </form>
</Form>
)
}
*/