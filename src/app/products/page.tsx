import { productService } from '@/services/productService';
import type { Metadata } from 'next';
import ProductCatalogClient from './ProductCatalogClient';

export const metadata: Metadata = {
    title: "Product Portfolio | AADIT Techno Solutions",
    description: "Browse our comprehensive catalogue of test & validation systems, protocol converters, embedded computing, and data acquisition solutions.",
};

export default async function ProductsPage() {
    const products = await productService.getProducts();
    const categories = await productService.getCategories();

    return (
        <div className="bg-secondary-50 dark:bg-secondary-950 min-h-screen">
            {/* Page Header */}
            <div className="bg-secondary-900 py-16">
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                        Product Portfolio
                    </h1>
                    <p className="mt-4 max-w-3xl text-xl text-secondary-300">
                        Advanced systems and modules designed to accelerate your engineering timelines and ensure uncompromising accuracy.
                    </p>
                </div>
            </div>

            <ProductCatalogClient products={products} categories={categories} />
        </div>
    );
}
