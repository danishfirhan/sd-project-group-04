import ContactUsForm from './contact-us-form';
import React from 'react';

const ContactUs = () => {
return (
<div className="max-w-4xl mx-auto p-8">
    <section className="mb-12">
    <h1 className="text-4xl font-bold text-center mb-6">Get in Touch with MusicRecords2U</h1>
    <p className="text-lg leading-relaxed text-center">
        Have any questions? Reach out to us!
    </p>
    </section>

    <section className="mb-12">
    <ContactUsForm />
    </section>

    <section>
    <h2 className="text-3xl font-semibold text-center mb-8">Come to Our Store</h2>
    <div className="text-left">
        <p>
        <strong>Address:</strong> Unit 6.09, Level 6, Cosway Guesthouse, 88, Jalan Raja Chulan, Kuala Lumpur, 50200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur
        </p>
        <p>
        <strong>Phone:</strong> 016-223 3079
        </p>
        <p>
        <strong>Email:</strong> musicrecords2u@gmail.com
        </p>
        <p>
        Our customer service team is available to assist you:
        </p>
        <ul className="list-none">
        <li>Monday - Friday: 9am - 6pm EST</li>
        <li>Saturday: 10am - 4pm EST</li>
        <li>Sunday: Closed</li>
        </ul>
    </div>
    </section>
</div>
);
};

export default ContactUs;
