import ContactUsForm from './contact-us-form';
import React from 'react';

const ContactUs = () => {
return (
<div className="max-w-4xl mx-auto p-8">
    {/* Intro Section */}
    <section className="mb-12">
    <h1 className="text-4xl font-bold text-center mb-6">Get in Touch with MusicRecords2U</h1>
    <p className="text-lg leading-relaxed text-center">
        Have any questions or feedback? Reach out to us!
    </p>
    </section>

    {/* Contact Form */}
    <section className="mb-12">
    <ContactUsForm />
    </section>

{/* Store Details Section */}
<section>
<h2 className="text-3xl font-semibold text-center mb-8">Come to Our Store</h2>

{/* Flexbox to split content into two columns */}
<div className="flex flex-col md:flex-row items-center justify-between">

{/* Google Map on the left */}
<div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.98670403892987!2d101.71165639258797!3d3.150739247441776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc377ca8f5e187%3A0xf4bc30eec8e97264!2sMusicRecords2u!5e0!3m2!1sen!2smy!4v1725978696838!5m2!1sen!2smy"
    width="100%"
    height="400"
    allowFullScreen={true}
    loading="lazy"
    className="rounded-lg border border-gray-300 shadow-lg"
    />
</div>

{/* Store details on the right */}
<div className="md:w-1/2 text-left md:pl-8">
    <p><strong>Address:</strong> Unit 6.09, Level 6, Cosway Guesthouse, 88, Jalan Raja Chulan, Kuala Lumpur, 50200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur</p>
    <p><strong>Phone:</strong> 016-223 3079</p>
    <p><strong>Email:</strong> musicrecords2u@gmail.com</p>
    <p>Our customer service team is available to assist you:</p>
    <ul className="list-none">
    <li>Monday - Friday: 9am - 6pm EST</li>
    <li>Saturday: 10am - 4pm EST</li>
    <li>Sunday: Closed</li>
    </ul>
</div>

</div>
</section>
</div>
);
};

export default ContactUs;