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
    to: 'danishfirhan69420@gmail.com', // Replace with the recipient's email
    subject: 'Email Verification',
    text: 'Hello,\n\nThank you for registering with Music Records 2U! Please verify your email address by clicking the link below:\n\nhttp://localhost:3000/verify-email/\n\nIf you did not create an account, please ignore this email.\n\nThank you!',
    // If you want to send HTML content instead, you can use the 'html' property
    // html: '<p>Hello,</p><p>Thank you for registering with Music Records 2U! Please verify your email address by clicking the link below:</p><a href="https://musicrecords2u.vercel.app/verify-email">Verify Email</a><p>If you did not create an account, please ignore this email.</p>',
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
// node sendVerificationEmail.js