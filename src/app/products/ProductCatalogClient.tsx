"use client";

import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Filter, Search, X } from 'lucide-react';
import { Product } from "@/types/product";

interface ProductCatalogClientProps {
    products: Product[];
    categories: string[];
}

export default function ProductCatalogClient({ products, categories }: ProductCatalogClientProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Determine which categories contain matching products
    const activeCategories = searchQuery
        ? Array.from(new Set(filteredProducts.map(p => p.category)))
        : categories;

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">

            {/* Sidebar / Filters */}
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white dark:bg-secondary-900 p-6 rounded-xl border border-secondary-200 dark:border-secondary-700 shadow-sm sticky top-28">
                    <div className="flex items-center gap-2 font-bold text-secondary-900 dark:text-white mb-4 pb-4 border-b border-secondary-100 dark:border-secondary-800">
                        <Filter className="w-5 h-5" />
                        Categories
                    </div>
                    <ul className="space-y-3">
                        <li>
                            <Link href="#all" onClick={() => setSearchQuery("")} className={`font-medium text-sm transition-colors ${searchQuery === "" ? "text-primary-600" : "text-secondary-600 dark:text-secondary-300 hover:text-primary-600"}`}>
                                All Products
                            </Link>
                        </li>
                        {categories.map(cat => (
                            <li key={cat}>
                                <button
                                    onClick={() => setSearchQuery(cat)}
                                    className={`text-left text-sm transition-colors ${searchQuery === cat ? "text-primary-600 font-bold" : "text-secondary-600 dark:text-secondary-300 hover:text-primary-600"}`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 flex flex-col">

                {/* Search Bar */}
                <div className="mb-8 relative w-full">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-secondary-400 group-focus-within:text-primary-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-10 py-4 border border-secondary-200 dark:border-secondary-700 rounded-xl leading-5 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:shadow-md"
                            placeholder="Search products by keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-700">
                        <Search className="mx-auto h-12 w-12 text-secondary-300 dark:text-secondary-600 mb-4" />
                        <h3 className="text-lg font-medium text-secondary-900 dark:text-white">No products found</h3>
                        <p className="text-secondary-500 mt-2">Try adjusting your search criteria.</p>
                        <button onClick={() => setSearchQuery("")} className="mt-4 text-primary-600 hover:text-primary-700 font-medium">Clear search</button>
                    </div>
                ) : (
                    activeCategories.map(category => {
                        const categoryProducts = filteredProducts.filter(p => p.category === category);
                        if (categoryProducts.length === 0) return null;

                        return (
                            <div key={category} id={category.replace(/\s+/g, '-').toLowerCase()} className="mb-16 scroll-mt-32">
                                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white border-b-2 border-primary-500 pb-2 mb-6 inline-block">
                                    {category}
                                </h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {categoryProducts.map(product => (
                                        <div key={product.id} className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-700 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-primary-500/40 dark:hover:shadow-orange-500/40 transition-shadow duration-300">
                                            <div className="h-56 bg-white dark:bg-secondary-900 relative overflow-hidden flex items-center justify-center">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    unoptimized
                                                    className="object-contain z-10 p-6 drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex-grow flex flex-col border-t border-secondary-100 dark:border-secondary-800">
                                                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                                                <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-6 flex-grow line-clamp-3">
                                                    {product.shortDescription}
                                                </p>
                                                <Link href={`/products/${product.slug}`} className="mt-auto inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
                                                    View Details
                                                    <ArrowRight className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}
