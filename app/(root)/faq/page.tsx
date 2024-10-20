'use client';

import { AccordionComponent } from '@/components/ui/accordion';

const FAQPage = () => {
const faqItems = [
{
    question: 'What is MusicRecords2U?',
    answer:
    'MusicRecords2U is an online store where music enthusiasts can find and purchase vinyl records of every genre.',
},
{
    question: 'How do I place an order?',
    answer:
    'Simply browse through our catalog, add your favorite records to the cart, and follow the checkout process.',
},
{
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers.',
},
{
    question: 'How long will it take to receive my order?',
    answer:
    'Shipping times depend on your location. Typically, it takes 5-7 business days for local deliveries.',
},
// Add more FAQs here...
];

return (
<div className="container mx-auto py-10">
    <h1 className="text-4xl font-bold text-center mb-8">
    Frequently Asked Questions
    </h1>
    <AccordionComponent items={faqItems} />
</div>
);
};

export default FAQPage;
