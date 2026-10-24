import React from "react";
import { MapPin, Sparkles, Building2, ShieldCheck, Clock } from "lucide-react";
import { ContactForm } from "./ContactForm";

interface ContactSectionProps {
  onOpenPrivacy: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenPrivacy }) => {
  return (
    <section id="contacto" className="w-full py-20 sm:py-28 bg-reclim-surface/60 border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-elevated border border-gray-200/80 bg-white">
          
          {/* Left Dark Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-reclim-dark via-reclim-darker to-[#03241b] text-white p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-reclim-accent/15 rounded-full blur-3xl pointer-events-none" />
            
            {/* Decorative Botanical Leaf Watermark in bottom corner */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 opacity-15 pointer-events-none select-none text-reclim-accent">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M10 90 Q 50 10, 90 10 Q 90 50, 10 90 Z" />
                <path d="M10 90 Q 40 40, 90 10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M30 65 Q 40 60, 50 63" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M45 50 Q 55 45, 65 48" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-reclim-accent border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atención Corporativa</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Estamos listos para ayudarte
              </h2>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                Completa el formulario y nuestro equipo revisará los requerimientos de tu organización para
                coordinar la recolección y darte la mejor solución de gestión responsable.
              </p>

              {/* Informative Value Points */}
              <div className="pt-2 space-y-5 text-sm">
                <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-reclim-accent mt-0.5">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Servicio para empresas e instituciones</span>
                    <span className="text-xs text-gray-300 leading-relaxed block mt-0.5">
                      Atendemos comercios, oficinas y organizaciones de distintos sectores en todo el país.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-reclim-accent mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Alcance en 7 ciudades</span>
                    <span className="text-xs text-gray-300 leading-relaxed block mt-0.5">
                      Culiacán, Los Mochis, Guadalajara, Tuxtla Gutiérrez, Villahermosa, Oaxaca y Mérida.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-reclim-accent mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">Respuesta personalizada</span>
                    <span className="text-xs text-gray-300 leading-relaxed block mt-0.5">
                      Un asesor se comunicará contigo utilizando los datos proporcionados en el formulario.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Confidentiality Reassurance */}
            <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex items-center gap-2.5 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-reclim-accent shrink-0" />
              <span>Tus datos son tratados bajo estricta confidencialidad.</span>
            </div>
          </div>

          {/* Right Column: White Card Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex items-center">
            <ContactForm onOpenPrivacy={onOpenPrivacy} />
          </div>

        </div>

      </div>
    </section>
  );
};
