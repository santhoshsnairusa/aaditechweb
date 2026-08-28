import Hero from '@/components/home/Hero';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { productService } from '@/services/productService';
import Image from 'next/image';

export default async function Home() {
  const featuredProducts = await productService.getFeaturedProducts();

  return (
    <div>
      <Hero />

      {/* Company Introduction */}
      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-secondary-900 dark:text-white tracking-tight sm:text-4xl mb-6">
                About AADIT Techno Solutions
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-6 leading-relaxed">
                Founded in 2022 by experienced engineers with strong industry expertise, AADIT Techno Solutions is dedicated to delivering uncompromising quality and innovation in electronic system design.
              </p>
              <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed">
                We focus on engineering excellence, bridging the gap between cutting-edge semiconductor capabilities and robust embedded systems. Our long-term partnerships ensure continuous learning and effective obsolescence management for demanding sectors.
              </p>
              <Link href="/about" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
                Learn more about our expertise
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="mt-12 lg:mt-0 relative rounded-2xl bg-secondary-100 dark:bg-secondary-800 p-8 flex items-center justify-center min-h-[400px]">
              {/* Abstract placeholder visual for introduction */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-50 rounded-2xl overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-4 border-white/40 rounded-full blur-2xl"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-300/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-400/20 rounded-full blur-2xl"></div>
              </div>
              <div className="relative z-10 glass-panel bg-white/60 dark:bg-secondary-900/60 backdrop-blur-md p-6 rounded-xl border border-white/80 dark:border-secondary-700 shadow-xl max-w-sm w-full">
                <h3 className="font-bold text-secondary-900 dark:text-white mb-4 border-b border-secondary-200 dark:border-secondary-700 pb-2">Core Focus</h3>
                <ul className="space-y-3">
                  {[
                    "Engineering Expertise",
                    "Embedded Systems",
                    "Cost Effectiveness",
                    "Obsolescence Management"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-secondary-700 dark:text-secondary-200 font-medium text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-secondary-50 dark:bg-secondary-950 border-t border-secondary-100 dark:border-secondary-800">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-secondary-900 dark:text-white tracking-tight sm:text-4xl">Core Services</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-secondary-500 dark:text-secondary-400">
              End-to-end engineering excellence across critical domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Embedded Systems",
                items: ["Embedded System Design", "Firmware Development", "RTOS", "Hardware Design", "PCB Design"]
              },
              {
                title: "Semiconductor Design",
                items: ["IP Core Development", "Verification", "OVM", "UVM", "FPGA-Based Development"]
              },
              {
                title: "AI / ML",
                items: ["High-End Edge Devices", "Low-Power Edge Device Design", "AI-enabled embedded systems"]
              },
              {
                title: "Test Automation",
                items: ["Automated Test Equipment", "Protocol Converters", "Graphical User Interfaces", "Test systems", "Validation systems"]
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white dark:bg-secondary-900 rounded-xl shadow-sm border border-secondary-200 dark:border-secondary-700 overflow-hidden hover:shadow-xl hover:shadow-primary-500/40 dark:hover:shadow-orange-500/40 transition-shadow">
                <div className="p-1.5 bg-primary-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-secondary-600 dark:text-secondary-300 text-sm flex items-start gap-2">
                        <span className="text-primary-500 font-bold mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700">
              View all services & capabilities <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-secondary-900 dark:text-white tracking-tight sm:text-4xl relative inline-block">
                Featured Products
                <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary-600 rounded-full"></div>
              </h2>
              <p className="mt-4 text-xl text-secondary-500 dark:text-secondary-400 max-w-2xl">
                High-reliability solutions engineered for demanding applications.
              </p>
            </div>
            <div className="hidden sm:block">
              <Link href="/products" className="text-primary-600 font-medium hover:text-primary-700 flex items-center">
                Browse Portfolio <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product) => (
              <Link href={`/products/${product.slug}`} key={product.id} className="group flex flex-col bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary-500/40 dark:hover:shadow-orange-500/40 transition-all duration-300">
                <div className="h-48 bg-secondary-100 dark:bg-secondary-800 relative overflow-hidden flex items-center justify-center object-cover">
                  {/* Placeholder for Product Image */}
                  <div className="absolute inset-0 bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center text-secondary-400 group-hover:scale-105 transition-transform duration-500">
                    <span className="font-medium">Product Image<br />{product.name}</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">{product.category}</span>
                  <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm mb-4 line-clamp-3 flex-grow">{product.shortDescription}</p>
                  <div className="mt-auto flex items-center text-sm font-medium text-primary-600">
                    View Details <ArrowRight className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 sm:hidden text-center">
            <Link href="/products" className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700">
              Browse Portfolio <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10 flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to discuss your project?
            </h2>
            <p className="mt-3 text-xl text-primary-200">
              Connect with our engineers to explore how AADIT can support your mission.
            </p>
          </div>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-lg text-lg font-medium text-primary-900 bg-white dark:bg-secondary-900 hover:bg-primary-50 transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
