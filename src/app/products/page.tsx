import { productService } from '@/services/productService';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Filter } from 'lucide-react';
import type { Metadata } from 'next';

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

            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">

                {/* Sidebar / Filters (Static for MVP) */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-secondary-900 p-6 rounded-xl border border-secondary-200 dark:border-secondary-700 shadow-sm sticky top-28">
                        <div className="flex items-center gap-2 font-bold text-secondary-900 dark:text-white mb-4 pb-4 border-b border-secondary-100 dark:border-secondary-800">
                            <Filter className="w-5 h-5" />
                            Categories
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#all" className="text-primary-600 font-medium text-sm hover:text-primary-700">All Products</Link>
                            </li>
                            {categories.map(cat => (
                                <li key={cat}>
                                    <Link href={`#${cat.replace(/\\s+/g, '-').toLowerCase()}`} className="text-secondary-600 dark:text-secondary-300 text-sm hover:text-primary-600 transition-colors">
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {categories.map(category => {
                        const categoryProducts = products.filter(p => p.category === category);
                        return (
                            <div key={category} id={category.replace(/\\s+/g, '-').toLowerCase()} className="mb-16 scroll-mt-32">
                                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white border-b-2 border-primary-500 pb-2 mb-6 inline-block">
                                    {category}
                                </h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {categoryProducts.map(product => (
                                        <div key={product.id} className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-700 shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:shadow-primary-500/40 dark:hover:shadow-orange-500/40 transition-shadow">
                                            <div className="h-56 bg-white dark:bg-secondary-900 relative overflow-hidden flex items-center justify-center">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    unoptimized
                                                    className="object-contain z-10 p-6 drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex-grow flex flex-col">
                                                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">{product.name}</h3>
                                                <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-6 flex-grow">
                                                    {product.shortDescription}
                                                </p>
                                                <Link href={`/products/${product.slug}`} className="mt-auto group inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
                                                    View Details
                                                    <ArrowRight className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
}
