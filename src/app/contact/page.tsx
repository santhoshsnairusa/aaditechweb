"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

function ContactForm() {
    const searchParams = useSearchParams();
    const productParam = searchParams.get('product');
    const subjectParam = searchParams.get('subject');

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        subject: subjectParam || (productParam ? `Enquiry regarding ${productParam}` : ""),
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setFormData({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Failed to submit enquiry.");
            }
        } catch (err) {
            setStatus("error");
            setErrorMessage("Network error occurred.");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-primary-50 p-8 rounded-xl border border-primary-200 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <CheckCircle className="w-16 h-16 text-primary-500 mb-6" />
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">Request Sent Successfully</h3>
                <p className="text-secondary-600 mb-8 max-w-md">
                    Thank you for exploring solutions with AADIT Techno Solutions. Our engineering and sales team will review your requirements and reach out very shortly.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2 bg-white border border-secondary-300 rounded-md shadow-sm font-medium text-secondary-700 hover:bg-secondary-50 transition-colors"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary-200">
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">Send an Enquiry</h3>

            {status === "error" && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 border border-red-100 text-sm font-medium text-center">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-secondary-700">Name *</label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-secondary-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white" />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-secondary-700">Company</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full border border-secondary-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-700">Email *</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-secondary-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-secondary-700">Phone *</label>
                        <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-secondary-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white" />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary-700">Subject</label>
                    <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="mt-1 block w-full border border-secondary-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white" />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary-700">Message *</label>
                    <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full border border-secondary-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white"></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-75 disabled:cursor-not-allowed transition-colors"
                    >
                        {status === "submitting" ? "Sending..." : "Send Enquiry"}
                        {!status && <Send className="ml-2 w-4 h-4" />}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function ContactPage() {
    return (
        <div className="bg-secondary-50 min-h-screen">
            {/* Header */}
            <div className="bg-secondary-900 py-16">
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                        Contact AADIT
                    </h1>
                    <p className="mt-4 text-xl text-secondary-300">
                        Reach out to our engineering team to discuss your technical challenges.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Contact Details pane */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary-200 sticky top-28">
                            <h2 className="text-xl font-bold text-secondary-900 mb-8 border-b border-secondary-100 pb-4">Corporate Office</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center border border-primary-100">
                                        <MapPin className="h-5 w-5 text-primary-600" aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-semibold text-secondary-900">Address</h3>
                                        <p className="mt-1 text-sm text-secondary-600 leading-relaxed">
                                            AADIT TECHNO SOLUTIONS<br />
                                            B-608, The Platina<br />
                                            Gachibowli, Hyderabad, India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center border border-primary-100">
                                        <Phone className="h-5 w-5 text-primary-600" aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-semibold text-secondary-900">Phone</h3>
                                        <p className="mt-1 text-sm text-secondary-600">+91 9160490891</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center border border-primary-100">
                                        <Mail className="h-5 w-5 text-primary-600" aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-semibold text-secondary-900">Email</h3>
                                        <p className="mt-1 text-sm text-secondary-600">
                                            <a href="mailto:sales.aadit@gmail.com" className="hover:text-primary-600 transition-colors">sales.aadit@gmail.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Pane */}
                    <div className="lg:col-span-8">
                        <Suspense fallback={<div className="bg-white p-8 rounded-xl shadow border border-secondary-200 h-96 flex items-center justify-center"><div className="animate-spin w-8 h-8 rounded-full border-4 border-primary-200 border-t-primary-600"></div></div>}>
                            <ContactForm />
                        </Suspense>
                    </div>

                </div>
            </div>
        </div>
    );
}
