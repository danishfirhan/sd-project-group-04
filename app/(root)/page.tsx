import EcommerceFeatures from '@/components/shared/product/ecommerce-features';
import ProductCarousel from '@/components/shared/product/product-carousel';
import ProductList from '@/components/shared/product/product-list';
import ProductPromotion from '@/components/shared/product/product-promotion';
import { getFeaturedProducts, getLatestProducts, getAlbumOfTheDay } from '@/lib/actions/product.actions';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `${APP_NAME} - ${APP_DESCRIPTION}`,
};

export default async function Home() {
    const latestProducts = await getLatestProducts();
    const featuredProducts = await getFeaturedProducts();
    const albumOfTheDay = await getAlbumOfTheDay(); // Fetch the album of the day

    return (
        <div>
            {featuredProducts.length > 0 && (
                <ProductCarousel data={featuredProducts} />
            )}

            {albumOfTheDay && ( // Album of the Day section
                <div className="album-of-the-day flex items-center my-8">
                    <img 
                        src="/assets/images/is-this-it.webp" // Set as the static WebP image
                        alt={albumOfTheDay.title} // Assuming the property is 'title'
                        className="w-1/3 h-auto rounded-lg mr-6"
                    />
                    <div className="album-info space-y-4">
                        <h2 className="text-2xl font-bold">{albumOfTheDay.title}</h2> {/* Changed from name to title */}
                        <p>{albumOfTheDay.description}</p>
                        <p>Rating: {albumOfTheDay.rating} / 5</p>
                        <iframe
                            style={{ borderRadius: '12px' }}
                            src={"https://open.spotify.com/embed/album/2k8KgmDp9oHrmu0MIj4XDE?utm_source=generator"} // Assuming you have this property in albumOfTheDay
                            width="100%" 
                            height="152" 
                            frameBorder="0" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                        <a href={`/albums/${albumOfTheDay.id}`} className="text-blue-500 hover:underline">
                            View Album
                        </a>
                    </div>
                </div>
            )}

            <div className="space-y-8">
                <ProductList title="Newest Arrivals" data={latestProducts} />
                <ProductPromotion />
                <EcommerceFeatures />
            </div>
        </div>
    );
}
