import Image from 'next/image';
import React from 'react';

const AboutUs = () => {
return (
<div className="max-w-7xl mx-auto p-8">
    {/* About Us Section */}
    <section className="mb-12">
    <h1 className="text-4xl font-bold text-center mb-6">About MusicRecords2U</h1>
    
    {/* Two Columns for Images */}
    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        {/* Image 1: musicrecords2u-admin.jpg */}
        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
        <Image
            src="/assets/images/musicrecords2u-admin.jpg"
            alt="MusicRecords2U Admin"
            width={500}
            height={500}
            className="w-full rounded-lg object-cover"
        />
        </div>
        
        {/* Image 2: place-2.jpg */}
        <div className="md:w-1/2">
        <Image
            src="/assets/images/place-2.jpg"
            alt="MusicRecords2U Place"
            width={500}
            height={500}
            className="w-full rounded-lg object-cover"
        />
        </div>
    </div>
    
    {/* Description */}
    <p className="text-lg leading-relaxed text-center">
        Welcome to MusicRecords2U, your premier online destination for all your music record needs. At MusicRecords2U, we are dedicated to curating the finest selection of vinyl records to elevate your music experience. Our team of music enthusiasts is committed to providing you with an unparalleled shopping journey. Whether you are seeking classic albums, limited editions, or the latest releases, we have got you covered. We strive to offer competitive prices and top-notch customer service. Thank you for choosing MusicRecords2U, and we cannot wait to help you discover your next favorite record!
    </p>
    </section>

    {/* Testimonials Section */}
    <section>
    <h2 className="text-3xl font-semibold text-center mb-8">What Our Customers Are Saying</h2>
    
    {/* Testimonials in Three Columns */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Testimonial 1 */}
        <blockquote className="text-center">
        <Image
            src="/assets/images/customer-4.jpg"
            alt="Ezzul Nadim"
            width={500}
            height={500}
            className="mx-auto w-full rounded-lg object-cover mb-4"
        />
        <p className="text-lg italic">
            &quot;Trusted seller, good service and fast delivery so I definitely recommend buying from MusicRecords2U.&quot;
        </p>
        <footer className="mt-4 text-sm text-gray-500">- Ezzul Nadim, 18</footer>
        </blockquote>

        {/* Testimonial 2 */}
        <blockquote className="text-center">
        <Image
            src="/assets/images/customer-2.jpg"
            alt="Edyqa Danial"
            width={500}
            height={500}
            className="mx-auto w-full rounded-lg object-cover mb-4"
        />
        <p className="text-lg italic">
            &quot;Buying from MusicRecords2U was a really seamless experience so I have no complaints overall 10/10.&quot;
        </p>
        <footer className="mt-4 text-sm text-gray-500">- Edyqa Danial, 22</footer>
        </blockquote>

        {/* Testimonial 3 */}
        <blockquote className="text-center">
        <Image
            src="/assets/images/customer-3.jpg"
            alt="Danny Villenguez"
            width={500}
            height={500}
            className="mx-auto w-full rounded-lg object-cover mb-4"
        />
        <p className="text-lg italic">
            &quot;Every time I shop with them, I am blown away by their customer service and speedy shipping.&quot;
        </p>
        <footer className="mt-4 text-sm text-gray-500">- Hani Syafiqah, 20</footer>
        </blockquote>

    </div>
    </section>
</div>
);
};

export default AboutUs;
