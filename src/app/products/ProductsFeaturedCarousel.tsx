"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';

export default function ProductsFeaturedCarousel({ products }: { products: Product[] }) {
    const featuredProducts = products.filter(p => p.featured);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [tz, setTz] = useState(616.6); // Default for max-w-4xl (896px) width
    const containerRef = useRef<HTMLDivElement>(null);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) {
            setCurrentSlide((prev) => (prev + 1));
        } else if (diff < -50) {
            setCurrentSlide((prev) => (prev - 1));
        }
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    useEffect(() => {
        const calculateTz = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth;
                // width / (2 * tan(180 / N))
                const calcZ = (width / 2) / Math.tan(Math.PI / Math.max(featuredProducts.length, 1));
                setTz(calcZ);
            }
        };

        calculateTz();
        window.addEventListener('resize', calculateTz);
        return () => window.removeEventListener('resize', calculateTz);
    }, [featuredProducts.length]);

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1));
        }, 10000); // 10 second interval exactly as requested
        return () => clearInterval(slideTimer);
    }, [featuredProducts.length]);

    if (featuredProducts.length === 0) return null;

    const activeIndex = ((currentSlide % featuredProducts.length) + featuredProducts.length) % featuredProducts.length;

    return (
        <div className="w-full bg-secondary-100 dark:bg-secondary-900/50 border-b border-secondary-200 dark:border-secondary-800 py-10 overflow-hidden">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">Featured Solutions</h2>

                <div
                    ref={containerRef}
                    className="relative w-full max-w-4xl mx-auto h-[480px] md:h-[400px] [perspective:1500px]"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Interactive Invisible Tap Zones for Navigation */}
                    <div
                        className="absolute top-0 bottom-16 md:bottom-0 left-0 w-1/4 md:w-32 z-50 cursor-pointer hidden sm:block max-sm:block"
                        onClick={(e) => { e.preventDefault(); setCurrentSlide((prev) => (prev - 1)); }}
                        aria-label="Previous slide"
                    />
                    <div
                        className="absolute top-0 bottom-16 md:bottom-0 right-0 w-1/4 md:w-32 z-50 cursor-pointer hidden sm:block max-sm:block"
                        onClick={(e) => { e.preventDefault(); setCurrentSlide((prev) => (prev + 1)); }}
                        aria-label="Next slide"
                    />

                    <div
                        className="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] z-10"
                        style={{
                            transformStyle: 'preserve-3d',
                            WebkitTransformStyle: 'preserve-3d',
                            transform: `translateZ(-${tz}px) rotateY(${currentSlide * -(360 / Math.max(featuredProducts.length, 1))}deg)`,
                            WebkitTransform: `translateZ(-${tz}px) rotateY(${currentSlide * -(360 / Math.max(featuredProducts.length, 1))}deg)`
                        }}
                    >
                        {featuredProducts.map((product, idx) => {
                            const angle = idx * (360 / featuredProducts.length);
                            return (
                                <Link
                                    href={`/products/${product.slug}`}
                                    key={product.id}
                                    className="absolute inset-0 bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 overflow-hidden shadow-2xl flex flex-col md:flex-row group"
                                    style={{
                                        pointerEvents: idx === activeIndex ? 'auto' : 'none',
                                        transform: `rotateY(${angle}deg) translateZ(${tz}px)`,
                                        WebkitTransform: `rotateY(${angle}deg) translateZ(${tz}px)`,
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden'
                                    }}
                                >
                                    <div className="w-full md:w-1/2 h-56 md:h-full bg-white dark:bg-secondary-900 relative p-6 border-b md:border-b-0 md:border-r border-secondary-100 dark:border-secondary-700">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            unoptimized
                                            className="object-contain p-6 drop-shadow-md group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white dark:bg-secondary-800">
                                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">{product.category}</span>
                                        <h3 className="text-xl md:text-2xl font-bold text-secondary-900 dark:text-white mb-4 line-clamp-2">{product.name}</h3>
                                        <p className="text-secondary-600 dark:text-secondary-300 text-sm md:text-base mb-6 flex-grow line-clamp-3">{product.shortDescription}</p>
                                        <div className="mt-auto inline-flex items-center text-sm md:text-base font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-500 transition-colors">
                                            View Details <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Indicators */}
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                        {featuredProducts.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.preventDefault(); setCurrentSlide(idx); }}
                                className={`h-2 rounded-full transition-all duration-500 shadow-md ${idx === activeIndex ? 'w-8 bg-primary-500' : 'w-2 bg-secondary-300 dark:bg-secondary-600 hover:bg-secondary-400'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
