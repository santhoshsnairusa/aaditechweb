import Link from "next/link";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary-900 border-t border-secondary-800 text-white pt-16 pb-8">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/images/Fav_icon_white.png" alt="AADIT Logo" className="w-8 h-8 object-contain" />
                            <span className="font-semibold italic text-sm tracking-wider text-white">
                                AADIT TECHNO SOLUTIONS
                            </span>
                        </div>
                        <p className="text-secondary-400 text-sm leading-relaxed mb-6">
                            Engineering Intelligence. Building Reliable Technology. AADIT Techno Solutions delivers advanced embedded systems, semiconductor engineering, AI/ML, FPGA, automated testing, communication, and edge-computing solutions.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Capabilities</h3>
                        <ul className="space-y-3">
                            {[
                                "Embedded Systems",
                                "Semiconductor Design",
                                "AI/ML",
                                "Test Automation"
                            ].map((item) => (
                                <li key={item}>
                                    <div className="text-secondary-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                                        <ChevronRight className="w-3 h-3 text-primary-500" />
                                        {item}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Products", href: "/products" },
                                { name: "Capabilities", href: "/capabilities" },
                                { name: "Industries", href: "/industries" },
                                { name: "About", href: "/about" },
                                { name: "Contact", href: "/contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-secondary-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact INFO */}
                    <div>
                        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="flex-shrink-0 h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                                <span className="text-sm text-secondary-400">
                                    AADIT TECHNO SOLUTIONS<br />
                                    B-608, The Platina<br />
                                    Gachibowli, Hyderabad
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="flex-shrink-0 h-5 w-5 text-primary-500 mr-3" />
                                <span className="text-sm text-secondary-400">+91 9160490891</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="flex-shrink-0 h-5 w-5 text-primary-500 mr-3" />
                                <a href="mailto:sales.aadit@gmail.com" className="text-sm text-secondary-400 hover:text-white transition-colors">
                                    sales.aadit@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-base text-secondary-500 dark:text-secondary-400">
                        &copy; {new Date().getFullYear()} AADIT Techno Solutions. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <span className="text-secondary-500 dark:text-secondary-400 text-sm">Empowering the Future of Engineering</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
