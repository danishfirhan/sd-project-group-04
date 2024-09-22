import { APP_NAME } from '@/lib/constants'
import Link from 'next/link'

const Footer = () => {
return (
<footer className="border-t py-6 bg-white dark:bg-black transition-colors duration-300">
    <div className="container mx-auto px-4">
    {/* Top section: Company and Links */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            About {APP_NAME}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
            {APP_NAME} is your go-to platform for music records, offering the best collection for enthusiasts around the world.
        </p>
        </div>

        {/* Quick Links Section */}
        <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Quick Links</h3>
        <ul className="text-sm space-y-2">
            <li>
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:underline">About Us</Link>
            </li>
            <li>
            <Link href="/shop" className="text-gray-600 dark:text-gray-400 hover:underline">Shop</Link>
            </li>
            <li>
            <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:underline">Contact</Link>
            </li>
            <li>
            <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:underline">FAQ</Link>
            </li>
            <li>
            <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:underline">Privacy Policy</Link>
            </li>
        </ul>
        </div>

        {/* Social Media Section */}
        <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Follow Us</h3>
        <ul className="text-sm space-y-2">
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
    <div className="border-t pt-4 mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
        &copy; 2024 {APP_NAME}. All Rights Reserved.
        </p>
    </div>
    </div>
</footer>
)
}

export default Footer
