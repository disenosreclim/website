import React, { useEffect } from "react";
import { X, MessageSquare, MapPin } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeSection }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { label: "Inicio", href: "#inicio", id: "inicio" },
    { label: "Nosotros", href: "#nosotros", id: "nosotros" },
    { label: "Servicios", href: "#servicios", id: "servicios" },
    { label: "Cobertura", href: "#cobertura", id: "cobertura" },
    { label: "Proceso", href: "#proceso", id: "proceso" },
    { label: "Contacto", href: "#contacto", id: "contacto" },
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <img src="/images/logo.png" alt="Logo RECLIM" className="h-9 w-auto object-contain" />
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-reclim-primary"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 flex flex-col space-y-2" aria-label="Navegación móvil">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-reclim-light text-reclim-primary border-l-4 border-reclim-primary"
                      : "text-gray-700 hover:bg-gray-50 hover:text-reclim-primary"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer in Drawer */}
        <div className="pt-6 border-t border-gray-100 mt-6 space-y-4">
          <button
            onClick={() => handleLinkClick("#contacto")}
            className="w-full flex items-center justify-center gap-2 bg-reclim-dark hover:bg-reclim-primary text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-colors shadow-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-reclim-accent" />
            <span>Solicitar información</span>
          </button>

          <div className="text-xs text-gray-500 pt-2 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-reclim-primary shrink-0" />
            <span>{siteConfig.contact.coverageScope}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
