"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Products", href: "/products" },
        { name: "Capabilities", href: "/capabilities" },
        { name: "Industries", href: "/industries" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-secondary-200">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group flex-row">
                            {/* Mobile Logo */}
                            <img src="/images/header_logo.png" alt="AADIT Logo Mobile" className="h-12 w-auto object-contain bg-transparent md:hidden" />

                            {/* Desktop Logo */}
                            <img src="/images/Logo_sample_no_text_white.png" alt="AADIT Logo" className="h-16 w-auto object-contain bg-transparent hidden md:block" />

                            <span className="font-bold italic text-lg text-secondary-900 tracking-tight hidden md:inline-block">
                                AADIT <span className="text-black">TECHNO SOLUTIONS</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex md:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary-600 flex items-center ${pathname === link.href ? "text-primary-600" : "text-secondary-600"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>



                    {/* Mobile menu button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-xl border-b border-secondary-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href
                                    ? "text-primary-600 bg-primary-50"
                                    : "text-secondary-700 hover:text-primary-600 hover:bg-secondary-50"
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                    </div>
                </div>
            )}
        </header>
    );
}
