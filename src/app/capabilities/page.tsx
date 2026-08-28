import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Engineering Capabilities | AADIT Techno Solutions",
    description: "Detailed overview of our specific technical capabilities across hardware, software, protocols, and testing domains.",
};

export default function CapabilitiesPage() {
    const capabilities = [
        {
            title: "Hardware Engineering",
            items: [
                "Embedded hardware design",
                "High-density PCB design & routing",
                "Analog and digital electronics",
                "Microcontrollers and SoC selection",
                "Precision data acquisition front-ends"
            ]
        },
        {
            title: "Embedded Software",
            items: [
                "Bare-metal firmware development",
                "RTOS (Real-Time Operating Systems) integration",
                "Low-level device drivers",
                "Hardware-software interface architecture",
                "Deterministic control loops"
            ]
        },
        {
            title: "FPGA & Semiconductor",
            items: [
                "Complex FPGA logic development",
                "Custom IP core creation",
                "Hardware acceleration logic",
                "OVM/UVM based verification",
                "Timing closure and optimization"
            ]
        },
        {
            title: "Communication Protocols",
            items: [
                "MIL-STD-1553B & ARINC 429",
                "ARINC 664 / AFDX",
                "RS422, RS485, UART",
                "Industrial Ethernet & USB",
                "PCI Express (PCIe)",
                "VPX (VITA Standards) and VME"
            ]
        },
        {
            title: "Testing & Validation",
            items: [
                "Custom Automated Test Equipment (ATE)",
                "Build-to-print test jigs",
                "Diagnostic & fault-insertion software",
                "System-level validation setups",
                "High-speed data acquisition logging"
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-secondary-50 py-16 border-b border-secondary-200">
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-secondary-900 tracking-tight">Engineering Capabilities</h1>
                    <p className="mt-4 text-xl text-secondary-600 max-w-3xl">
                        Our multidisciplinary expertise directly translates to reduced technical risk and accelerated deployment for our customers.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {capabilities.map((section, idx) => (
                        <div key={idx} className="relative pl-8">
                            <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary-100 rounded-full"></div>
                            <div className="absolute top-2 left-[-3px] w-2.5 h-2.5 rounded-full bg-primary-500 ring-4 ring-white"></div>

                            <h2 className="text-xl font-bold text-secondary-900 mb-6">{section.title}</h2>
                            <ul className="space-y-4">
                                {section.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="text-secondary-700 bg-white border border-secondary-100 rounded-lg p-3 shadow-sm text-sm font-medium">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
