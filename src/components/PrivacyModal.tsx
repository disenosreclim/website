import React, { useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-reclim-primary">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="text-xl font-bold text-reclim-text">Aviso de Privacidad</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-4 space-y-4 text-sm text-reclim-muted leading-relaxed">
          <p>
            <strong>{siteConfig.brand.name}</strong>, con fundamento en los artículos 15 y 16 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, hace de su conocimiento que la información personal recabada a través de este formulario web será tratada con estricta confidencialidad.
          </p>

          <h4 className="font-bold text-reclim-text text-base">Finalidades del tratamiento de datos</h4>
          <p>
            Los datos personales que solicitamos (nombre, teléfono, correo electrónico, empresa y ciudad) serán utilizados única y exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Atender, evaluar y responder a su solicitud de servicios de recolección y gestión de equipos electrónicos.</li>
            <li>Elaborar y enviarle cotizaciones o propuestas logísticas acordes a su volumen de material.</li>
            <li>Coordinar la atención en las ciudades correspondientes.</li>
            <li>Mantener la comunicación necesaria para la correcta prestación del servicio.</li>
          </ul>

          <h4 className="font-bold text-reclim-text text-base">Seguridad y no transferencia</h4>
          <p>
            RECLIM no comercializa, transfiere ni cede bajo ninguna circunstancia sus datos personales a terceros sin su consentimiento expreso, salvo las excepciones previstas en el marco legal aplicable.
          </p>

          <h4 className="font-bold text-reclim-text text-base">Derechos ARCO</h4>
          <p>
            Usted tiene derecho en cualquier momento de acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales (Derechos ARCO), enviando una solicitud por escrito a través del formulario de contacto oficial de este sitio web.
          </p>

          <div className="p-3 bg-reclim-surface rounded-xl text-xs text-gray-500">
            Última actualización: Octubre 2026. RECLIM se reserva el derecho de modificar el presente aviso de privacidad en apego a actualizaciones legislativas o requerimientos operativos.
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-reclim-primary hover:bg-reclim-dark text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
