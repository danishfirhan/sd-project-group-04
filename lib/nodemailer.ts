// lib/nodemailer.ts
import nodemailer from 'nodemailer';

// Create a transporter using SMTP (you can replace with your email service provider's details)
export const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as an example, change according to your provider
    auth: {
        user: 'danishfirhan05@gmail.com',  // your email (e.g., 'example@gmail.com')
        pass: 'tbmi hlls vzfj mggc',  // your email password or app-specific password
    },
});

// Function to send a reset password email
export const sendResetPasswordEmail = async (to: string, resetLink: string, name: string) => {
    const mailOptions = {
        from: `"MusicRecords2U" <${process.env.EMAIL_USER}>`,  // Sender email
        to,  // Recipient email
        subject: 'Password Reset Request',
        html: `
            <p>Hi ${name},</p>
            <p>We received a request to reset the password for your account. You can reset your password by clicking the link below:</p>
            <a href="${resetLink}" target="_blank" rel="noopener noreferrer">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
            <p>Thanks,</p>
            <p>Your team at MusicRecords2U</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Failed to send reset password email');
    }
};
