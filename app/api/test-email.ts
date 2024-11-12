// pages/api/test-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sendResetPasswordEmail } from '@/lib/nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const testEmail = 'danishfirhan9@gmail.com';
        const testLink = 'http://localhost:3001/reset-password?token=testToken';
        const testUserName = 'Test User';

        await sendResetPasswordEmail(testEmail, testLink, testUserName);

        return res.status(200).json({ message: 'Test email sent successfully!' });
    } catch (error) {
        console.error('Error sending test email:', error);
        return res.status(500).json({ message: 'Failed to send test email.' });
    }
}
