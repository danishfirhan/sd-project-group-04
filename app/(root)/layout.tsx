import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import React from 'react'

export default function RootLayout({
children,
modal,
}: {
children: React.ReactNode;
modal: React.ReactNode;  // Make 'modal' optional
}) {
return (
    <div className="flex h-screen flex-col">
    <Header />
    <main className="flex-1 wrapper">{children}</main>
    {modal && modal}  
    <Footer />
    </div>
);
}