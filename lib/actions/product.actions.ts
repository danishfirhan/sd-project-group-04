'use server'

import { desc } from 'drizzle-orm'

import db from '@/db/drizzle'
import { products } from '@/db/schema'

export async function getLatestProducts() {
const data = await db.query.products.findMany({
orderBy: [desc(products.createdAt)],
limit: 4,
})
return data
}

export async function getProductBySlug(slug: string) {
return await db.query.products.findFirst({
    where: eq(products.slug, slug),
})
}