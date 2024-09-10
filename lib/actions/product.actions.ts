'use server'

import { desc, eq } from 'drizzle-orm'

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

export async function getAllCategories() {
const data = await db
    .selectDistinctOn([products.category], { name: products.category })
    .from(products)
    .orderBy(products.category)
return data
}
export async function getFeaturedProducts() {
const data = await db.query.products.findMany({
    where: eq(products.isFeatured, true),
    orderBy: [desc(products.createdAt)],
    limit: 4,
})
return data
}