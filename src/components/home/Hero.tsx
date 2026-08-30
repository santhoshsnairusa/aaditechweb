"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Zap, Activity } from "lucide-react";
import products from "@/data/products.json";

export default function Hero() {
    const [showContent, setShowContent] = useState(false);
    const [sequenceIndex, setSequenceIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    const carouselProducts = uniqueCategories.map(cat =>
        products.find(p => p.category === cat && p.featured) || products.find(p => p.category === cat)
    ).filter((p): p is typeof products[0] => p !== undefined);

    const cycleLength = carouselProducts.length + 1 || 1;
    const phaseIndex = ((sequenceIndex % cycleLength) + cycleLength) % cycleLength;
    const isMobileTextPhase = phaseIndex === 0;
    const currentSlide = sequenceIndex - Math.floor((sequenceIndex + cycleLength - 1) / cycleLength);

    const activeIndex = ((currentSlide % carouselProducts.length) + carouselProducts.length) % carouselProducts.length;

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchEndX.current = e.targetTouches[0].clientX; // Reset end x
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) {
            setSequenceIndex((prev) => (prev + 1));
        } else if (diff < -50) {
            setSequenceIndex((prev) => (prev - 1));
        }
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (showContent) {
            timeoutId = setTimeout(() => {
                setShowContent(false);
                if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play().catch(e => console.log("Play interrupted", e));
                }
            }, 6000);
        }
        return () => clearTimeout(timeoutId);
    }, [showContent]);

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setSequenceIndex((prev) => (prev + 1));
        }, 10000);
        return () => clearInterval(slideTimer);
    }, [carouselProducts.length]);

    const handleVideoEnded = () => {
        setShowContent(true);
    };

    const handleSkipVideo = () => {
        if (!showContent) {
            setShowContent(true);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    };

    return (
        <div className="relative bg-secondary-900 overflow-hidden min-h-[70vh] lg:min-h-[90vh] flex flex-col justify-center">
            {/* Click to Skip Overlay */}
            {!showContent && (
                <div onClick={handleSkipVideo} className="hidden md:block absolute inset-0 z-[5] cursor-pointer" title="Click to skip video"></div>
            )}

            {/* Background Video */}
            <video
                ref={videoRef}
                className="hidden md:block absolute inset-0 w-full h-full object-cover object-center z-0 md:scale-100 lg:scale-[1.28] pointer-events-none transition-transform duration-700"
                muted
                playsInline
                autoPlay
                onEnded={handleVideoEnded}
                onCanPlay={(e) => { e.currentTarget.playbackRate = 0.75; }}
            >
                <source src="/videos/to_showcase_web_home_page_back.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay to ensure text contrast when content is visible */}
            <div className={`absolute inset-0 bg-secondary-900 transition-opacity duration-1000 z-0 ${showContent ? 'opacity-80' : 'max-md:opacity-80 opacity-30 md:opacity-30'}`}></div>

            {/* Moving landscape from flight */}
            <div className={`absolute inset-x-0 bottom-[-20%] top-[40%] z-0 [mask-image:linear-gradient(to_bottom,transparent,white_40%)] transition-opacity duration-1000 ${showContent ? 'opacity-20' : 'max-md:opacity-20 opacity-40 md:opacity-40'}`}>
                <div className="flight-grid"></div>
            </div>

            {/* Content Container */}
            <div
                className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 transform
                    ${showContent ? 'opacity-100 translate-y-0' : 'md:opacity-0 md:translate-y-8 md:pointer-events-none max-md:opacity-100'}`}
            >
                <div className="w-full mx-auto py-10 mt-16 sm:mt-24 lg:mt-32 max-md:grid max-md:grid-cols-1">
                    {/* Text Phase */}
                    <div className={`flex flex-col w-full max-md:[grid-area:1/1] transition-all duration-1000 ${isMobileTextPhase ? 'max-md:opacity-100 max-md:translate-y-0 max-md:pointer-events-auto' : 'max-md:opacity-0 max-md:-translate-y-16 max-md:pointer-events-none max-md:invisible'}`}>
                        <div className="self-end inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/50 border border-primary-800 text-primary-300 text-sm font-normal mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
                            Advanced Engineering Solutions
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white tracking-tight mb-8 flex flex-col gap-2 w-full">
                            <span className={`text-right w-full block transition-transform duration-1000 delay-300 ${showContent ? 'translate-x-0' : 'max-md:translate-x-0 translate-x-10'}`}>
                                Engineering Intelligence.
                            </span>
                            <span className={`text-left text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-500 w-full block pb-2 transition-transform duration-1000 delay-500 ${showContent ? 'translate-x-0' : 'max-md:translate-x-0 -translate-x-10'}`}>
                                Building Reliable Technology.
                            </span>
                        </h1>

                        <p className={`mt-4 text-base sm:text-lg font-light text-secondary-300 max-w-3xl leading-relaxed mb-10 text-left block transition-opacity duration-1000 delay-700 ${showContent ? 'opacity-100' : 'max-md:opacity-100 opacity-0'}`}>
                            AADIT Techno Solutions delivers advanced embedded systems, semiconductor engineering, AI/ML, FPGA, automated testing, communication, and edge-computing solutions for demanding applications.
                        </p>

                        <div className={`flex flex-col sm:flex-row gap-4 justify-start transition-opacity duration-1000 delay-700 ${showContent ? 'opacity-100' : 'max-md:opacity-100 opacity-0'}`}>
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-secondary-900 transition-colors"
                            >
                                Explore Our Solutions
                                <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3.5 border border-secondary-600 rounded-md shadow-sm text-base font-medium text-white bg-transparent hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 focus:ring-offset-secondary-900 transition-colors"
                            >
                                Talk to Our Engineering Team
                            </Link>
                        </div>
                    </div> {/* End Text Phase */}

                    {/* Mobile Only: Carousel of Product Cards Replacing the Video Layout */}
                    <div
                        className={`md:hidden mt-8 w-full max-w-[280px] mx-auto h-[340px] max-md:[grid-area:1/1] [perspective:1400px] transition-all duration-1000 ${!isMobileTextPhase ? 'opacity-100 pointer-events-auto' : 'opacity-0 translate-y-12 pointer-events-none'}`}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Interactive Invisible Tap Zones for Mobile Navigation */}
                        <div
                            className="absolute top-0 bottom-16 left-0 w-1/3 z-50 cursor-pointer"
                            onClick={(e) => { e.preventDefault(); setSequenceIndex((prev) => (prev - 1)); }}
                            aria-label="Previous slide"
                        />
                        <div
                            className="absolute top-0 bottom-16 right-0 w-1/3 z-50 cursor-pointer"
                            onClick={(e) => { e.preventDefault(); setSequenceIndex((prev) => (prev + 1)); }}
                            aria-label="Next slide"
                        />

                        <div
                            className="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] z-10"
                            style={{
                                transformStyle: 'preserve-3d',
                                WebkitTransformStyle: 'preserve-3d',
                                transform: `translateZ(-192.7px) rotateY(${currentSlide * -(360 / Math.max(carouselProducts.length, 1))}deg)`,
                                WebkitTransform: `translateZ(-192.7px) rotateY(${currentSlide * -(360 / Math.max(carouselProducts.length, 1))}deg)`
                            }}
                        >
                            {carouselProducts.map((product, idx) => {
                                const angle = idx * (360 / carouselProducts.length);
                                return (
                                    <Link
                                        href={`/products/${product.slug}`}
                                        key={product.id}
                                        className="absolute inset-0 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 overflow-hidden shadow-2xl flex flex-col"
                                        style={{
                                            pointerEvents: idx === activeIndex ? 'auto' : 'none',
                                            transform: `rotateY(${angle}deg) translateZ(192.7px)`,
                                            WebkitTransform: `rotateY(${angle}deg) translateZ(192.7px)`,
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden'
                                        }}
                                    >
                                        <div className="h-44 bg-secondary-50 dark:bg-secondary-800 relative p-4 border-b border-secondary-100 dark:border-secondary-700">
                                            <Image src={product.image} alt={product.name} fill unoptimized className="object-contain drop-shadow-lg" />
                                        </div>
                                        <div className="p-4 flex-grow text-center flex flex-col justify-center bg-white dark:bg-secondary-900">
                                            <h3 className="font-bold text-secondary-900 dark:text-white line-clamp-1 mb-1">{product.name}</h3>
                                            <p className="text-secondary-500 dark:text-secondary-400 text-xs line-clamp-1 mb-3">{product.category}</p>
                                            <div className="mt-auto">
                                                <span className="text-primary-600 dark:text-primary-500 text-sm font-semibold tracking-wide uppercase">Click details &rarr;</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        {/* Carousel Indicators */}
                        <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2 z-20">
                            {carouselProducts.map((_, idx) => (
                                <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 shadow-md ${idx === activeIndex ? 'w-6 bg-primary-500' : 'w-2 bg-secondary-300 dark:bg-secondary-600'}`} />
                            ))}
                        </div>
                    </div>

                </div>

                {/* Feature Highlights beneath Hero text */}
                <div className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-secondary-800 transition-all duration-1000 delay-1000 ${showContent ? 'opacity-100 translate-y-0' : 'max-md:opacity-100 max-md:translate-y-0 opacity-0 translate-y-4'}`}>
                    {[
                        {
                            icon: Cpu,
                            title: "Embedded & FPGA",
                            desc: "Mission-critical architectures and accelerated edge processing."
                        },
                        {
                            icon: Zap,
                            title: "Protocol & Communication",
                            desc: "High-speed data translation and reliable avionics interfaces."
                        },
                        {
                            icon: Activity,
                            title: "Test & Validation",
                            desc: "Automated verification equipment ensuring zero-defect deliverables."
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                            <item.icon className="h-8 w-8 text-primary-500" />
                            <h3 className="text-base font-medium text-white">{item.title}</h3>
                            <p className="text-secondary-400 text-sm font-light">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
