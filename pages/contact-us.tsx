import React from 'react'

const ContactUs = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <p className="mt-4">
                You can reach us via email at contact@yourdomain.com or through our contact form below.
                If you have any questions, do not hesitate to ask!
            </p>
            {/* Example of a contact form */}
            <form className="mt-4">
                <label htmlFor="name" className="block">Name:</label>
                <input type="text" id="name" name="name" className="border p-2 w-full" />

                <label htmlFor="email" className="block mt-4">Email:</label>
                <input type="email" id="email" name="email" className="border p-2 w-full" />

                <label htmlFor="message" className="block mt-4">Message:</label>
                <textarea id="message" name="message" className="border p-2 w-full" rows={4}></textarea>

                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Send</button>
            </form>
        </div>
    )
}

export default ContactUs
