import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Product } from '@/types'
import ProductPrice from './product-price'
import Rating from './rating'
import AddToCart from './add-to-cart' // Ensure this component is correctly imported
import { round2 } from '@/lib/utils' // Utility for rounding prices


const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card className="w-full max-w-sm h-[465px] flex flex-col justify-between p-4">
            <CardHeader className="p-0">
                <Link href={`/product/${product.slug}`}>
                    <Image
                        alt={product.name}
                        className="aspect-square object-cover rounded"
                        height={300}
                        width={300}
                        src={product.images![0]}
                    />
                </Link>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow p-4 gap-2 pb-6">
                {/* Brand */}
                <p className="text-xs text-gray-500">{product.brand}</p>

                {/* Title with line clamp */}
                <Link href={`/product/${product.slug}`}>
                    <h2 className="text-sm font-medium line-clamp-2 h-10 overflow-hidden">
                        {product.name}
                    </h2>
                </Link>

                {/* Rating and Price */}
                <div className="flex items-center justify-between mt-2">
                    <Rating value={Number(product.rating)} />
                    {product.stock > 0 ? (
                        <ProductPrice value={Number(product.price)} />
                    ) : (
                        <p className="text-red-500">Out of Stock</p>
                    )}
                </div>

                {/* Add to Cart Button with bottom margin */}
                {product.stock !== 0 && (
                    <div className="mt-auto mb-2"> {/* Add margin-bottom here */}
                        <AddToCart
                            item={{
                                productId: product.id,
                                name: product.name,
                                slug: product.slug,
                                price: round2(product.price),
                                qty: 1,
                                image: product.images![0],
                            }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ProductCard
