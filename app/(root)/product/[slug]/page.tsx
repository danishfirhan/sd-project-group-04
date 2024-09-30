import { notFound } from 'next/navigation'

import ProductImages from '@/components/shared/product/product-images'
import ProductPrice from '@/components/shared/product/product-price'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getProductBySlug } from '@/lib/actions/product.actions'
import { APP_NAME } from '@/lib/constants'
import AddToCart from '@/components/shared/product/add-to-cart'
import { getMyCart } from '@/lib/actions/cart.actions'
import { round2 } from '@/lib/utils'

export async function generateMetadata({
params,
}: {
params: { slug: string }
}) {
const product = await getProductBySlug(params.slug)
if (!product) {
    return { title: 'Product not found' }
}
return {
    title: `${product.name} - ${APP_NAME}`,
    description: product.description,
}
}

const ProductDetails = async ({
params: { slug },
}: {
params: { slug: string }
searchParams: { page: string; color: string; size: string }
}) => {
const product = await getProductBySlug(slug)
if (!product) notFound()
const cart = await getMyCart()

return (
    <>
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex lg:flex-row gap-8">
                    <div className="max-w-full lg:max-w-[500px] mx-auto">
                        <ProductImages images={product.images!} />
                    </div>

                    <div className="flex flex-col w-full gap-4 p-0 lg:max-w-[900px]">
                        <div className="flex flex-col gap-4">
                            <p className="p-medium-16 rounded-full bg-grey-500/10 text-grey-500">
                                {product.brand} {product.category}
                            </p>
                            <h1 className="h3-bold">{product.name}</h1>
                            <p>
                                {product.rating} of {product.numReviews} reviews
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex gap-3">
                                    <ProductPrice
                                        value={Number(product.price)}
                                        className="p-bold-20 rounded-full bg-green-300/25 px-5 py-2 text-green-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                        <p className="text-sm font-semi-bold">Description:</p>
                        <p className="text-[14.5px]">{product.description}</p> {/* Adjusted text size to 15px */}
                    </div>
                    </div>
                </div>

                <div className="lg:col-span-1 flex flex-col gap-8">
                    <Card>
                        <CardContent className="p-4">
                            <div className="mb-2 flex justify-between">
                                <div>Price</div>
                                <div>
                                    <ProductPrice value={Number(product.price)} />
                                </div>
                            </div>
                            <div className="mb-2 flex justify-between">
                                <div>Status</div>
                                {product.stock > 0 ? (
                                    <Badge variant="outline">In stock</Badge>
                                ) : (
                                    <Badge variant="destructive">Unavailable</Badge>
                                )}
                            </div>
                            {product.stock !== 0 && (
                                <div className="flex-center">
                                    <AddToCart
                                        cart={cart}
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

                    {/* Spotify Embed */}
                    <div>
                        <hr className="my-4" />
                        {slug === 'subsonic-eye-all-around-you-cd' && (
                            <div>
                                <p className="text-14px font-bold uppercase">Preview Track(s)</p>
                                <iframe
                                    style={{ borderRadius: '12px', marginTop: '10px' }}
                                    src="https://open.spotify.com/embed/album/0V1dIAje2IVpyBQp6byOwi?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}

                        {slug === 'the-strokes-comedown-machine-cd' && (
                            <div>
                                <p className="text-14px font-bold uppercase">Preview Track(s)</p>
                                <iframe
                                    style={{ borderRadius: '12px', marginTop: '10px' }}
                                    src="https://open.spotify.com/embed/album/4WnkQO4xD9ljQooB3VIxCV?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}

                        {slug === 'the-strokes-the-new-abnormal-cd' && (
                            <div>
                                <p className="text-14px font-bold uppercase">Preview Track(s)</p>
                                <iframe
                                    style={{ borderRadius: '12px', marginTop: '10px' }}
                                    src="https://open.spotify.com/embed/album/2xkZV2Hl1Omi8rk2D7t5lN?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}

                        {slug === 'the-strokes-room-on-fire-cd' && (
                            <div>
                                <p className="text-14px font-bold uppercase">Preview Track(s)</p>
                                <iframe
                                    style={{ borderRadius: '12px', marginTop: '10px' }}
                                    src="https://open.spotify.com/embed/album/3HFbH1loOUbqCyPsLuHLLh?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}

                        {slug === 'the-strokes-is-this-it-cd' && (
                            <div>
                                <p className="text-14px font-bold uppercase">Preview Track(s)</p>
                                <iframe
                                    style={{ borderRadius: '12px', marginTop: '10px' }}
                                    src="https://open.spotify.com/embed/album/2k8KgmDp9oHrmu0MIj4XDE?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}

                        {slug === 'car-seat-headrest-twin-fantasy-vinyl' && (
                            <div>
                                <p className="text-14px font-bold uppercase">Preview Track(s)</p>
                                <iframe
                                    style={{ borderRadius: '12px', marginTop: '10px' }}
                                    src="https://open.spotify.com/embed/album/6gDtROOIYa6OQxwhDNkDRM?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}

                        {slug === 'fuad-dispositions-cd' && (
                            <div>
                                <p className="text-14px font-bold uppercase">Preview Track(s)</p>
                                <iframe
                                    style={{ borderRadius: '12px', marginTop: '10px' }}
                                    src="https://open.spotify.com/embed/album/46hd6Aj37dUTCVHPERBWGt?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}

                        {slug === 'twewy-stay-casette' && (
                            <div>
                                <p className="text-14px font-bold uppercase">Preview Track(s)</p>
                                <iframe
                                    style={{ borderRadius: '12px', marginTop: '10px' }}
                                    src="https://open.spotify.com/embed/album/1EBH7Qc79THUD8OzfNbKoc?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}

                        {slug === 'fictions-demo-tape-1-cd' && (
                            <div>
                                <p className="text-[14px] font-bold uppercase">Preview Track(s)</p> 
                                <iframe
                                    style={{ border: '0', width: '100%',  height: '120px', borderRadius: '12px', marginTop: '10px'}}
                                    src="https://bandcamp.com/EmbeddedPlayer/album=2373858979/size=large/bgcol=333333/linkcol=e99708/tracklist=false/artwork=small/transparent=true/"
                                    seamless
                                >
                                    <a href="https://itgoesincircles.bandcamp.com/album/demo-tape-1">
                                        demo tape 1 by fictions
                                    </a>
                                </iframe>
                            </div>
                        )}

                        {slug === 'laufey-bewitched-album-vinyl' && (
                            <div>
                                <p className="text-14px font-bold uppercase">Preview Track(s)</p>
                                <iframe
                                    style={{ borderRadius: '12px',  marginTop: '10px' }}
                                    src="https://open.spotify.com/embed/album/1rpCHilZQkw84A3Y9czvMO?utm_source=generator"
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    </>
)
}

export default ProductDetails
