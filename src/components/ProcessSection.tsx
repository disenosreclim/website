import React from "react";
import { MessageSquare, FileText, Truck, Leaf, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export const ProcessSection: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case "message":
        return <MessageSquare className="w-6 h-6 text-white" />;
      case "fileText":
        return <FileText className="w-6 h-6 text-white" />;
      case "truck":
        return <Truck className="w-6 h-6 text-white" />;
      case "leaf":
        return <Leaf className="w-6 h-6 text-white" />;
      default:
        return <MessageSquare className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="proceso" className="w-full py-20 sm:py-28 bg-white border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Process Flow & Reasons to Choose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* Left Column: 4-Step Process Flow (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-reclim-primary">
                Nuestro proceso
              </span>
              <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold text-reclim-text tracking-tight">
                ¿Cómo trabajamos?
              </h2>
              <p className="mt-2 text-base text-reclim-muted">
                Un proceso simple, claro y seguro.
              </p>
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {siteConfig.process.map((step, idx) => (
                <div key={step.step} className="relative flex flex-col items-start group">
                  {/* Icon circle */}
                  <div className="w-14 h-14 rounded-2xl bg-reclim-dark group-hover:bg-reclim-primary flex items-center justify-center shadow-md transition-colors duration-300">
                    {getStepIcon(step.iconName)}
                  </div>

                  {/* Title & Step Number */}
                  <h3 className="mt-4 text-base font-bold text-reclim-text group-hover:text-reclim-primary transition-colors">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-2 text-xs sm:text-sm text-reclim-muted leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow Indicator for desktop */}
                  {idx < siteConfig.process.length - 1 && (
                    <div className="hidden lg:block absolute top-7 -right-3 text-gray-300">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Note box */}
            <div className="bg-reclim-surface p-4 rounded-xl text-xs sm:text-sm text-reclim-muted border border-gray-200/60">
              <strong className="text-reclim-text">Logística personalizada: </strong>
              Cada servicio se programa previa validación del inventario aproximado, características técnicas y condiciones de acceso del inmueble.
            </div>
          </div>

          {/* Right Column: Why Choose Us (4 cols) */}
          <div className="lg:col-span-4 bg-reclim-surface/60 rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-soft">
            <h3 className="text-xl sm:text-2xl font-bold text-reclim-text">
              ¿Por qué elegirnos?
            </h3>
            
            <ul className="mt-6 space-y-4">
              {siteConfig.whyChooseUs.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-reclim-primary/10 text-reclim-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-reclim-primary" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-reclim-text">
                    {reason}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-200/70 text-xs text-reclim-muted leading-relaxed">
              Trabajamos con apego a las normas ambientales vigentes, priorizando el aprovechamiento y la reducción de desechos electrónicos no tratados.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
