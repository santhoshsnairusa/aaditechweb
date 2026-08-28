"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { ArrowRight, Cpu, Zap, Activity } from "lucide-react";

export default function Hero() {
    const [showContent, setShowContent] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (showContent) {
            // Display titles for 6 seconds, then repeat video
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
                <div onClick={handleSkipVideo} className="absolute inset-0 z-[5] cursor-pointer" title="Click to skip video"></div>
            )}

            {/* Background Video */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain md:object-cover object-center z-0 scale-[1.28] md:scale-100 lg:scale-[1.28] pointer-events-none transition-transform duration-700"
                muted
                playsInline
                autoPlay
                onEnded={handleVideoEnded}
                onCanPlay={(e) => { e.currentTarget.playbackRate = 0.75; }}
            >
                <source src="/videos/to_showcase_web_home_page_back.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay to ensure text contrast when content is visible */}
            <div className={`absolute inset-0 bg-secondary-900 transition-opacity duration-1000 z-0 ${showContent ? 'opacity-80' : 'opacity-30'}`}></div>

            {/* Moving landscape from flight */}
            <div className={`absolute inset-x-0 bottom-[-20%] top-[40%] z-0 [mask-image:linear-gradient(to_bottom,transparent,white_40%)] transition-opacity duration-1000 ${showContent ? 'opacity-20' : 'opacity-40'}`}>
                <div className="flight-grid"></div>
            </div>

            {/* Content Container */}
            <div
                className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 transform
                    ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
            >
                <div className="w-full flex flex-col mx-auto py-10 mt-16 sm:mt-24 lg:mt-32">
                    <div className="self-end inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/50 border border-primary-800 text-primary-300 text-sm font-normal mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-primary-500"></span>
                        Advanced Engineering Solutions
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white tracking-tight mb-8 flex flex-col gap-2 w-full">
                        <span className={`text-right w-full block transition-transform duration-1000 delay-300 ${showContent ? 'translate-x-0' : 'translate-x-10'}`}>
                            Engineering Intelligence.
                        </span>
                        <span className={`text-left text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-500 w-full block pb-2 transition-transform duration-1000 delay-500 ${showContent ? 'translate-x-0' : '-translate-x-10'}`}>
                            Building Reliable Technology.
                        </span>
                    </h1>

                    <p className={`mt-4 text-base sm:text-lg font-light text-secondary-300 max-w-3xl leading-relaxed mb-10 text-left block transition-opacity duration-1000 delay-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                        AADIT Techno Solutions delivers advanced embedded systems, semiconductor engineering, AI/ML, FPGA, automated testing, communication, and edge-computing solutions for demanding applications.
                    </p>

                    <div className={`flex flex-col sm:flex-row gap-4 justify-start transition-opacity duration-1000 delay-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
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
                </div>

                {/* Feature Highlights beneath Hero text */}
                <div className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-secondary-800 transition-all duration-1000 delay-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
