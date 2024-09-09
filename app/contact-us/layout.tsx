import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import React from 'react';

export default function ContactUsLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<div className="flex h-screen flex-col">
    <Header />
    <main className="flex-1 wrapper p-8 max-w-4xl mx-auto">
    {children}
    </main>
    <Footer />
</div>
);
}
