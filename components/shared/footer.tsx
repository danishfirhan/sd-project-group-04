import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
return (
<footer className="border-t py-4 bg-white dark:bg-black transition-colors duration-300"> {/* Reduced padding */}
    <div className="container mx-auto px-4">
    {/* Top section: Company and Links */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-start justify-center py-2"> {/* Reduced padding */}
        <Link href="/" className="flex items-center space-x-4">
            <Image
            src="/assets/icons/logo.svg"
            width={60} // Reduced logo size
            height={60}
            alt={`${APP_NAME} logo`}
            />
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {APP_NAME}
            </span> {/* Reduced font size */}
        </Link>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-start justify-center">
        <h3 className="text-base font-semibold mb-2 text-gray-800 dark:text-gray-200"> {/* Reduced font size */}
            Quick Links
        </h3>
        <ul className="text-sm space-y-1"> {/* Reduced spacing */}
            <li>
            <Link href="/about-us" className="text-gray-600 dark:text-gray-400 hover:underline">
                About Us
            </Link>
            </li>
            <li>
            <Link href="/shop" className="text-gray-600 dark:text-gray-400 hover:underline">
                Shop
            </Link>
            </li>
            <li>
            <Link href="/contact-us" className="text-gray-600 dark:text-gray-400 hover:underline">
                Contact Us
            </Link>
            </li>
            <li>
            <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:underline">
                FAQ
            </Link>
            </li>
            <li>
            <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:underline">
                Privacy Policy
            </Link>
            </li>
        </ul>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-start justify-center">
        <h3 className="text-base font-semibold mb-2 text-gray-800 dark:text-gray-200"> {/* Reduced font size */}
            Follow Us
        </h3>
        <ul className="text-sm space-y-1"> {/* Reduced spacing */}
            <li>
            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:underline"
            >
                Facebook
            </a>
            </li>
            <li>
            <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:underline"
            >
                Instagram
            </a>
            </li>
            <li>
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:underline"
            >
                Twitter
            </a>
            </li>
            <li>
            <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:underline"
            >
                LinkedIn
            </a>
            </li>
        </ul>
        </div>
    </div>

    {/* Bottom section: Copyright */}
    <div className="border-t pt-2 mt-4 text-center text-sm text-gray-600 dark:text-gray-400"> {/* Reduced padding */}
        <p>&copy; 2024 {APP_NAME}. All Rights Reserved.</p>
    </div>
    </div>
</footer>
)
}

export default Footer
