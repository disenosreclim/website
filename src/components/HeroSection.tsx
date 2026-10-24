import React from "react";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { trackContactClick } from "../utils/analytics";

export const HeroSection: React.FC = () => {
  const handleCtaClick = () => {
    trackContactClick("hero_cta");
    const target = document.querySelector("#contacto");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServicesClick = () => {
    const target = document.querySelector("#servicios");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[90vh] lg:min-h-[92vh] pt-24 sm:pt-28 pb-16 sm:pb-20 flex items-center bg-gradient-to-b from-reclim-surface/60 via-white to-white overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-reclim-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Background Recycling Watermark (subtle brand symbol) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] lg:w-[650px] lg:h-[650px] opacity-[0.04] pointer-events-none text-reclim-primary select-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <path d="M50 8 L65 34 H55 V55 H45 V34 H35 Z" />
          <path d="M20 70 L35 44 L44 49 L34 66 L52 76 L48 84 Z" />
          <path d="M80 70 L60 84 L56 76 L74 66 L64 49 L73 44 Z" />
        </svg>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Storytelling & Action */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-6 text-left">
            {/* Top Kicker / Badge */}
            <div className="inline-flex items-center gap-2 self-start bg-reclim-light/80 text-reclim-primary px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase border border-reclim-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-reclim-accent" />
              <span>{siteConfig.brand.subSlogan}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-reclim-text tracking-tight leading-[1.12]">
              Dale un mejor destino a tu{" "}
              <span className="text-reclim-primary relative inline-block">
                equipo electrónico
                <span className="absolute bottom-1 left-0 right-0 h-2 bg-reclim-accent/15 -z-10 rounded" />
              </span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-reclim-muted leading-relaxed max-w-2xl">
              {siteConfig.brand.mission}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center gap-3 bg-reclim-dark hover:bg-reclim-primary text-white font-semibold text-base px-7 py-4 rounded-full transition-all duration-200 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-reclim-primary cursor-pointer"
              >
                <span>Solicita más información</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-reclim-accent" />
              </button>

              <button
                onClick={handleServicesClick}
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-reclim-light text-reclim-dark font-medium text-base px-6 py-4 rounded-full border border-gray-300 hover:border-reclim-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-reclim-primary cursor-pointer"
              >
                Conoce nuestros servicios
              </button>
            </div>

            {/* Key trust badges */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-reclim-muted">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-reclim-primary" />
                <span>Experiencia desde 2017</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-reclim-accent" />
                <span>Cobertura en 7 ciudades</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-reclim-primary" />
                <span>Atención empresarial</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Composite Visual */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center items-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-lg lg:max-w-none group">
              {/* Soft decorative background shadow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-reclim-primary/10 to-reclim-accent/15 rounded-3xl blur-2xl opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Picture Element supporting modern WebP with PNG fallback */}
              <picture className="relative block rounded-2xl overflow-hidden shadow-soft border border-gray-100/60 bg-white">
                <source srcSet="/images/hero-electronics.webp" type="image/webp" />
                <img
                  src="/images/hero-electronics.png"
                  alt="Gestión y recolección de equipos electrónicos y computadoras - RECLIM"
                  className="w-full h-auto object-cover object-center transform transition-transform duration-500 group-hover:scale-102"
                  width="800"
                  height="570"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>

              {/* Floating Highlight Pill */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-reclim-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-reclim-text">
                  Gestión responsable y sostenible
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
