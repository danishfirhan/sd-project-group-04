import EcommerceFeatures from '@/components/shared/product/ecommerce-features';
import ProductCarousel from '@/components/shared/product/product-carousel';
import ProductList from '@/components/shared/product/product-list';
import ProductPromotion from '@/components/shared/product/product-promotion';
import AlbumOfTheDay from '@/components/shared/product/album-of-the-day'; // Import the AlbumOfTheDay component
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

            {albumOfTheDay && ( // Use AlbumOfTheDay component
                <AlbumOfTheDay album ={albumOfTheDay} />
            )}

            <div className="space-y-8">
                <ProductList title="Newest Arrivals" data={latestProducts} />
                <ProductPromotion />
                <EcommerceFeatures />
            </div>
        </div>
    );
}
