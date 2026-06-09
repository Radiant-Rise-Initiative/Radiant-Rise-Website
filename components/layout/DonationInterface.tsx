'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

// Configuration constants
const SLIDER_CONFIG = {
  INTERVAL_MS: 5000,
  TOTAL_SLIDES: 3,
  SWIPE_THRESHOLD: 50, // pixels required to register as swipe
} as const;

export default function DonationInterface() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<boolean[]>([false, false, false]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);

  // Automatic Image Slider Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % SLIDER_CONFIG.TOTAL_SLIDES);
    }, SLIDER_CONFIG.INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Handle keyboard navigation (arrow keys and keyboard shortcuts)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev - 1 + SLIDER_CONFIG.TOTAL_SLIDES) % SLIDER_CONFIG.TOTAL_SLIDES);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev + 1) % SLIDER_CONFIG.TOTAL_SLIDES);
      }
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, []);

  // Handle touch swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > SLIDER_CONFIG.SWIPE_THRESHOLD) {
      if (diffX > 0) {
        // Swiped left, go to next slide
        setCurrentSlideIndex((prev) => (prev + 1) % SLIDER_CONFIG.TOTAL_SLIDES);
      } else {
        // Swiped right, go to previous slide
        setCurrentSlideIndex((prev) => (prev - 1 + SLIDER_CONFIG.TOTAL_SLIDES) % SLIDER_CONFIG.TOTAL_SLIDES);
      }
    }
  };

  // Handle image loading errors
  const handleImageError = (index: number) => {
    setImageErrors((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  // Clipboard Utility
  const copyValueToClipboard = (textValue: string, typeLabel: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textValue)
        .then(() => {
          alert(`${typeLabel} ("${textValue}") successfully copied to clipboard.`);
        })
        .catch((err) => {
          console.error('Failed clipboard action: ', err);
        });
    }
  };

  return (
    <div className={`${inter.className} min-h-screen bg-[#EAEAEA] text-[#1C1C1C] antialiased p-4 sm:p-6 md:p-10 flex items-center justify-center selection:bg-[#FF6B00]/20`}>
      <main className="bg-white w-full max-w-[1150px] min-h-[500px] sm:min-h-[600px] lg:min-h-[720px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] sm:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]">
        
        {/* Left Column: Bank Information Details Engine */}
        <div className="p-3 sm:p-5 md:px-[40px] md:py-[35px] flex flex-col justify-start overflow-y-auto max-h-[500px] sm:max-h-[600px] lg:max-h-[720px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#E5E5E5] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#666666]">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#0A0A0A] leading-tight mb-1 tracking-[-0.5px]">Direct Bank Transfer</h1>
          <p className="text-[#666666] text-[0.9rem] sm:text-[0.95rem] mb-4 sm:mb-6 leading-relaxed">
            Please utilize the verified banking details outlined below to route your financial contributions directly to Radiant Rise.
          </p>
          
          {/* Stanbic Bank Account Numbers Section */}
          <div className="group bg-white border border-[#E5E5E5] rounded-lg sm:rounded-[10px] p-3 sm:p-4 mb-3 sm:mb-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#FF6B00] hover:shadow-[0_4px_20px_rgba(255,107,0,0.06)]">
            <div className="text-[0.8rem] sm:text-[0.85rem] font-bold text-[#0A0A0A] uppercase tracking-[0.5px] sm:tracking-[1px] mb-3 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#666666] transition-colors duration-300 group-hover:text-[#FF6B00]"><rect x="2" y="10" width="20" height="12" rx="2"/><path d="M12 22V10"/><path d="M12 2L2 7h20L12 2z"/></svg>
              Stanbic Bank Account Numbers
            </div>
            
            <div className="flex flex-col gap-2 sm:gap-2.5 mt-1.5">
              <div 
                role="button"
                tabIndex={0}
                className="group/strip flex justify-between items-center bg-[#F4F4F4] p-3 sm:p-[14px_18px] rounded-lg border border-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:bg-white hover:border-[#FF6B00]" 
                onClick={() => copyValueToClipboard('9030027782492', 'USD Account Number')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    copyValueToClipboard('9030027782492', 'USD Account Number');
                  }
                }}
                title="Click to copy account number"
                aria-label="USD Account Number - Click or press Enter to copy"
              >
                <div className="flex flex-col gap-0.5 flex-1 pr-2">
                  <span className="text-[0.7rem] sm:text-[0.75rem] font-bold text-[#666666] uppercase">Radiant Rise Account (USD)</span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#0A0A0A] tracking-[0.5px] break-all">9030027782492</span>
                </div>
                <button className="bg-transparent border-none text-[#666666] cursor-pointer transition-colors duration-300 p-1 sm:p-1.5 rounded flex-shrink-0 group-hover/strip:text-[#FF6B00] hover:!bg-[#FF6B00]/10" aria-label="Copy USD Account Number" type="button">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
              </div>
              
              <div 
                role="button"
                tabIndex={0}
                className="group/strip flex justify-between items-center bg-[#F4F4F4] p-3 sm:p-[14px_18px] rounded-lg border border-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:bg-white hover:border-[#FF6B00]" 
                onClick={() => copyValueToClipboard('9030027782158', 'UGX Account Number')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    copyValueToClipboard('9030027782158', 'UGX Account Number');
                  }
                }}
                title="Click to copy account number"
                aria-label="UGX Account Number - Click or press Enter to copy"
              >
                <div className="flex flex-col gap-0.5 flex-1 pr-2">
                  <span className="text-[0.7rem] sm:text-[0.75rem] font-bold text-[#666666] uppercase">Radiant Rise Account (UGX)</span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#0A0A0A] tracking-[0.5px] break-all">9030027782158</span>
                </div>
                <button className="bg-transparent border-none text-[#666666] cursor-pointer transition-colors duration-300 p-1 sm:p-1.5 rounded flex-shrink-0 group-hover/strip:text-[#FF6B00] hover:!bg-[#FF6B00]/10" aria-label="Copy UGX Account Number" type="button">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bank Identity & Routing Section */}
          <div className="group bg-white border border-[#E5E5E5] rounded-lg sm:rounded-[10px] p-3 sm:p-4 mb-3 sm:mb-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#FF6B00] hover:shadow-[0_4px_20px_rgba(255,107,0,0.06)]">
            <div className="text-[0.8rem] sm:text-[0.85rem] font-bold text-[#0A0A0A] uppercase tracking-[0.5px] sm:tracking-[1px] mb-3 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#666666] transition-colors duration-300 group-hover:text-[#FF6B00]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Bank Identity & Routing
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-3.5 mt-1.5">
              <div className="flex flex-col gap-0.5 col-span-1 sm:col-span-2">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">Bank Name</span>
                <span className="text-[0.85rem] sm:text-[0.92rem] font-semibold text-[#0A0A0A] leading-normal">STANBIC BANK</span>
              </div>
              <div className="flex flex-col gap-0.5 col-span-1 sm:col-span-2">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">SWIFT Code</span>
                <span className="text-[0.85rem] sm:text-[0.92rem] font-bold text-[#0A0A0A] leading-normal font-mono break-all">STANBIC BANK UGANDA LIMITED</span>
              </div>
              <div className="flex flex-col gap-0.5 col-span-1 sm:col-span-2">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">Bank Address</span>
                <span className="text-[0.85rem] sm:text-[0.92rem] font-semibold text-[#0A0A0A] leading-normal">HANNINGTON ROAD, 17, CRESTED TOWERS, SHORT TOWER, 11TH FLOOR</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">Sort Code</span>
                <span className="text-[0.85rem] sm:text-[0.92rem] font-semibold text-[#0A0A0A] leading-normal">040147</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">Lugogo Branch Code</span>
                <span className="text-[0.85rem] sm:text-[0.92rem] font-semibold text-[#0A0A0A] leading-normal">031003</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">City</span>
                <span className="text-[0.85rem] sm:text-[0.92rem] font-semibold text-[#0A0A0A] leading-normal">KAMPALA</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">Country</span>
                <span className="text-[0.85rem] sm:text-[0.92rem] font-semibold text-[#0A0A0A] leading-normal">Uganda</span>
              </div>
              <div className="flex flex-col gap-0.5 col-span-1 sm:col-span-2 mt-1 border-t border-dashed border-[#E5E5E5] pt-3">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">Customer Care & Support</span>
                <span className="text-[0.75rem] sm:text-[0.88rem] font-semibold text-[#0A0A0A] leading-normal flex items-center flex-wrap gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="inline-block align-middle mr-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:+256800250250" className="text-[#0A0A0A] hover:text-[#FF6B00] transition-colors">0800 250 250</a>
                  &nbsp;&bull;&nbsp; 
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="inline-block align-middle mr-0.5 text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <a href="https://wa.me/256761250250" target="_blank" rel="noopener noreferrer" className="text-[#0A0A0A] hover:text-[#25D366] transition-colors">0761 250 250 (WhatsApp)</a>
                </span>
              </div>
            </div>
          </div>

          {/* Intermediary Bank Details Section */}
          <div className="group bg-[#F4F4F4] border-l-3 border-[#666666] rounded-r-lg sm:rounded-r-[10px] p-3 sm:p-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-l-[#FF6B00] hover:bg-[#FFFBF7]">
            <div className="text-[0.75rem] sm:text-[0.8rem] font-bold text-[#666666] uppercase tracking-[0.5px] sm:tracking-[1px] mb-2.5 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#0A0A0A]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Intermediary Bank Details
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-5 gap-y-2.5">
              <div className="flex flex-col gap-0.5 col-span-1 sm:col-span-2">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">Bank Name</span>
                <span className="text-[0.85rem] sm:text-[0.88rem] font-semibold text-[#0A0A0A] leading-normal">CITIBANK N.A</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">SWIFT Code</span>
                <span className="text-[0.85rem] sm:text-[0.88rem] font-bold text-[#0A0A0A] leading-normal font-mono">CITIUS33XXX</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">Country</span>
                <span className="text-[0.85rem] sm:text-[0.88rem] font-semibold text-[#0A0A0A] leading-normal">United States</span>
              </div>
              <div className="flex flex-col gap-0.5 col-span-1 sm:col-span-2">
                <span className="text-[0.7rem] sm:text-[0.72rem] font-semibold text-[#666666] uppercase tracking-[0.5px]">Bank Address / City</span>
                <span className="text-[0.85rem] sm:text-[0.88rem] font-semibold text-[#0A0A0A] leading-normal">388 GREENWICH STREET, NEW YORK</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Media Window (Pictures Only Slider) */}
        <div 
          ref={sliderRef}
          tabIndex={0}
          role="region"
          aria-label="Image carousel - Use arrow keys or swipe to navigate"
          aria-roledescription="carousel"
          className="relative overflow-hidden bg-[#0A0A0A] min-h-[250px] sm:min-h-[300px] lg:min-h-0 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-inset"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0 z-10">
            <div 
              className="flex w-[300%] h-full transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
              style={{ transform: `translateX(-${currentSlideIndex * 33.3333}%)` }}
              aria-live="polite"
              aria-atomic="true"
            >
              {imageErrors[0] ? (
                <div className="w-1/3 h-full bg-gradient-to-br from-gray-500 to-gray-700 flex flex-col items-center justify-center text-white text-xs sm:text-sm p-2 text-center">
                  <span className="block mb-1 text-xs opacity-75">Image unavailable</span>
                  <span className="block text-[0.65rem] opacity-60">Slide 1 of 3</span>
                </div>
              ) : (
                <Image
                  src="/assets/images/gallery_images/01. Healing Hearts.jpg"
                  alt="Healing Hearts - Community Support (Slide 1 of 3)"
                  fill
                  className="w-1/3 h-full object-cover"
                  onError={() => handleImageError(0)}
                  priority={currentSlideIndex === 0}
                />
              )}
              {imageErrors[1] ? (
                <div className="w-1/3 h-full bg-gradient-to-br from-gray-500 to-gray-700 flex flex-col items-center justify-center text-white text-xs sm:text-sm p-2 text-center">
                  <span className="block mb-1 text-xs opacity-75">Image unavailable</span>
                  <span className="block text-[0.65rem] opacity-60">Slide 2 of 3</span>
                </div>
              ) : (
                <Image
                  src="/assets/images/gallery_images/02. Community Synergy.jpg"
                  alt="Community Synergy - Unity and Support (Slide 2 of 3)"
                  fill
                  className="w-1/3 h-full object-cover"
                  onError={() => handleImageError(1)}
                  priority={currentSlideIndex === 1}
                />
              )}
              {imageErrors[2] ? (
                <div className="w-1/3 h-full bg-gradient-to-br from-gray-500 to-gray-700 flex flex-col items-center justify-center text-white text-xs sm:text-sm p-2 text-center">
                  <span className="block mb-1 text-xs opacity-75">Image unavailable</span>
                  <span className="block text-[0.65rem] opacity-60">Slide 3 of 3</span>
                </div>
              ) : (
                <Image
                  src="/assets/images/gallery_images/03. Stronger Futures.jpg"
                  alt="Stronger Futures - Radiant Rise Impact (Slide 3 of 3)"
                  fill
                  className="w-1/3 h-full object-cover"
                  onError={() => handleImageError(2)}
                  priority={currentSlideIndex === 2}
                />
              )}
            </div>
          </div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentSlideIndex(index);
                  }
                }}
                className={`w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 focus:ring-offset-[#0A0A0A] ${
                  index === currentSlideIndex 
                    ? 'bg-[#FF6B00] scale-125' 
                    : 'bg-white/50 hover:bg-white/70 scale-100'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlideIndex ? 'true' : 'false'}
                type="button"
              />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

// Also export as a named export for modules that import it with { DonationInterface }
export { DonationInterface };