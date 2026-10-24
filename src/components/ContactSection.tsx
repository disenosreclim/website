import React from "react";
import { Phone, Mail, MapPin, Sparkles, MessageCircle } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { ContactForm } from "./ContactForm";
import { trackContactClick } from "../utils/analytics";

interface ContactSectionProps {
  onOpenPrivacy: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenPrivacy }) => {
  const handleWhatsApp = () => {
    trackContactClick("whatsapp_floating");
    window.open(siteConfig.socialLinks.whatsapp, "_blank", "noopener,noreferrer");
  };

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
                <span>Contacto</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Estamos listos para ayudarte
              </h2>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                Completa el formulario y nuestro equipo revisará los requerimientos de tu empresa para ofrecerte
                la mejor solución de recolección y aprovechamiento.
              </p>

              {/* Contact Information List */}
              <div className="pt-4 space-y-5 text-sm">
                <a
                  href={`tel:${siteConfig.contact.phoneValue}`}
                  className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-reclim-accent group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-300 font-medium">Llámanos o escríbenos</span>
                    <span className="text-base font-bold text-white group-hover:text-reclim-accent transition-colors">
                      {siteConfig.contact.phoneDisplay}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-reclim-accent group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-300 font-medium">Correo electrónico</span>
                    <span className="text-base font-bold text-white group-hover:text-reclim-accent transition-colors break-all">
                      {siteConfig.contact.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-xl">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-reclim-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-300 font-medium">Ubicación y Cobertura</span>
                    <span className="text-sm font-semibold text-white">
                      {siteConfig.contact.coverageScope}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action in Card */}
            <div className="relative z-10 pt-8 mt-6 border-t border-white/10">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Escríbenos por WhatsApp</span>
              </button>
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
