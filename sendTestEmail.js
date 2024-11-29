import nodemailer from 'nodemailer';

// Step 1: Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use another email service like Outlook, Yahoo, etc.
    auth: {
        user: 'danishfirhan05@gmail.com', // Replace with your email
        pass: 'tbmi hlls vzfj mggc',   // Replace with your email password or app-specific password
    },
});

// Step 2: Define the email options
const mailOptions = {
    from: 'no-reply@musicrecords2u.com', // Replace with your email
    to: 'danishfirhan9@gmail.com', // Replace with the recipient's email
    subject: 'Password Reset Request',
    text: 'Hello,\n\nYou requested a password reset. Please click the link below to reset your password:\n\nhttps://musicrecords2u.vercel.app/reset-password\n\nIf you did not request a password reset, please ignore this email.\n\nThank you!',
    // If you want to send HTML content instead, you can use the 'html' property
    // html: '<p>Hello,</p><p>You requested a password reset. Please click the link below to reset your password:</p><a href="https://localhost:3000/reset-password">Reset Password</a><p>If you did not request a password reset, please ignore this email.</p>',
};

// Step 3: Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

// To send the email using the terminal, you need to run this script with Node.js.
// Open your terminal and navigate to the directory containing sendTestEmail.js
// Then run the following command:
// node sendTestEmail.js