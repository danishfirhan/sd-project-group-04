'use server'

import { isRedirectError } from 'next/dist/client/components/redirect'

import { auth, signIn, signOut } from '@/auth'
import {
shippingAddressSchema,
signInFormSchema,
signUpFormSchema,
} from '../validator'
import { formatError } from '../utils'
import { hashSync } from 'bcrypt-ts-edge'
import db from '@/db/drizzle'
import { users } from '@/db/schema'
import { ShippingAddress } from '@/types'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
// USER
export async function signUp(prevState: unknown, formData: FormData) {
try {
const user = signUpFormSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    confirmPassword: formData.get('confirmPassword'),
    password: formData.get('password'),
})
const values = {
    id: crypto.randomUUID(),
    ...user,
    password: hashSync(user.password, 10),
}
await db.insert(users).values(values)
await signIn('credentials', {
    email: user.email,
    password: user.password,
})
return { success: true, message: 'User created successfully' }
} catch (error) {
if (isRedirectError(error)) {
    throw error
}
return {
    success: false,
    message: formatError(error).includes(
    'duplicate key value violates unique constraint "user_email_idx"'
    )
    ? 'Email is already exist'
    : formatError(error),
}
}
}
export async function signInWithCredentials(
    prevState: unknown,
    formData: FormData
) {
    try {
    const user = signInFormSchema.parse({
        email: formData.get('email'),
        password: formData.get('password'),
    })
    await signIn('credentials', user)
    return { success: true, message: 'Sig in successfully' }
    } catch (error) {
    if (isRedirectError(error)) {
        throw error
    }
    return { success: false, message: 'Invalid email or password' }
    }
}

export const SignOut = async () => {
    await signOut()
}

export async function getUserById(userId: string) {
const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
})
if (!user) throw new Error('User not found')
return user
}

export async function updateUserAddress(data: ShippingAddress) {
try {
    const session = await auth()
    const currentUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session?.user.id!),
    })
    if (!currentUser) throw new Error('User not found')

    const address = shippingAddressSchema.parse(data)
    await db.update(users).set({ address }).where(eq(users.id, currentUser.id))
    revalidatePath('/place-order')
    return {
    success: true,
    message: 'User updated successfully',
    }
} catch (error) {
    return { success: false, message: formatError(error) }
}
}

export async function updateProfile(user: { name: string; email: string }) {
try {
    const session = await auth()
    const currentUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session?.user.id!),
    })
    if (!currentUser) throw new Error('User not found')
    await db
    .update(users)
    .set({
        name: user.name,
    })
    .where(eq(users.id, currentUser.id))

    return {
    success: true,
    message: 'User updated successfully',
    }
} catch (error) {
    return { success: false, message: formatError(error) }
}
}