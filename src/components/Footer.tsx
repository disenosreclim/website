import React from "react";
import { siteConfig } from "../config/siteConfig";
import { Leaf, ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Servicios", href: "#servicios" },
    { label: "Cobertura", href: "#cobertura" },
    { label: "Proceso", href: "#proceso" },
    { label: "Contacto", href: "#contacto" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#0A1913] text-gray-300 pt-16 pb-12 border-t border-white/5">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Logo & Description (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#inicio" onClick={scrollToTop} className="inline-block focus:outline-none">
              <img
                src="/images/logo-white.png"
                alt="RECLIM - Tecnología responsable"
                className="h-10 sm:h-12 w-auto object-contain brightness-110"
                width="140"
                height="50"
                loading="lazy"
              />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Ofrecemos servicios de recolección y gestión de residuos electrónicos para empresas, comercios,
              oficinas e instituciones, con experiencia desde {siteConfig.brand.experienceSince} y cobertura en
              siete ciudades de México.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-reclim-accent">
              <Leaf className="w-4 h-4 text-reclim-accent" />
              <span>Tecnología responsable, un mejor futuro.</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Aviso de Privacidad
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coverage Overview (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Cobertura en México
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Culiacán • Los Mochis • Guadalajara • Tuxtla Gutiérrez • Villahermosa • Oaxaca • Mérida
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-full font-medium">
                Atención corporativa nacional
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Socials, Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} {siteConfig.brand.name}. Todos los derechos reservados.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-gray-300 transition-colors"
            >
              Aviso de Privacidad
            </button>
            <span className="text-gray-700">•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label="Volver al inicio"
            >
              <span>Subir</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
