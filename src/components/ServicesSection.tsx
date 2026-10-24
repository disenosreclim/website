import React from "react";
import { Recycle, Laptop, Leaf, Building2 } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

export const ServicesSection: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "recycle":
        return <Recycle className="w-8 h-8 text-white" strokeWidth={2.2} />;
      case "monitor":
        return <Laptop className="w-8 h-8 text-white" strokeWidth={2.2} />;
      case "leaf":
        return <Leaf className="w-8 h-8 text-white" strokeWidth={2.2} />;
      case "building":
        return <Building2 className="w-8 h-8 text-white" strokeWidth={2.2} />;
      default:
        return <Recycle className="w-8 h-8 text-white" strokeWidth={2.2} />;
    }
  };

  return (
    <section id="servicios" className="w-full py-20 sm:py-28 bg-white border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Title on Left, Intro on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-14 border-b border-gray-100">
          <div className="lg:col-span-7">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-reclim-primary">
              Nuestros servicios
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-reclim-text tracking-tight leading-tight">
              Soluciones para un manejo responsable de la tecnología
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-reclim-muted leading-relaxed">
              Ofrecemos servicios especializados en la recolección y gestión de residuos electrónicos,
              adaptándonos a las necesidades de cada empresa, comercio, oficina o institución.
            </p>
          </div>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-reclim-surface/50 hover:bg-white p-8 rounded-2xl border border-gray-100 hover:border-reclim-primary/30 transition-all duration-300 shadow-sm hover:shadow-elevated hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Circular Icon with Brand Color */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-reclim-primary to-reclim-dark flex items-center justify-center shadow-md shadow-reclim-primary/20 group-hover:scale-105 transition-transform duration-300 mb-6">
                  {getServiceIcon(service.iconName)}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-reclim-text group-hover:text-reclim-primary transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mt-3 text-sm sm:text-base text-reclim-muted leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Decorative subtle numbering */}
              <div className="mt-6 pt-4 border-t border-gray-100/80 flex items-center justify-between text-xs font-semibold text-reclim-primary/60">
                <span>0{index + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-reclim-primary/40 group-hover:w-6 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
