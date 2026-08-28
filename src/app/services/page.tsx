import { Metadata } from 'next';
import { Cpu, Terminal, Layers, TestTube2, Workflow, LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
    title: "Core Services | AADIT Techno Solutions",
    description: "Comprehensive engineering services including embedded systems, semiconductor design, AI/ML edge computing, and test automation.",
};

export default function ServicesPage() {
    const services = [
        {
            id: "embedded-systems",
            title: "Embedded Systems",
            icon: Cpu,
            description: "End-to-end design and realization of reliable embedded architectures for mission-critical applications.",
            capabilities: [
                "Embedded System Design",
                "Firmware Development",
                "RTOS Integration & Tuning",
                "Hardware Design",
                "High-Speed PCB Design"
            ]
        },
        {
            id: "semiconductor-design",
            title: "Semiconductor Design",
            icon: Layers,
            description: "Advanced FPGA-based logic implementation and IP core development meeting strict verification standards.",
            capabilities: [
                "IP Core Development",
                "RTL Verification",
                "OVM / UVM Methodologies",
                "FPGA-Based Hardware Development",
                "SoC Architecture Support"
            ]
        },
        {
            id: "ai-ml",
            title: "AI / ML Integration",
            icon: Workflow,
            description: "Pushing intelligence to the edge. We design bespoke systems that execute complex machine learning models directly on localized hardware.",
            capabilities: [
                "High-End Edge Devices",
                "Low-Power Edge Device Design",
                "AI-Enabled Embedded Systems",
                "Hardware Acceleration (NPU/GPU/FPGA)"
            ]
        },
        {
            id: "test-automation",
            title: "Test Automation",
            icon: TestTube2,
            description: "Rigorous automated validation platforms ensuring complete test coverage for aerospace and industrial subcomponents.",
            capabilities: [
                "Automated Test Equipment (ATE)",
                "Protocol Converters & Simulation",
                "Graphical User Interfaces for DAQ",
                "End-to-End Test Systems",
                "Regulatory Validation Systems"
            ]
        }
    ];

    return (
        <div className="bg-secondary-50 dark:bg-secondary-950 min-h-screen pb-20">
            <div className="bg-secondary-900 py-20 relative">
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                        Core Engineering Services
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-xl text-secondary-300">
                        Delivering robust hardware and software solutions from concept through deployment and lifecycle support.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white dark:bg-secondary-900 rounded-2xl shadow-md border border-secondary-200 dark:border-secondary-700 overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/40 dark:hover:shadow-orange-500/40">
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    <service.icon className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">{service.title}</h2>
                                <p className="text-secondary-600 dark:text-secondary-300 mb-8 flex-grow leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="border-t border-secondary-100 dark:border-secondary-800 pt-6">
                                    <h3 className="text-sm font-bold text-secondary-900 dark:text-white uppercase tracking-wider mb-4">Key Capabilities</h3>
                                    <ul className="space-y-3">
                                        {service.capabilities.map((cap, idx) => (
                                            <li key={idx} className="flex items-center text-sm font-medium text-secondary-700 dark:text-secondary-200">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-3 flex-shrink-0"></div>
                                                {cap}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
