import { NextApiRequest, NextApiResponse } from 'next';
import { sendResetPasswordLink, getUserByEmail } from '@/lib/actions/user.actions'; // Adjust the path to your file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            // Fetch the user by email from the database
            const user = await getUserByEmail(email); // Replace this with your own logic

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Send the reset password link
            await sendResetPasswordLink({
                name: user.name, 
                email: user.email
            });

            return res.status(200).json({ message: 'Password reset link sent successfully' });
        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(500).json({ message: 'Failed to send reset link', error: errorMessage });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
