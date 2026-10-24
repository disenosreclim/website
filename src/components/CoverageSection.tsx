import React from "react";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import mexicoMapImg from "../assets/mexico-coverage-map.png";

export const CoverageSection: React.FC = () => {
  return (
    <section id="cobertura" className="w-full py-20 sm:py-28 bg-reclim-surface/40 overflow-hidden border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Grid: Left Content & Map, Right Photo Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
          
          {/* Left & Center: Experience + Map (7 cols) */}
          <div id="nosotros" className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-soft">
            <div className="space-y-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-reclim-primary">
                Sobre RECLIM
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-reclim-text tracking-tight leading-tight">
                Nuestra experiencia y cobertura
              </h2>

              <p className="text-base sm:text-lg text-reclim-muted leading-relaxed">
                Contamos con experiencia en la prestación de servicios de recolección y gestión de residuos
                electrónicos desde {siteConfig.brand.experienceSince}. A lo largo de nuestra trayectoria, hemos atendido
                las necesidades de empresas y organizaciones que buscan alternativas responsables para el manejo
                de sus equipos tecnológicos en desuso.
              </p>
            </div>

            {/* Visual Highlight: Mexico Map + Coverage Cities */}
            <div className="relative bg-reclim-light/40 rounded-2xl p-6 border border-reclim-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Mexico Map Visual */}
                <div className="md:col-span-6 relative flex justify-center">
                  <div className="w-full max-w-[280px]">
                    <img
                      src={mexicoMapImg}
                      alt="Mapa de cobertura RECLIM en 7 ciudades de México"
                      className="w-full h-auto object-contain filter drop-shadow-md"
                      width="320"
                      height="320"
                      loading="lazy"
                    />
                  </div>

                  {/* Badge: Más de 7 ciudades de cobertura */}
                  <div className="absolute -top-3 right-0 sm:right-2 bg-reclim-dark text-white text-xs font-bold py-1.5 px-3 rounded-full shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-reclim-accent animate-ping" />
                    <span>Más de 7 ciudades de cobertura</span>
                  </div>
                </div>

                {/* Cities Pill List */}
                <div className="md:col-span-6 space-y-3">
                  <div className="flex items-center gap-2 text-reclim-primary font-bold text-sm sm:text-base">
                    <MapPin className="w-5 h-5 text-reclim-primary shrink-0" />
                    <span>Cobertura en:</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {siteConfig.coverageCities.map((city) => (
                      <span
                        key={city.name}
                        className="inline-flex items-center gap-1.5 bg-white text-reclim-text text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200/80 shadow-xs hover:border-reclim-primary/40 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-reclim-primary" />
                        {city.name}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-reclim-muted italic pt-1">
                    * Coordinamos la logística de recolección según el volumen y ubicación del material.
                  </p>
                </div>

              </div>
            </div>

            {/* Quick Stat Badge */}
            <div className="pt-2 flex items-center gap-4 text-sm text-reclim-muted border-t border-gray-100">
              <div className="flex items-center gap-2 font-bold text-reclim-primary">
                <Calendar className="w-4 h-4 text-reclim-primary" />
                <span>Trayectoria sólida desde 2017</span>
              </div>
              <span className="text-gray-300">•</span>
              <span>Compromiso corporativo y ambiental</span>
            </div>
          </div>

          {/* Right: Photographic Card with Inspiring Environmental Quote (5 cols) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-elevated min-h-[380px] lg:min-h-full group">
            {/* Background Image */}
            <picture className="absolute inset-0 w-full h-full">
              <source srcSet="/images/coverage-electronics.webp" type="image/webp" />
              <img
                src="/images/coverage-electronics.png"
                alt="Equipos tecnológicos para reciclaje y gestión responsable - RECLIM"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width="600"
                height="700"
              />
            </picture>

            {/* Dark & Green Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-reclim-darker/95 via-reclim-dark/60 to-black/30" />

            {/* Quote and Content on top of image */}
            <div className="relative h-full p-8 sm:p-12 flex flex-col justify-end text-white">
              <div className="w-12 h-1 bg-reclim-accent rounded-full mb-6" />

              <blockquote className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug drop-shadow-md">
                “La tecnología también puede tener un segundo ciclo de vida.”
              </blockquote>

              <p className="mt-4 text-sm sm:text-base text-gray-200 font-normal leading-relaxed drop-shadow-sm">
                Canalizamos computadoras, servidores y accesorios obsoletos hacia procesos que favorecen el
                aprovechamiento de materias primas y evitan la contaminación del suelo y agua.
              </p>

              <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-reclim-accent">
                <CheckCircle2 className="w-4 h-4" />
                <span>Gestión Responsable RECLIM</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
