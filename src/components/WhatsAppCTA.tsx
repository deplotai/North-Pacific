'use client';

import React from 'react';
import Image from 'next/image';
import { MessageSquare, Package, Ruler, PenSquare, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

export default function WhatsAppCTA() {
  const whatsappUrl = "https://api.whatsapp.com/send?phone=966578078759&text=Hello%20North%20Pacific%20Apparel%20Studio!%20I%20have%20a%20question%20and%20need%20assistance%20with%20sizing%20/%20orders.";

  return (
    <section id="whatsapp-cta" className="py-24 bg-brand-bg relative overflow-hidden">
      
      {/* 1. Background Grid & Stamps */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#DAD7D1_1px,transparent_1px),linear-gradient(to_bottom,#DAD7D1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Indicator */}
        <div className="flex items-center space-x-2 mb-12">
          <span className="text-xs font-bold text-brand-red tracking-wider">05</span>
          <span className="w-8 h-[1.5px] bg-brand-text"></span>
          <span className="text-[10px] font-bold text-brand-text tracking-[0.25em] uppercase">
            LET&apos;S CONNECT
          </span>
        </div>

        {/* Main Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Info, Features, Button */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            
            {/* Title with Overlapping Script */}
            <div className="relative select-none">
              <h2 className="text-[5.5rem] sm:text-[6.5rem] font-oswald font-extrabold text-brand-text tracking-tight uppercase leading-[0.8] mb-2">
                HAVE A QUESTION?
              </h2>
              <span className="absolute left-[3%] top-[45%] font-script text-[5.5rem] sm:text-[6.5rem] text-brand-red transform -rotate-[5deg] leading-none pointer-events-none z-10">
                We&apos;re here to help.
              </span>
            </div>

            {/* Description */}
            <p className="text-xs font-bold text-brand-text/75 leading-relaxed tracking-wider max-w-md select-none">
              Chat with us on WhatsApp for help with sizes, orders, custom designs or anything else.
            </p>

            {/* 4-Item Feature Row with separators */}
            <div className="grid grid-cols-7 gap-1 items-start pt-6 border-t border-brand-border/60">
              
              {/* Item 1 */}
              <div className="col-span-1 flex flex-col items-center text-center space-y-3">
                <div className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center shadow-sm">
                  <MessageSquare className="w-4.5 h-4.5 text-brand-text" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[9px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                    QUICK REPLIES
                  </h3>
                  <p className="text-[8px] text-brand-muted font-bold tracking-wide">
                    We reply fast.
                  </p>
                </div>
              </div>

              {/* Line 1 */}
              <div className="col-span-1 border-r border-brand-border/60 h-12 self-center mx-auto" />

              {/* Item 2 */}
              <div className="col-span-1 flex flex-col items-center text-center space-y-3">
                <div className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center shadow-sm">
                  <Package className="w-4.5 h-4.5 text-brand-text" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[9px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                    ORDER SUPPORT
                  </h3>
                  <p className="text-[8px] text-brand-muted font-bold tracking-wide">
                    From start to finish.
                  </p>
                </div>
              </div>

              {/* Line 2 */}
              <div className="col-span-1 border-r border-brand-border/60 h-12 self-center mx-auto" />

              {/* Item 3 */}
              <div className="col-span-1 flex flex-col items-center text-center space-y-3">
                <div className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center shadow-sm">
                  <Ruler className="w-4.5 h-4.5 text-brand-text" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[9px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                    SIZE & FIT GUIDE
                  </h3>
                  <p className="text-[8px] text-brand-muted font-bold tracking-wide">
                    Find your perfect fit.
                  </p>
                </div>
              </div>

              {/* Line 3 */}
              <div className="col-span-1 border-r border-brand-border/60 h-12 self-center mx-auto" />

              {/* Item 4 */}
              <div className="col-span-1 flex flex-col items-center text-center space-y-3">
                <div className="w-10 h-10 rounded-full border border-brand-border bg-white flex items-center justify-center shadow-sm">
                  <PenSquare className="w-4.5 h-4.5 text-brand-text" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[9px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                    CUSTOM REQUESTS
                  </h3>
                  <p className="text-[8px] text-brand-muted font-bold tracking-wide">
                    We&apos;ve got you covered.
                  </p>
                </div>
              </div>

            </div>

            {/* Massive Black Chat Button & Handwriting Text */}
            <div className="pt-6 flex flex-col space-y-3 relative w-fit">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[280px] py-4.5 bg-[#221F20] hover:bg-[#FE0000] text-white text-[11px] font-bold tracking-[0.25em] transition-all rounded-sm uppercase flex items-center justify-between px-6 shadow-xl active:scale-[0.98] z-10"
              >
                {/* SVG WhatsApp icon */}
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.989-1.874-1.873-4.353-2.902-6.993-2.903-5.438 0-9.863 4.422-9.867 9.867-.001 1.737.472 3.427 1.368 4.908l-.94 3.43 3.518-.922zm11.334-7.55c-.27-.135-1.597-.788-1.844-.878-.247-.09-.427-.135-.608.135-.18.27-.697.878-.853 1.058-.157.18-.315.203-.585.068-.27-.135-1.14-.42-2.172-1.34-1.03-1.026-1.545-2.05-1.748-2.32-.202-.27-.022-.417.113-.552.122-.122.27-.315.405-.473.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.473-.068-.135-.608-1.464-.833-2.005-.22-.528-.46-.456-.63-.464-.162-.008-.348-.01-.535-.01-.188 0-.495.07-.754.36-.26.29-1.01 1.01-1.01 2.459 0 1.448 1.054 2.846 1.202 3.048.148.203 2.074 3.167 5.024 4.444.702.304 1.25.485 1.677.621.705.224 1.347.193 1.854.117.565-.084 1.597-.653 1.822-1.284.225-.632.225-1.173.157-1.284-.067-.113-.247-.203-.517-.337z"/>
                </svg>
                <span>CHAT ON WHATSAPP</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              {/* Cursive text with curved red arrow */}
              <div className="absolute left-[30px] bottom-[-45px] flex items-center space-x-2 select-none z-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-red w-6 h-6 -rotate-12 transform -translate-y-2">
                  <path d="M4,18 C10,18 14,14 16,10" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12,8 L16,10 L14,14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-script text-2xl text-brand-red leading-none mt-1">
                  We&apos;re just a message away!
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Model image sitting */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Sitting Model Image (Rounded & shadow) */}
            <div className="relative w-full aspect-[4/3] max-w-[450px] md:max-w-[480px] bg-transparent rounded-[24px] overflow-hidden select-none">
              <Image
                src="/product Images/IMG-20260618-WA0070.jpg"
                alt="North Pacific Model Sitting Back View"
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-contain object-bottom scale-110 translate-y-3"
              />
            </div>

          </div>

        </div>

        {/* 3. Bottom Trust Bar (With 3 columns & separators) */}
        <div className="mt-24 bg-[#F2EFE9] border border-brand-border p-6 md:p-8 rounded-[20px] grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 items-center shadow-sm select-none">
          
          {/* Trust Point 1 */}
          <div className="col-span-1 md:col-span-2 flex items-center space-x-4">
            <span className="text-3xl font-display font-medium text-brand-red flex-shrink-0 leading-none select-none">*</span>
            <div className="space-y-1">
              <h4 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                REAL PEOPLE. REAL SUPPORT.
              </h4>
              <p className="text-[9px] text-brand-muted font-bold tracking-wide">
                We&apos;re here to make your experience smooth and easy.
              </p>
            </div>
          </div>

          {/* Separator 1 */}
          <div className="hidden md:block col-span-1 border-r border-brand-border/60 h-10 self-center mx-auto" />

          {/* Trust Point 2 */}
          <div className="col-span-1 md:col-span-1 flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-white/40 border border-brand-border/60 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4.5 h-4.5 text-brand-red" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                AVAILABLE EVERYDAY
              </h4>
              <p className="text-[9px] text-brand-muted font-bold tracking-wide">
                Mon - Sun | 10AM - 10PM
              </p>
            </div>
          </div>

          {/* Separator 2 */}
          <div className="hidden md:block col-span-1 border-r border-brand-border/60 h-10 self-center mx-auto" />

          {/* Trust Point 3 */}
          <div className="col-span-1 md:col-span-1 flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-white/40 border border-brand-border/60 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-red" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-extrabold tracking-widest text-brand-text uppercase leading-none">
                SAFE & SECURE
              </h4>
              <p className="text-[9px] text-brand-muted font-bold tracking-wide">
                Your conversations are always private.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
