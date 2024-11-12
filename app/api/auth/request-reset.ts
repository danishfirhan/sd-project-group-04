// pages/api/auth/request-reset.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { generateResetToken } from '@/lib/token-utils';  // Ensure token generation logic
import { updateResetToken } from '@/lib/db-actions';  // Use the correct import path
import { getUserByEmail } from '@/lib/db-actions';  // Fetch the user by email from the database
import { sendResetPasswordEmail } from '@/lib/nodemailer';  // Use the Nodemailer function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    // Validate email input
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        // Step 1: Fetch the user by email
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Step 2: Generate a reset token and set expiry (usually 1 hour from now)
        const token = generateResetToken();
        const expiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Step 3: Update the reset token and expiry in the database
        const updated = await updateResetToken(email, token, expiry);

        if (!updated) {
            return res.status(400).json({ message: 'Failed to update reset token in the database' });
        }

        // Step 4: Generate the reset link that the user will click
        const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}`;

        // Step 5: Send the reset password email using Nodemailer
        await sendResetPasswordEmail(user.email, resetLink, user.name);

        return res.status(200).json({ message: 'Password reset link sent successfully!' });
    } catch (error) {
        console.error('Error processing reset request:', error);
        return res.status(500).json({ message: 'Failed to send reset link.' });
    }
}
