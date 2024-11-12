    const nodemailer = require('nodemailer');

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
    subject: 'Reset password',
    text: 'Hello, this is a test email sent from the terminal using Nodemailer!',
    };

    // Step 3: Send the email
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
