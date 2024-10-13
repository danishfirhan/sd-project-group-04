'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const links = [
{
title: 'Overview',
href: '/admin/overview',
},
{
title: 'Products',
href: '/admin/products',
},
{
title: 'Orders',
href: '/admin/orders',
},
{
title: 'Users',
href: '/admin/users',
},
{
title: 'Feedbacks',
href: '/admin/feedbacks',
},
{
title: 'Events',
href: '/admin/events',
},
{
title: 'Settings',
href: '/admin/settings',
},
]

export default function MainNav({
className,
...props
}: React.HTMLAttributes<HTMLElement>) {
const pathname = usePathname()
return (
<nav
    className={cn('space-y-4', className)} // Stacking links vertically
    {...props}
>
    {links.map((item) => (
    <Link
        key={item.href}
        href={item.href}
        className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        pathname.includes(item.href) ? 'text-primary' : 'text-muted-foreground'
        )}
    >
        {item.title}
    </Link>
    ))}
</nav>
)
}
