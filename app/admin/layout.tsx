import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MainNav from './main-nav'

export default async function AdminLayout({
children,
}: {
children: React.ReactNode
}) {
return (
<>
    <div className="flex h-screen">
    {/* Sidebar (Navigation on the left) */}
    <div className="w-64 bg-white dark:bg-black text-black dark:text-white border-r p-4">
        <Link href="/" className="block mb-8">
        <Image
            src="/assets/icons/logo.svg"
            width={48}
            height={48}
            alt={`${APP_NAME} logo`}
        />
        </Link>
        <MainNav className="flex flex-col space-y-4" />
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
        {/* Removed the Menu section */}
        <div className="flex-1 space-y-4 p-8">
        {children}
        </div>
    </div>
    </div>
</>
)
}
