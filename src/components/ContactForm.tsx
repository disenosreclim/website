import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import {
  type ContactFormData,
  type ValidationErrors,
  validateContactForm,
  submitContactForm,
} from "../services/contactService";

interface ContactFormProps {
  onOpenPrivacy: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onOpenPrivacy }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    customCity: "",
    service: "",
    customService: "",
    equipmentQty: "",
    message: "",
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear individual field error on change
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    const result = await submitContactForm(formData);
    setIsSubmitting(false);

    if (result.success) {
      setSubmissionStatus("success");
      setStatusMessage(result.message);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        city: "",
        customCity: "",
        service: "",
        customService: "",
        equipmentQty: "",
        message: "",
        privacyAccepted: false,
      });
    } else {
      setSubmissionStatus("error");
      setStatusMessage(result.message);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-reclim-text">
          Formulario de contacto
        </h3>
        <p className="mt-1 text-sm text-reclim-muted">
          Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
      </div>

      {submissionStatus === "success" ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-emerald-900">¡Solicitud recibida con éxito!</h4>
          <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
            {statusMessage}
          </p>

          <button
            onClick={() => setSubmissionStatus("idle")}
            className="mt-4 inline-flex items-center gap-2 bg-reclim-primary hover:bg-reclim-dark text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            Enviar otra consulta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
          {submissionStatus === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Error al enviar la solicitud</p>
                <p className="text-xs mt-0.5">{statusMessage}</p>
              </div>
            </div>
          )}

          {/* Row 1: Nombre & Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Escribe tu nombre completo"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                    : "border-gray-200 focus:border-reclim-primary focus:ring-reclim-primary/20 bg-gray-50/50 focus:bg-white"
                }`}
                disabled={isSubmitting}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nombre@empresa.com"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                    : "border-gray-200 focus:border-reclim-primary focus:ring-reclim-primary/20 bg-gray-50/50 focus:bg-white"
                }`}
                disabled={isSubmitting}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
          </div>

          {/* Row 2: Teléfono & Empresa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Tu número a 10 dígitos"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                    : "border-gray-200 focus:border-reclim-primary focus:ring-reclim-primary/20 bg-gray-50/50 focus:bg-white"
                }`}
                disabled={isSubmitting}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Empresa / Organización <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nombre de tu empresa u oficina"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.company
                    ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                    : "border-gray-200 focus:border-reclim-primary focus:ring-reclim-primary/20 bg-gray-50/50 focus:bg-white"
                }`}
                disabled={isSubmitting}
              />
              {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
            </div>
          </div>

          {/* Row 3: Ciudad & Servicio de interés */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Ciudad de atención <span className="text-red-500">*</span>
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white ${
                  errors.city
                    ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                    : "border-gray-200 focus:border-reclim-primary focus:ring-reclim-primary/20 bg-gray-50/50 focus:bg-white"
                }`}
                disabled={isSubmitting}
              >
                <option value="">Selecciona tu ciudad...</option>
                {siteConfig.coverageCities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}, {c.state}
                  </option>
                ))}
                <option value="Otra ubicación">Otra ubicación...</option>
              </select>
              {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="service" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Servicio de interés <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-white ${
                  errors.service
                    ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                    : "border-gray-200 focus:border-reclim-primary focus:ring-reclim-primary/20 bg-gray-50/50 focus:bg-white"
                }`}
                disabled={isSubmitting}
              >
                <option value="">Selecciona un servicio...</option>
                {siteConfig.services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Otro requerimiento">Otro requerimiento...</option>
              </select>
              {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service}</p>}
            </div>
          </div>

          {/* Conditional Input if "Otra ubicación" selected */}
          {formData.city === "Otra ubicación" && (
            <div className="animate-in fade-in duration-200">
              <label htmlFor="customCity" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Especifica tu ciudad o municipio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customCity"
                name="customCity"
                value={formData.customCity}
                onChange={handleChange}
                placeholder="Ej. Mazatlán, Zapopan, Tapachula..."
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.customCity
                    ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                    : "border-gray-200 focus:border-reclim-primary focus:ring-reclim-primary/20"
                }`}
                disabled={isSubmitting}
              />
              {errors.customCity && <p className="mt-1 text-xs text-red-600">{errors.customCity}</p>}
            </div>
          )}

          {/* Row 4: Cantidad aproximada de equipos (Opcional) */}
          <div>
            <label htmlFor="equipmentQty" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Cantidad aproximada de equipos <span className="text-xs font-normal text-gray-400">(opcional)</span>
            </label>
            <select
              id="equipmentQty"
              name="equipmentQty"
              value={formData.equipmentQty}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-reclim-primary focus:ring-2 focus:ring-reclim-primary/20 text-sm bg-gray-50/50 focus:bg-white"
              disabled={isSubmitting}
            >
              <option value="">Selecciona un rango aproximado...</option>
              {siteConfig.equipmentQuantities.map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </div>

          {/* Row 5: Mensaje */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Mensaje <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Cuéntanos en qué podemos ayudarte (tipos de computadoras, servidores, impresoras, ubicación específica...)"
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-y ${
                errors.message
                  ? "border-red-400 bg-red-50/30 focus:ring-red-300"
                  : "border-gray-200 focus:border-reclim-primary focus:ring-reclim-primary/20 bg-gray-50/50 focus:bg-white"
              }`}
              disabled={isSubmitting}
            />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>

          {/* Privacy Notice Checkbox */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="privacyAccepted"
                checked={formData.privacyAccepted}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded text-reclim-primary focus:ring-reclim-primary border-gray-300 cursor-pointer"
                disabled={isSubmitting}
              />
              <span className="text-xs text-gray-600 leading-normal select-none">
                He leído y acepto el{" "}
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-reclim-primary font-semibold underline hover:text-reclim-dark"
                >
                  Aviso de Privacidad
                </button>{" "}
                de RECLIM para el tratamiento responsable de mis datos de contacto.
              </span>
            </label>
            {errors.privacyAccepted && (
              <p className="mt-1 text-xs text-red-600 pl-7">{errors.privacyAccepted}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 bg-reclim-primary hover:bg-reclim-dark text-white font-bold text-base py-4 px-6 rounded-xl transition-all duration-200 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Enviando solicitud...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar mensaje</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
