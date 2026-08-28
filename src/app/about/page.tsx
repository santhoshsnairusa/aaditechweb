import { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "About AADIT Techno Solutions",
    description: "Learn about our engineering expertise, commitment to quality, and focus on delivering robust embedded systems and semiconductor designs.",
};

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-secondary-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-900/20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        About AADIT
                    </h1>
                    <p className="mt-6 max-w-2xl text-xl text-primary-100">
                        Driven by engineering excellence. Delivering value through comprehensive electronic system design and uncompromising quality.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16">

                        {/* Our Story / Expertise */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Foundation</h2>
                                <div className="prose prose-primary text-secondary-600 max-w-none">
                                    <p className="text-lg leading-relaxed mb-4">
                                        AADIT Techno Solutions was founded in 2022 by experienced engineers with deep roots and strong industry expertise in mission-critical technology domains. From day one, our mission has been to bridge the gap between complex theoretical architecture and reliable, deployable hardware and software.
                                    </p>
                                    <p className="text-lg leading-relaxed">
                                        We specialize in overcoming the unique challenges of modern defense, aerospace, and high-end industrial systems—where failure is not an option and long-term sustainability is paramount.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-3xl font-bold text-secondary-900 mb-6">Engineering Philosophy</h2>
                                <div className="bg-secondary-50 p-6 rounded-xl border border-secondary-100">
                                    <p className="text-secondary-700 italic border-l-4 border-primary-500 pl-4 py-1">
                                        "Innovation rooted in practical reliability. We design systems that perform flawlessly in the most demanding environments."
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Key Value Propositions */}
                        <div className="mt-12 lg:mt-0">
                            <h2 className="text-3xl font-bold text-secondary-900 mb-8">Our Commitments</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        title: "Engineering Expertise",
                                        desc: "Deep knowledge in hardware, FPGA, and embedded software architectures."
                                    },
                                    {
                                        title: "Obsolescence Management",
                                        desc: "Strategic component selection mapping to 10+ year deployment lifetimes."
                                    },
                                    {
                                        title: "Cost Effectiveness",
                                        desc: "Lean operations meeting rigorous quality milestones on time and on budget."
                                    },
                                    {
                                        title: "Continuous Learning",
                                        desc: "An internal culture pushing the boundaries of AI/ML on edge compute frameworks."
                                    },
                                    {
                                        title: "Long-Term Partnerships",
                                        desc: "We stand by our designs through verification, production, and lifecycle extension."
                                    },
                                    {
                                        title: "Uncompromising Quality",
                                        desc: "Methodical design practices grounded in aerospace-grade standards."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-xl border border-secondary-200 shadow-sm hover:border-primary-300 transition-colors">
                                        <CheckCircle2 className="w-8 h-8 text-primary-600 mb-4" />
                                        <h3 className="text-lg font-bold text-secondary-900 mb-2">{item.title}</h3>
                                        <p className="text-sm text-secondary-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
