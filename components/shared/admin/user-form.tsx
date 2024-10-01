'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { createUser, updateUser } from '@/lib/actions/user.actions'
import { insertUserSchema, updateUserSchema } from '@/lib/validator'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { USER_ROLES } from '@/lib/constants'

const UserForm = ({
type,
user,
userId,
}: {
type: 'Create' | 'Update'
user?: z.infer<typeof updateUserSchema>
userId?: string
}) => {
const [isClient, setIsClient] = useState(false)
const router = useRouter()
const form = useForm<z.infer<typeof insertUserSchema>>({
resolver: zodResolver(type === 'Update' ? updateUserSchema : insertUserSchema),
defaultValues: user && type === 'Update' ? user : {},
})
const { toast } = useToast()

useEffect(() => {
setIsClient(true)
}, [])

async function onSubmit(values: z.infer<typeof insertUserSchema>) {
if (type === 'Create') {
    const res = await createUser(values)
    if (!res.success) {
    toast({
        variant: 'destructive',
        description: res.message,
    })
    } else {
    toast({
        description: res.message,
    })
    router.push('/admin/users')
    }
}
if (type === 'Update') {
    if (!userId) {
    router.push('/admin/users')
    return
    }
    const res = await updateUser({ ...values, id: userId })
    if (!res.success) {
    toast({
        variant: 'destructive',
        description: res.message,
    })
    } else {
    router.push('/admin/users')
    }
}
}

if (!isClient) {
return null
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
        name="email"
        render={({ field }) => (
            <FormItem className="w-full">
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input
                placeholder="Enter user email"
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
        name="name"
        render={({ field }) => (
            <FormItem className="w-full">
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input placeholder="Enter user name" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
    <div>
        <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
            <FormItem className=" items-center">
            <FormLabel>Role</FormLabel>
            <Select
                onValueChange={field.onChange}
                value={(field.value ?? '').toString()}
                >   
                <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                </FormControl>
                <SelectContent>
                {USER_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                    {role}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            <FormMessage />
            </FormItem>
        )}
        />
    </div>
    {type === 'Create' && (
        <div>
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
            <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                <Input
                    type="password"
                    placeholder="Enter user password"
                    {...field}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        </div>
    )}
    <div className="flex-between">
        <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
        >
        {form.formState.isSubmitting ? 'Submitting...' : `${type} User`}
        </Button>
    </div>
    </form>
</Form>
)
}

export default UserForm
