import React, { useState, useEffect } from "react";
import { Menu, MessageSquare } from "lucide-react";
import { trackContactClick } from "../utils/analytics";

interface HeaderProps {
  onOpenMobileMenu: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Inicio", href: "#inicio", id: "inicio" },
    { label: "Nosotros", href: "#nosotros", id: "nosotros" },
    { label: "Servicios", href: "#servicios", id: "servicios" },
    { label: "Cobertura", href: "#cobertura", id: "cobertura" },
    { label: "Proceso", href: "#proceso", id: "proceso" },
    { label: "Contacto", href: "#contacto", id: "contacto" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = () => {
    trackContactClick("header_button");
    const target = document.querySelector("#contacto");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100"
          : "bg-white py-4 border-b border-gray-100/80"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, "#inicio")}
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-reclim-primary rounded-lg p-1"
          aria-label="RECLIM - Volver al inicio"
        >
          <img
            src="/images/logo.png"
            alt="Logo RECLIM"
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
            width="140"
            height="50"
            loading="eager"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-6" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3 py-2 text-sm lg:text-base font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-reclim-primary ${
                  isActive
                    ? "text-reclim-primary font-semibold"
                    : "text-gray-700 hover:text-reclim-primary hover:bg-reclim-light/50"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-reclim-primary rounded-full transition-all" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 bg-reclim-dark hover:bg-reclim-primary text-white font-medium text-sm lg:text-base px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-reclim-dark cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-reclim-accent" />
            <span>Contáctanos</span>
          </button>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-2.5 rounded-lg text-gray-700 hover:text-reclim-primary hover:bg-reclim-light focus:outline-none focus:ring-2 focus:ring-reclim-primary"
            aria-label="Abrir menú de navegación"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
