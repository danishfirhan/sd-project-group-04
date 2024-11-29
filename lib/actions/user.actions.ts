'use server'

import { isRedirectError } from 'next/dist/client/components/redirect'

import { auth, signIn, signOut } from '@/auth'
import {
paymentMethodSchema,
shippingAddressSchema,
signInFormSchema,
signUpFormSchema,
updateUserSchema,
insertUserSchema,
changePasswordSchema
} from '../validator'
import { formatError } from '../utils'
import { hashSync, compareSync } from 'bcrypt-ts-edge'
import db from '@/db/drizzle'
import { users } from '@/db/schema'
import { ShippingAddress } from '@/types'
import { count, desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { PAGE_SIZE } from '../constants'

// USER
export async function signUp(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            confirmPassword: formData.get('confirmPassword'),
            password: formData.get('password'),
        });
        
        const values = {
            id: crypto.randomUUID(),
            ...user,
            password: hashSync(user.password, 10),
        };
        
        await db.insert(users).values(values);
        
        // Sign in without redirecting
        const signInResult = await signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: false, // Prevent automatic redirection
        });

        if (signInResult?.error) {
            return { success: false, message: signInResult.error, stay: true };
        }

        return { success: true, message: 'User created successfully', stay: true };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {
            success: false,
            message: formatError(error).includes(
                'duplicate key value violates unique constraint "user_email_idx"'
            )
            ? 'Email already exists'
            : formatError(error),
            stay: true,
        };
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
    return { success: true, message: 'Sign in successfully' }
    } catch (error) {
    if (isRedirectError(error)) {
        throw error
    }
    return { success: false, message: 'Invalid email or password' }
    }
}

export const SignInWithEmail = async (formData: any) => {
    await signIn('email', {
        email: formData.email,
        redirect: false, // Prevents automatic redirect
    });
    }

    // GET
    export async function getAllUsers({
    limit = PAGE_SIZE,
    page,
    }: {
    limit?: number
    page: number
    }) {
    const data = await db.query.users.findMany({
        orderBy: [desc(users.createdAt)],
        limit,
        offset: (page - 1) * limit,
    })
    const dataCount = await db.select({ count: count() }).from(users)
    return {
        data,
        totalPages: Math.ceil(dataCount[0].count / limit),
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

// DELETE
export async function deleteUser(id: string) {
    try {
    await db.delete(users).where(eq(users.id, id))
    revalidatePath('/admin/users')
    return {
        success: true,
        message: 'User deleted successfully',
    }
    } catch (error) {
    return { success: false, message: formatError(error) }
    }
}

// UPDATE
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
try {
    await db
    .update(users)
    .set({
        name: user.name,
        role: user.role,
    })
    .where(eq(users.id, user.id))
    revalidatePath('/admin/users')
    return {
    success: true,
    message: 'User updated successfully',
    }
} catch (error) {
    return { success: false, message: formatError(error) }
}
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

export async function updateUserPaymentMethod(
data: z.infer<typeof paymentMethodSchema>
) {
try {
    const session = await auth()
    const currentUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session?.user.id!),
    })
    if (!currentUser) throw new Error('User not found')
    const paymentMethod = paymentMethodSchema.parse(data)
    await db
    .update(users)
    .set({ paymentMethod: paymentMethod.type })
    .where(eq(users.id, currentUser.id))
    revalidatePath('/place-order')
    return {
    success: true,
    message: 'User updated successfully',
    }
} catch (error) {
    return { success: false, message: formatError(error) }
}
}
export async function updateUserEventPaymentMethod(data: { type: string, eventId: string }) {
    try {
        // Authenticate user session
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, message: 'Not authenticated' };
        }

        // Retrieve the current user from the database
        const currentUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, session.user.id!),
        });
        if (!currentUser) throw new Error('User not found');

        // Validate and parse payment method
        const paymentMethod = paymentMethodSchema.parse(data);

        // Update the payment method for event payments
        await db
            .update(users)
            .set({ paymentMethod: paymentMethod.type })
            .where(eq(users.id, currentUser.id));

        // Optionally revalidate paths if needed
        revalidatePath('/events');

        return {
            success: true,
            message: 'Event payment method updated successfully',
        };
    } catch (error) {
        return { success: false, message: formatError(error) };
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

interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}

export async function changePassword(data: ChangePasswordData) {
    // Validate data against the schema
    try {
        changePasswordSchema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: error.errors.map(e => e.message).join(', ') };
        }
        // Handle other unexpected errors
        return { success: false, message: 'Validation error' };
    }

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return { success: false, message: 'Not authenticated' };
    }

    const userId = session.user.id;
    if (!userId) {
        return { success: false, message: 'User ID is undefined' };
    }

    const currentUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
    });

    if (!currentUser || !currentUser.password) {
        return { success: false, message: 'User not found or invalid user data' };
    }

    // Validate current password
    const isPasswordValid = compareSync(data.currentPassword, currentUser.password);
    if (!isPasswordValid) {
        return { success: false, message: 'Invalid current password' };
    }

    // Update to the new password
    const newPasswordHash = hashSync(data.newPassword, 10);
    await db.update(users).set({ password: newPasswordHash }).where(eq(users.id, currentUser.id as string));

    return { success: true, message: 'Password updated successfully' };
}
interface ResetPasswordParams {
    token: string; // Assuming token is a string
    newPassword: string; // Assuming newPassword is a string
}

export const resetPassword = async ({ token, newPassword }: ResetPasswordParams) => {
    try {
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
        });

        const data = await response.json();
        return data; // Assuming your API returns a success field
    } catch (error) {
        console.error('Error resetting password:', error);
        return { success: false, message: 'Failed to reset password. Please try again later.' };
    }
};


export const getUserByEmail = async (email: string) => {
    return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
    });
};


// CREATE
export async function createUser(user: z.infer<typeof insertUserSchema>) {
try {
    const newUser = insertUserSchema.parse(user)
    await db.insert(users).values(newUser)
    revalidatePath('/admin/users')
    return {
    success: true,
    message: 'User created successfully',
    }
} catch (error) {
    return { success: false, message: formatError(error) }
}
}