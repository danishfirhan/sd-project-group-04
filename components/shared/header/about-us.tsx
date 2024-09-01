import Image from 'next/image'
import React from 'react'

const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Welcome to MusicRecords2U</h1>
            <p className="mb-4">
                Welcome to MusicRecords2U, your premier online destination for all your music record needs. At MusicRecords2U, were dedicated to curating the finest selection of vinyl records to elevate your music experience. Our team of music enthusiasts is committed to providing you with an unparalleled shopping journey. Whether youre seeking classic albums, limited editions, or the latest releases, weve got you covered. We strive to offer competitive prices and top-notch customer service. Thank you for choosing MusicRecords2U, and we cant wait to help you discover your next favorite record!
            </p>

            <div className="mb-8">
                <Image
                    src="/assets/images/record-store.webp"
                    alt="Record Store"
                    width={800}
                    height={400}
                    className="w-full h-auto"
                />
            </div>

            <p className="mb-4">
                Trusted seller, good service and fast delivery so I definitely recommend buying from MusicRecords2U
            </p>
            <p className="mb-4 font-bold">Shah Nawi, Kuala Lumpur</p>

            <div className="mb-8">
                <Image
                    src="/assets/images/record-store-background.webp"
                    alt="Record Store Background"
                    width={800}
                    height={400}
                    className="w-full h-auto"
                />
            </div>

            <p className="mb-4">
                Buying from MusicRecords2U was a really seamless experience so I have no complaints overall 10/10
            </p>
            <p className="mb-4 font-bold">Edyqa Danial, Terengganu</p>

            <div className="mb-8">
                <Image
                    src="/assets/images/record-image.webp"
                    alt="Record Image"
                    width={800}
                    height={400}
                    className="w-full h-auto"
                />
            </div>

            <p className="mb-4">
                Curious about MusicRecords2U? Take it from me, a loyal customer, that their selection of music records is unbeatable. Every time I shop with them, I am blown away by their customer service and speedy shipping.
            </p>
            <p className="mb-4 font-bold">Danny Villenguez, Kelantan</p>
        </div>
    )
}

export default AboutUs
