import { NextResponse } from 'next/server';
import db from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    const { token } = await req.json(); // Expecting the token to be sent in the request body

    if (!token) {
        return NextResponse.json({ success: false, message: 'Token is required' }, { status: 400 });
    }

    try {
        // Find the user with the provided verification token
        const user = await db.query.users.findFirst({
            where: eq(users.verificationToken, token),
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 404 });
        }

        // Update the user's verification status
        await db.update(users)
            .set({ isVerified: true, verificationToken: null })
            .where(eq(users.id, user.id));

        return NextResponse.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to verify email' }, { status: 500 });
    }
}