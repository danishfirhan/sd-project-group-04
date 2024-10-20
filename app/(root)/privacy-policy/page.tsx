import { APP_NAME } from '@/lib/constants'; // Import app name for dynamic content
import { Metadata } from 'next'; // Import Metadata from Next.js

export const metadata: Metadata = {
    title: `${APP_NAME} - Privacy Policy`,
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto p-5">
            <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
            <div className="space-y-6">
                <p>
                    At {APP_NAME}, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our services.
                </p>

                <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
                <p>
                    We collect information that you provide to us directly when you use our website, such as your name, email address, and payment information. We also collect information automatically through cookies and other technologies when you interact with our site.
                </p>

                <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
                <p>
                    The information we collect is used to provide, maintain, and improve our services, process transactions, communicate with you, and for security purposes.
                </p>

                <h2 className="text-2xl font-semibold">3. Sharing Your Information</h2>
                <p>
                    We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.
                </p>

                <h2 className="text-2xl font-semibold">4. Your Rights</h2>
                <p>
                    You have the right to access, correct, or delete your personal information. You can also opt out of receiving communications from us at any time.
                </p>

                <h2 className="text-2xl font-semibold">5. Security</h2>
                <p>
                    We take the security of your information seriously and implement appropriate technical and organizational measures to protect it.
                </p>

                <h2 className="text-2xl font-semibold">6. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                </p>

                <h2 className="text-2xl font-semibold">7. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at privacy@{APP_NAME.toLowerCase()}.com.
                </p>
            </div>
        </div>
    );
}
