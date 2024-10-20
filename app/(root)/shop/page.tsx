import ProductList from '@/components/shared/product/product-list'; // Import ProductList component
import { getLatestProducts } from '@/lib/actions/product.actions'; // Import the function to fetch latest products
import { APP_NAME } from '@/lib/constants'; // Import app name for metadata
import { Metadata } from 'next'; // Import Metadata from Next.js

export const metadata: Metadata = {
    title: `${APP_NAME} - Shop`,
};

export default async function ShopPage() {
    // Fetch the latest products
    const latestProducts = await getLatestProducts();

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-5xl font-bold text-center mb-8">Shop</h1>            
            {/* Display ProductList with Newest Arrivals title */}
            <div className="space-y-8">
                <ProductList title="Newest Arrivals" data={latestProducts} />
            </div>
        </div>
    );
}
