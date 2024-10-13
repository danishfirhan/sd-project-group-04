import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/db/drizzle';
import { users } from '@/db/schema'; // Ensure you have the correct import for users
import { eq } from 'drizzle-orm';

// Define the User type
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    password: string | null;
    emailVerified: Date | null;
    image: string | null;
    address: {
        fullName: string;
        streetAddress: string;
        // other address fields...
    } | null;
    paymentMethod: string | null;
    createdAt: Date | null;
    resetToken?: string; // Optional if it may not exist
    resetTokenExpiry?: Date; // Optional if it may not exist
}

// Define the return type of verifyToken function
type VerifyTokenResponse = User | null;

// Function to hash the password
async function hashPassword(password: string) {
    const saltRounds = 10; // You can adjust this as needed
    return bcrypt.hash(password, saltRounds);
}

// Function to verify the token
async function verifyToken(token: string): Promise<VerifyTokenResponse> {
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.resetToken, token), // Check for resetToken in the user table
    });

    // Check if user exists
    if (!user) {
        return null; // Return null if no user is found
    }

    // Check if the token is valid and hasn't expired
    // Ensure these properties exist on the user object
    if (user.resetTokenExpiry && user.resetTokenExpiry > new Date()) {
        return user as VerifyTokenResponse; // Type assertion
    }
    

    return null; // Return null if the token is invalid
}

export async function POST(request: Request) {
    const { token, newPassword } = await request.json();

    // Implement your logic to verify the token and reset the password
    try {
        // Verify the token
        const user = await verifyToken(token);

        // Handle the case where user is null
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid or expired token.' },
                { status: 400 }
            );
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);

        // Update the user's password in the database
        await updateUserPassword(user.id, hashedPassword); // TypeScript will now recognize user.id

        return NextResponse.json({ success: true, message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to reset password. Please try again later.' },
            { status: 500 }
        );
    }
}

// Function to update the user's password in the database
async function updateUserPassword(userId: string, hashedPassword: string) {
    await db.update(users)
        .set({
            password: hashedPassword, // Keep the password update
            // Uncomment if your schema supports it
            // resetToken: null, // Remove this line if not in the schema
            // resetTokenExpiry: null, // Remove this line if not in the schema
        })
        .where(eq(users.id, userId)) // Pass eq directly instead of using a function
        .execute(); // Execute the update query
}
