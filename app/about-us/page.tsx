import React from 'react';

const AboutUs = () => {
return (
<div className="max-w-4xl mx-auto p-8">
    <section className="mb-12">
    <h1 className="text-4xl font-bold text-center mb-6">About MusicRecords2U</h1>
    <p className="text-lg leading-relaxed text-center">
        Welcome to MusicRecords2U, your premier online destination for all your music record needs. At MusicRecords2U, we are dedicated to curating the finest selection of vinyl records to elevate your music experience. Our team of music enthusiasts is committed to providing you with an unparalleled shopping journey. Whether you are seeking classic albums, limited editions, or the latest releases, we have got you covered. We strive to offer competitive prices and top-notch customer service. Thank you for choosing MusicRecords2U, and we cannot wait to help you discover your next favorite record!
    </p>
    </section>

    <section>
    <h2 className="text-3xl font-semibold text-center mb-8">What Our Customers Are Saying</h2>
    <div className="space-y-8">
        <blockquote className="text-center">
        <p className="text-lg italic">&quot;Trusted seller, good service and fast delivery so I definitely recommend buying from MusicRecords2U.&quot;</p>
        <footer className="mt-4 text-sm text-gray-500">- Ezzul Nadim, 18</footer>
        </blockquote>

        <blockquote className="text-center">
        <p className="text-lg italic">&quot;Buying from MusicRecords2U was a really seamless experience so I have no complaints overall 10/10.&quot;</p>
        <footer className="mt-4 text-sm text-gray-500">- Edyqa Danial, 22</footer>
        </blockquote>

        <blockquote className="text-center">
        <p className="text-lg italic">&quot;Curious about MusicRecords2U? Take it from me, a loyal customer, that their selection of music records are unbeatable. Every time I shop with them, I am blown away by their customer service and speedy shipping.&quot;</p>
        <footer className="mt-4 text-sm text-gray-500">- Danny Villenguez, 20</footer>
        </blockquote>
    </div>
    </section>
</div>
);
};

export default AboutUs;
