    import { NextApiRequest, NextApiResponse } from 'next';
    import { hashPassword } from '@/lib/hash'; // Assuming you have a utility to hash passwords
    import { resetPassword } from '@/lib/db-actions'; // Import the resetPassword function

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end(); // Only POST requests allowed

    const { token, newPassword } = req.body;
    
    // Hash the new password before storing it in the database
    const hashedPassword = await hashPassword(newPassword);
    
    // Call the resetPassword function from db-actions to update the password
    const success = await resetPassword(token, hashedPassword);

    // Check if the password reset was successful
    if (success) {
        return res.status(200).json({ message: 'Password reset successfully.' });
    }

    // Return an error if the token was invalid or expired
    return res.status(400).json({ error: 'Invalid or expired token.' });
    }
