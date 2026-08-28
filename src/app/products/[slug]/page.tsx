import { productService } from '@/services/productService';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, CheckCircle2, ChevronLeft, MoveRight } from 'lucide-react';
import type { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const product = await productService.getProductBySlug(resolvedParams.slug);

    if (!product) return { title: 'Product Not Found | AADIT' };

    return {
        title: `${product.name} | AADIT Techno Solutions`,
        description: product.shortDescription,
    };
}

export async function generateStaticParams() {
    const products = await productService.getProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const product = await productService.getProductBySlug(resolvedParams.slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-white dark:bg-secondary-900 min-h-screen pb-20">
            {/* Breadcrumb Header */}
            <div className="bg-secondary-50 dark:bg-secondary-950 border-b border-secondary-200 dark:border-secondary-700 py-4">
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                    <Link href="/" className="hover:text-primary-600">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <Link href="/products" className="hover:text-primary-600">Products</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-secondary-900 dark:text-white font-medium">{product.name}</span>
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <Link href="/products" className="inline-flex items-center text-sm font-medium text-secondary-500 dark:text-secondary-400 hover:text-primary-600 mb-8 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Products
                </Link>

                {/* Product Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Image */}
                    <div className="bg-white dark:bg-secondary-900 border text-secondary-300 border-secondary-200 dark:border-secondary-700 rounded-2xl overflow-hidden relative aspect-square shadow-sm flex flex-col justify-center items-center">
                        <span className="z-0 mb-4">{product.image}</span>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            unoptimized
                            className="object-contain p-8 z-10"
                        />
                    </div>

                    {/* Details Overview */}
                    <div>
                        <div className="mb-2">
                            <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold tracking-wide uppercase">
                                {product.category}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary-900 dark:text-white tracking-tight mb-4 text-balance">
                            {product.name}
                        </h1>
                        <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed">
                            {product.shortDescription}
                        </p>

                        {/* Key Features Quick List */}
                        <ul className="space-y-3 mb-10">
                            {product.features.slice(0, 3).map((feat, idx) => (
                                <li key={idx} className="flex items-start text-secondary-700 dark:text-secondary-200 font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={`/contact?product=${product.slug}`}
                                className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                            >
                                Request a Quote
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex justify-center items-center px-8 py-3.5 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm text-base font-medium text-secondary-700 dark:text-secondary-200 bg-white dark:bg-secondary-900 hover:bg-secondary-50 dark:bg-secondary-950 transition-colors"
                            >
                                Discuss Customization
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Extended Details Tabs / Sections */}
                <div className="mt-20 border-t border-secondary-200 dark:border-secondary-700 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-16">

                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Overview</h2>
                            <div className="prose prose-primary max-w-none text-secondary-600 dark:text-secondary-300">
                                <p className="leading-relaxed">{product.description}</p>
                            </div>
                        </section>

                        {/* Features full list */}
                        <section>
                            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Comprehensive Features</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.features.map((feat, idx) => (
                                    <div key={idx} className="flex items-start bg-secondary-50 dark:bg-secondary-950 p-4 rounded-lg border border-secondary-100 dark:border-secondary-800">
                                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span className="text-secondary-700 dark:text-secondary-200 text-sm leading-relaxed">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Technical Specifications */}
                        <section>
                            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Technical Specifications</h2>
                            <div className="bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-xl overflow-hidden">
                                <table className="min-w-full divide-y divide-secondary-200">
                                    <tbody className="divide-y divide-secondary-100">
                                        {product.specifications.map((spec, idx) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white dark:bg-secondary-900' : 'bg-secondary-50 dark:bg-secondary-950'}>
                                                <td className="py-4 px-6 text-sm font-medium text-secondary-900 dark:text-white w-1/3 border-r border-secondary-100 dark:border-secondary-800">
                                                    {spec.label}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-secondary-600 dark:text-secondary-300">
                                                    {spec.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4">
                        {/* Applications Sidebar */}
                        <div className="bg-secondary-900 text-white p-8 rounded-xl shadow-lg sticky top-28">
                            <h3 className="text-xl font-bold mb-6 border-b border-secondary-700 pb-4">Target Applications</h3>
                            <ul className="space-y-4">
                                {product.applications.map((app, idx) => (
                                    <li key={idx} className="flex flex-col">
                                        <span className="flex items-center text-primary-300 font-medium mb-1">
                                            <MoveRight className="w-4 h-4 mr-2" />
                                            {app}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-8 border-t border-secondary-700 text-center">
                                <p className="text-secondary-300 text-sm mb-4">Need this adapted for your specific platform?</p>
                                <Link href={`/contact?subject=Customization+for+${product.name}`} className="text-white border border-primary-500 hover:bg-primary-600 w-full rounded-md py-2 px-4 block text-center text-sm font-medium transition-colors">
                                    Contact Engineering
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
