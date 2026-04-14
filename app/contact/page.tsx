"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ContactUs() {
    const [copied, setCopied] = useState<string | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <main className="min-h-screen bg-white text-black flex flex-col pt-20 md:pt-24">
            <Navbar />

            {/* Header Replication */}
            <section className="pt-[20px] md:pt-[50px] px-4 md:px-12 lg:px-8 w-full">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <SectionHeader 
                        title="Contact Us"
                        linkText="MORE ABOUT US"
                        href="/about"
                        className="mb-[72px]"
                    />
                </div>
            </section>

            {/* Simple Image Header (Replaces Hero) - Replicated Gallery Item Style */}
            <section className="pt-0 px-4 md:px-12 lg:px-8 w-full">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <div className="w-full h-[420px] md:h-[520px] overflow-hidden bg-gray-100 mb-[104px] border border-black/5 relative group">
                        <Image 
                            src="/assets/images/gallery_images/01. Healing Hearts.jpg" 
                            alt="Contact Us" 
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        
                        {/* Overlay Gradient (Matches Gallery) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                        
                        {/* Top Right Logo Overlay (Matches Gallery) */}
                        <div className="absolute top-8 right-8 z-30">
                            <Image 
                                src="/assets/branding/rr-logo-v3.svg" 
                                alt="Radiant Rise" 
                                width={40}
                                height={40}
                                className="invert opacity-90"
                            />
                        </div>

                        {/* Bottom Content (Matches Gallery) */}
                        <div className="absolute bottom-8 left-8 right-8 z-30 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div className="text-white flex flex-col items-start gap-3">
                                <span className="inline-block px-3 py-1 bg-[#f5f5f7]/10 text-white/90 text-xs font-mono tracking-widest backdrop-blur-sm uppercase mb-1">
                                    GET IN TOUCH
                                </span>
                                <p className="text-xl md:text-3xl font-medium tracking-tight max-w-2xl leading-tight text-white">
                                    We aim to respond to all inquiries within 24 hours.
                                </p>
                            </div>
                            <Link
                                href="#location-map"
                                className="bg-[#f5f5f7] text-black w-full md:w-auto flex justify-center items-center gap-2 px-8 py-3.5 rounded-none text-sm font-mono tracking-widest uppercase hover:bg-[#f5f5f7]/90 transition-colors shadow-lg shrink-0 group/btn"
                            >
                                GET DIRECTIONS
                                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="pb-20 md:pb-32 pt-0 px-4 md:px-12 lg:px-8 w-full">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start w-full">
                        
                        {/* Left Column: Info */}
                        <div className="min-w-0 w-full">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-8">
                                We are always ready to help you and answer your questions
                            </h2>

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
                                    <h3 className="text-lg font-semibold mb-4 text-black">Our Platforms</h3>
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
                        <div className="bg-[#f5f5f7] rounded-none p-8 md:p-12 lg:p-16 min-w-0 w-full">
                            <h3 className="text-3xl lg:text-4xl font-medium tracking-tight mb-4 text-black">Send Message</h3>
                            <p className="text-black/60 mb-12 max-w-sm">
                                Define your goals and identify areas where we can support or collaborate.
                            </p>

                            <form 
                                className="space-y-8" 
                                onSubmit={(e) => { 
                                    e.preventDefault(); 
                                    const formData = new FormData(e.currentTarget);
                                    const name = formData.get('name');
                                    const email = formData.get('email');
                                    const subject = formData.get('subject');
                                    const message = formData.get('message');
                                    
                                    const mailtoLink = `mailto:info@radiantriseinitiative.org?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                                    window.location.href = mailtoLink;
                                }}
                            >
                                <div className="border-b border-black/10 focus-within:border-black/50 transition-colors py-2">
                                    <input 
                                        name="name"
                                        type="text" 
                                        placeholder="Full name" 
                                        required
                                        className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm"
                                    />
                                </div>
                                <div className="border-b border-black/10 focus-within:border-black/50 transition-colors py-2 rounded-none">
                                    <input 
                                        name="email"
                                        type="email" 
                                        placeholder="Email" 
                                        required
                                        className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm"
                                    />
                                </div>
                                <div className="border-b border-black/10 focus-within:border-black/50 transition-colors py-2">
                                    <input 
                                        name="subject"
                                        type="text" 
                                        placeholder="Subject" 
                                        required
                                        className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm"
                                    />
                                </div>
                                <div className="border-b border-black/10 focus-within:border-black/50 transition-colors py-2">
                                    <textarea 
                                        name="message"
                                        placeholder="Message" 
                                        rows={2}
                                        required
                                        className="w-full bg-transparent outline-none placeholder:text-black/40 text-black text-sm resize-none"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="bg-[#2D2D2D] hover:bg-black text-white px-8 py-4 rounded-none text-sm font-medium transition-colors w-fit flex items-center gap-3 mt-12"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section id="location-map" className="px-4 md:px-12 lg:px-8 pb-20 md:pb-32 w-full scroll-mt-24">
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full min-w-0">
                    {/* Embedded grayscale map centered on Kampala */}
                    <div className="w-full h-[420px] md:h-[620px] rounded-none overflow-hidden border border-black/5 relative">
                        {/* Floating Marker Card - Responsive positions */}
                        <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-6 md:top-8 md:right-8 z-10 bg-[#CD5929] p-6 flex flex-col gap-3 w-auto sm:min-w-[280px]">
                            <h4 className="font-semibold text-lg text-white">Radiant Rise Initiative</h4>
                            <p className="text-sm text-white/80 leading-tight">
                                Acholi Quarters,<br />
                                Kampala, Uganda
                            </p>
                            <a 
                                href="https://maps.google.com/?q=Acholi+Quarters,+Kampala,+Uganda" 
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 text-xs font-semibold uppercase tracking-widest text-white flex items-center gap-2 hover:opacity-60 transition-opacity"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l5.94-5.94"/></svg>
                                Directions
                            </a>
                        </div>

                        {/* Note: In production, the Google Maps embed needs a valid API key or just use an iframe embed string. 
                            The below uses a basic iframe map view centered on Kampala for demonstration matching the design. */}
                        {/* Map Loading Skeleton */}
                        {!isMapLoaded && (
                            <div className="absolute inset-0 bg-[#e5e3df] animate-pulse flex items-center justify-center">
                                <div className="space-y-4 w-full h-full p-12">
                                    <div className="w-full h-full bg-black/5 rounded-none" />
                                </div>
                            </div>
                        )}

                        <iframe 
                            src="https://maps.google.com/maps?q=0.33534,32.63950&z=15&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="100%" 
                            onLoad={() => setIsMapLoaded(true)}
                            style={{ 
                                border: 0, 
                                filter: 'grayscale(1) contrast(1.1) brightness(1.1)',
                                position: 'absolute',
                                top: '-75px',
                                left: '-75px',
                                width: 'calc(100% + 150px)',
                                height: 'calc(100% + 150px)',
                                pointerEvents: 'none',
                                opacity: isMapLoaded ? 1 : 0,
                                transition: 'opacity 0.8s ease-in-out'
                            }} 
                            allowFullScreen 
                            loading="eager"
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
