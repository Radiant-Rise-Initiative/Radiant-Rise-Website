"use client";

import { motion } from "framer-motion";

export function TheoriesOfChange() {
  return (
    <section className="w-full bg-[#CD5929] text-[#E8E8E8] pt-24 font-sans selection:bg-white selection:text-[#CD5929]">
      <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
        
        {/* Section Header */}
        <div className="pb-16 max-w-[56rem] text-white">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-8">
            Theory of Change
          </h2>
          <p className="text-white text-lg md:text-xl font-normal md:font-medium leading-relaxed">
            We transform vulnerability into stability through a disciplined, structured six-month pathway. By coordinating trauma-informed stabilization with market-aligned skills and income activation, we move families in Acholi Quarters from survival mode toward sustained, intergenerational economic resilience.
          </p>
        </div>

      </div>

      {/* Table Header (Edge to Edge, Hidden below MD since it stacks) */}
      <div className="w-full border-b border-white/30">
        <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0 hidden md:block">
            <div className="grid grid-cols-12 gap-8 py-4 text-xs font-mono text-white/60 uppercase tracking-widest">
            <div className="col-span-1">↓ (Stage)</div>
            <div className="col-span-7">↓ (Name)</div>
            <div className="col-span-4">↓ (Includes)</div>
            </div>
        </div>
      </div>

      {/* Rows (Edge to Edge) */}
      <div className="flex flex-col w-full overflow-hidden">
          
        {/* Row 1: STABILIZE - 5% darker */}
        <div className="w-full border-b border-white/30 bg-black/[0.05]">
          <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-14 items-start"
            >
              <div className="md:col-span-1 pb-4 md:pb-0 mb-2 md:mb-0">
                 <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-2 block">↓ (Stage)</span>
                 <span className="text-white/30 text-[clamp(3.5rem,7.5vw,8rem)] leading-[0.8] font-normal tracking-[-0.04em]">1</span>
              </div>
              
              <div className="md:col-span-7 pb-4 md:pb-0 mb-4 md:mb-0 min-w-0 pr-0 md:pr-8">
                 <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-2 block">↓ (Name)</span>
                 <h3 className="text-[clamp(3.2rem,6.5vw,8rem)] leading-[0.8] font-semibold tracking-[-0.04em] text-white whitespace-nowrap">
                   STABILIZE
                 </h3>
              </div>
              
              <div className="md:col-span-4">
                <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-4 block">↓ (Includes)</span>
                <div className="text-sm md:text-base text-white/80 leading-relaxed font-medium">
                  <p>
                    Surface emotional ground through trauma-informed counseling. We provide safe spaces for young mothers to recover from adversity and reclaim their sense of purpose.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Row 2: BUILD - 10% darker */}
        <div className="w-full border-b border-white/30 bg-black/[0.10]">
          <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-14 items-start"
            >
              <div className="md:col-span-1 pb-4 md:pb-0 mb-2 md:mb-0">
                 <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-2 block">↓ (Stage)</span>
                 <span className="text-white/30 text-[clamp(3.5rem,7.5vw,8rem)] leading-[0.8] font-normal tracking-[-0.04em]">2</span>
              </div>
              
              <div className="md:col-span-7 pb-4 md:pb-0 mb-4 md:mb-0 min-w-0 pr-0 md:pr-8">
                 <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-2 block">↓ (Name)</span>
                 <h3 className="text-[clamp(3.2rem,6.5vw,8rem)] leading-[0.8] font-semibold tracking-[-0.04em] text-white whitespace-nowrap">
                   BUILD
                 </h3>
              </div>
              
              <div className="md:col-span-4">
                <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-4 block">↓ (Includes)</span>
                <div className="text-sm md:text-base text-white/80 leading-relaxed font-medium">
                  <p>
                    Establish a strategic foundation through vocational training and financial literacy. We align participants with skills that meet real employer demand in Kampala.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Row 3: ACTIVATE - 15% darker */}
        <div className="w-full border-b border-white/30 bg-black/[0.15]">
          <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-14 items-start"
            >
              <div className="md:col-span-1 pb-4 md:pb-0 mb-2 md:mb-0">
                 <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-2 block">↓ (Stage)</span>
                 <span className="text-white/30 text-[clamp(3.5rem,7.5vw,8rem)] leading-[0.8] font-normal tracking-[-0.04em]">3</span>
              </div>
              
              <div className="md:col-span-7 pb-4 md:pb-0 mb-4 md:mb-0 min-w-0 pr-0 md:pr-8">
                 <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-2 block">↓ (Name)</span>
                 <h3 className="text-[clamp(3.2rem,6.5vw,8rem)] leading-[0.8] font-semibold tracking-[-0.04em] text-white whitespace-nowrap">
                   ACTIVATE
                 </h3>
              </div>
              
              <div className="md:col-span-4">
                <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-4 block">↓ (Includes)</span>
                <div className="text-sm md:text-base text-white/80 leading-relaxed font-medium">
                  <p>
                    Translate training into income systems. We deploy job placements, employer partnerships (like Fine Spinners), and micro-enterprise toolkits to create immediate economic movement.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Row 4: REINFORCE - 20% darker */}
        <div className="w-full border-b border-white/30 bg-black/20">
          <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-14 items-start"
            >
              <div className="md:col-span-1 pb-4 md:pb-0 mb-2 md:mb-0">
                 <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-2 block">↓ (Stage)</span>
                 <span className="text-white/30 text-[clamp(3.5rem,7.5vw,8rem)] leading-[0.8] font-normal tracking-[-0.04em]">4</span>
              </div>
              
              <div className="md:col-span-7 pb-4 md:pb-0 mb-4 md:mb-0 min-w-0 pr-0 md:pr-8">
                 <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-2 block">↓ (Name)</span>
                 <h3 className="text-[clamp(3.2rem,6.5vw,8rem)] leading-[0.8] font-semibold tracking-[-0.04em] text-white whitespace-nowrap">
                   REINFORCE
                 </h3>
              </div>
              
              <div className="md:col-span-4">
                <span className="md:hidden text-xs font-mono text-white/50 uppercase tracking-widest mb-4 block">↓ (Includes)</span>
                <div className="text-sm md:text-base text-white/80 leading-relaxed font-medium">
                  <p>
                    Finalize household stability through long-term support. We equip participants with savings habits and retention counseling to ensure resilience is sustained and consistent.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
