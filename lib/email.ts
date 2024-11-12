    // email.ts
    import nodemailer from 'nodemailer';

    export const sendResetEmail = async (email: string, token: string) => {
    try {
        const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER,  // Your email
            pass: process.env.EMAIL_PASSWORD,  // Your email password
        },
        });

        const mailOptions = {
        from: 'danishfirhan05@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You have requested a password reset. Click the link below to reset your password:
        http://localhost:3001/reset-password?token=${token}`,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
    };
