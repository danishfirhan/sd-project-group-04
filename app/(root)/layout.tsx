import React, { useMemo } from 'react'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'

export default function RootLayout({
children,
modal,
}: {
children: React.ReactNode
modal: React.ReactNode
}) {
const MemoizedModal = useMemo(() => modal, [modal])

return (
<div className="flex h-screen flex-col">
    <Header />
    <main className="flex-1 wrapper">{children}</main>
    {MemoizedModal}
    <Footer />
</div>
)
}
