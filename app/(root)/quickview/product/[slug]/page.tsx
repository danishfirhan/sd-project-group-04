import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function QuickViewPage({ params }: { params: { slug: string } }) {
useEffect(() => {
    redirect(`/product/${params.slug}`)
}, [params.slug])

return null // Ensures no rendering content before redirect
}
