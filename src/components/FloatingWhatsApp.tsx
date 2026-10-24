import React from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { trackContactClick } from "../utils/analytics";

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    trackContactClick("whatsapp_floating");
    window.open(siteConfig.socialLinks.whatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <aside
      aria-label="Contacto por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      {/* Tooltip on hover */}
      <div className="hidden sm:block mr-3 bg-gray-900/90 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        ¿Dudas o requerimientos? Escríbenos
      </div>

      <button
        onClick={handleClick}
        className="relative w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-elevated hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer"
        aria-label="Abrir chat de WhatsApp de RECLIM"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-reclim-accent rounded-full border-2 border-white animate-pulse" />
        <MessageCircle className="w-7 h-7" />
      </button>
    </aside>
  );
};
