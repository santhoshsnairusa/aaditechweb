import { Metadata } from 'next';
import { Plane, ShieldAlert, Cpu, Activity, Zap, HardDrive, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
    title: "Industries Served | AADIT Techno Solutions",
    description: "Learn how AADIT's technology solutions empower the aerospace, defense, industrial, and semiconductor industries.",
};

export default function IndustriesPage() {
    const industries = [
        {
            title: "Aerospace & Avionics",
            icon: Plane,
            desc: "Delivering fully deterministic, high-reliability embedded control systems and avionics protocol interfaces capable of flight-ready validation levels."
        },
        {
            title: "Defence Systems",
            icon: ShieldAlert,
            desc: "Providing ruggedized computing modules, VPX blades, and automated test equipment engineered to withstand severe environments and ensure operational readiness."
        },
        {
            title: "Industrial Electronics",
            desc: "Modernizing operational technology with robust protocol converters, localized Edge AI controllers, and data acquisition systems.",
            icon: Zap
        },
        {
            title: "Embedded Systems",
            desc: "Serving specialized product developers with base-board integration, RTOS porting, and comprehensive hardware architectures.",
            icon: Cpu
        },
        {
            title: "Semiconductor & FPGA",
            desc: "Assisting tier-1 logic design houses with complex IP core development and UVM testbench verification.",
            icon: HardDrive
        },
        {
            title: "Edge Computing",
            desc: "Pushing raw compute power directly to the sensor node, bringing latency-free intelligence into harsh deployment scenarios.",
            icon: Activity
        },
        {
            title: "Test & Measurement",
            desc: "Equipping laboratories and production floors with bespoke high-voltage harness testers, DAQ appliances, and protocol validation tools.",
            icon: BarChart3
        }
    ];

    return (
        <div className="bg-secondary-50 min-h-screen">
            <div className="bg-secondary-900 py-20 relative isolate overflow-hidden">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-secondary-800 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="pattern-industries"
                            width="200"
                            height="200"
                            x="50%"
                            y="-1"
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern-industries)" />
                </svg>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 mt-10">Target Industries</h1>
                    <p className="max-w-2xl text-xl text-secondary-300 mx-auto">
                        Domain-specific engineering intelligence. We build the vital electronic subsystems that keep complex modern industries securely operating.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 z-10 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((ind, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl shadow-secondary-900/5 group hover:ring-2 ring-primary-500 transition-all duration-300">
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                <ind.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-extrabold text-secondary-900 mb-4">{ind.title}</h3>
                            <p className="text-secondary-600 text-sm leading-relaxed">
                                {ind.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
