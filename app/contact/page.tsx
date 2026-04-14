"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <main className="min-h-screen bg-white text-black flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-28 md:pt-36 px-4 sm:px-12 lg:px-0">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full relative">
                    <div className="relative w-full h-[250px] md:h-[400px] lg:h-[450px] rounded-3xl md:rounded-[48px] overflow-hidden bg-gray-100">
                        <img
                            src="/assets/images/hero_images/hero_001.jpg"
                            alt="Contact Us"
                            className="absolute inset-0 w-full h-full object-cover z-0"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-black/20" /> 
                        
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="text-5xl sm:text-6xl md:text-8xl font-medium text-white tracking-tight"
                            >
                                Contacts
                            </motion.h1>
                        </div>
                        
                        {/* Floating Breadcrumb */}
                        <div className="absolute bottom-8 right-8 bg-white text-black px-6 py-3 rounded-full hidden md:flex items-center gap-2 text-sm font-medium shadow-xl">
                            <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
                            <span className="text-black/40">/</span>
                            <span className="text-black/60">Contacts</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-20 md:py-32 px-4 sm:px-12 lg:px-0">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                        
                        {/* Left Column: Info */}
                        <div>
                            <span className="text-sm font-mono tracking-widest text-black/40 uppercase block mb-8">
                                / get in touch /
                            </span>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-8">
                                We are always ready to help you and answer your questions
                            </h2>
                            <p className="text-lg text-black/60 mb-16 leading-relaxed max-w-lg">
                                Whether you want to partner with us, inquire about our programs, or volunteer with the Radiant Rise Initiative, our team is here for you. We aim to respond to all inquiries within 24 hours.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-black">Call Center</h3>
                                    <p className="text-black/70 mb-2 font-medium">+256 000 000 000</p>
                                    <p className="text-black/70 font-medium">+256 000 000 001</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-black">Our Location</h3>
                                    <p className="text-black/70 mb-1 font-medium">Acholi Quarters,</p>
                                    <p className="text-black/70 mb-1 font-medium">Kampala, Uganda</p>
                                    <p className="text-black/70 font-medium">P.O. Box 0000, Kampala</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-black">Email</h3>
                                    <button 
                                        onClick={() => handleCopy('info@radiantrise.org')}
                                        className="text-black/70 font-medium hover:text-black transition-colors flex items-center gap-2 group"
                                    >
                                        info@radiantrise.org
                                        {copied === 'info@radiantrise.org' ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-black">Social network</h3>
                                    <div className="flex items-center gap-6">
                                        <Link href="#" className="font-semibold hover:opacity-50 transition-opacity text-black">f</Link>
                                        <Link href="#" className="font-semibold hover:opacity-50 transition-opacity text-black">𝕏</Link>
                                        <Link href="#" className="font-semibold hover:opacity-50 transition-opacity text-black">in</Link>
                                        <Link href="#" className="font-semibold hover:opacity-50 transition-opacity text-black">ig</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form Card */}
                        <div className="bg-[#f5f5f7] rounded-[32px] md:rounded-[40px] p-8 md:p-12 lg:p-16">
                            <h3 className="text-3xl lg:text-4xl font-medium tracking-tight mb-4">Get in Touch</h3>
                            <p className="text-black/60 mb-12 max-w-sm">
                                Define your goals and identify areas where we can support or collaborate.
                            </p>

                            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Message sent! Thanks for reaching out."); }}>
                                <div className="border-b border-black/10 focus-within:border-black/50 transition-colors py-2">
                                    <input 
                                        type="text" 
                                        placeholder="Full name" 
                                        required
                                        className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm"
                                    />
                                </div>
                                <div className="border-b border-black/10 focus-within:border-black/50 transition-colors py-2">
                                    <input 
                                        type="email" 
                                        placeholder="Email" 
                                        required
                                        className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm"
                                    />
                                </div>
                                <div className="border-b border-black/10 focus-within:border-black/50 transition-colors py-2">
                                    <input 
                                        type="text" 
                                        placeholder="Subject" 
                                        required
                                        className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm"
                                    />
                                </div>
                                <div className="border-b border-black/10 focus-within:border-black/50 transition-colors py-2">
                                    <textarea 
                                        placeholder="Message" 
                                        rows={2}
                                        required
                                        className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm resize-none"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="bg-[#2D2D2D] hover:bg-black text-white px-8 py-4 rounded-[100px] text-sm font-medium transition-colors w-fit flex items-center gap-3 mt-12"
                                >
                                    <span className="w-2 h-2 rounded-full bg-white/50" />
                                    Send a message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="px-4 sm:px-12 lg:px-0 pb-20 md:pb-32">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    {/* Embedded grayscale map centered on Kampala */}
                    <div className="w-full h-[300px] md:h-[500px] rounded-3xl md:rounded-[48px] overflow-hidden border border-black/5 relative">
                        {/* Floating Marker Card */}
                        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 bg-white shadow-2xl p-6 flex flex-col gap-3 w-auto min-w-[280px]">
                            <h4 className="font-semibold text-lg">Radiant Rise Initiative</h4>
                            <p className="text-sm text-black/60 leading-tight">
                                Acholi Quarters,<br />
                                Kampala, Uganda
                            </p>
                            <a 
                                href="https://maps.google.com/?q=Acholi+Quarters,+Kampala,+Uganda" 
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 text-xs font-semibold uppercase tracking-widest text-black flex items-center gap-2 hover:opacity-50 transition-opacity"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l5.94-5.94"/></svg>
                                Directions
                            </a>
                        </div>

                        {/* Note: In production, the Google Maps embed needs a valid API key or just use an iframe embed string. 
                            The below uses a basic iframe map view centered on Kampala for demonstration matching the design. */}
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.87954930113!2d32.48622119159938!3d0.31302830000000216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc0f9d74b39b%3A0x4538903dd96b6fec!2sKampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1713093282928!5m2!1sen!2sus" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'grayscale(1) contrast(1.1) brightness(1.1)' }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full object-cover"
                        ></iframe>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
