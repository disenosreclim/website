import { trackFormSubmission } from "../utils/analytics";

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  customCity?: string;
  service: string;
  customService?: string;
  equipmentQty?: string;
  message: string;
  privacyAccepted: boolean;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;
  customCity?: string;
  service?: string;
  message?: string;
  privacyAccepted?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
}

export const validateContactForm = (data: ContactFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Por favor ingresa tu nombre completo.";
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = "El nombre debe contener al menos 3 caracteres.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "Por favor ingresa tu correo electrónico corporativo.";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "Por favor introduce un formato de correo válido (ej: nombre@empresa.com).";
  }

  const phoneClean = data.phone.replace(/[\s\-\(\)\+]/g, "");
  if (!data.phone.trim()) {
    errors.phone = "Por favor ingresa un número de teléfono de contacto.";
  } else if (phoneClean.length < 10) {
    errors.phone = "El teléfono debe contener al menos 10 dígitos.";
  }

  if (!data.company.trim()) {
    errors.company = "Por favor ingresa el nombre de tu empresa u organización.";
  }

  if (!data.city) {
    errors.city = "Por favor selecciona tu ciudad de atención.";
  } else if (data.city === "Otra ubicación" && (!data.customCity || !data.customCity.trim())) {
    errors.customCity = "Por favor especifica tu ciudad o municipio.";
  }

  if (!data.service) {
    errors.service = "Por favor selecciona el servicio de interés.";
  }

  if (!data.message.trim()) {
    errors.message = "Por favor escribe un breve mensaje detallando los equipos o tu solicitud.";
  } else if (data.message.trim().length < 10) {
    errors.message = "El mensaje debe ser un poco más descriptivo (mínimo 10 caracteres).";
  }

  if (!data.privacyAccepted) {
    errors.privacyAccepted = "Debes aceptar el aviso de privacidad para continuar.";
  }

  return errors;
};

export const submitContactForm = async (data: ContactFormData): Promise<SubmissionResponse> => {
  trackFormSubmission("attempt");

  const apiUrl = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json().catch(() => ({}));
      trackFormSubmission("success");
      return {
        success: true,
        message: result.message || "¡Gracias por contactar a RECLIM! Hemos recibido tu solicitud y podremos comunicarnos contigo utilizando los datos que nos proporcionaste.",
      };
    } else {
      // In Vite development mode without Cloudflare Pages Functions running locally,
      // simulate graceful fallback so developer / client can test UI flow
      if (import.meta.env.DEV && response.status === 404) {
        console.warn("[RECLIM Dev Mode] /api/contact not found on local Vite dev server. Simulating successful response for UI testing.");
        await new Promise((resolve) => setTimeout(resolve, 800));
        trackFormSubmission("success");
        return {
          success: true,
          message: "¡Gracias por contactar a RECLIM! (Modo desarrollo) Tu mensaje ha sido procesado exitosamente.",
        };
      }

      const errData = await response.json().catch(() => ({}));
      const errorMsg = errData.message || "No fue posible enviar tu solicitud en este momento. Verifica tu conexión e inténtalo nuevamente más tarde.";
      trackFormSubmission("error", errorMsg);
      return {
        success: false,
        message: errorMsg,
      };
    }
  } catch (err: any) {
    // If local dev fetch fails (e.g. no backend server running on port)
    if (import.meta.env.DEV) {
      console.warn("[RECLIM Dev Mode] Network error sending to /api/contact. Simulating development flow.", err);
      await new Promise((resolve) => setTimeout(resolve, 800));
      trackFormSubmission("success");
      return {
        success: true,
        message: "¡Gracias por contactar a RECLIM! (Modo desarrollo) Hemos recibido tu solicitud.",
      };
    }

    const fallbackMsg = "No fue posible enviar tu solicitud en este momento. Verifica tu conexión e inténtalo nuevamente más tarde.";
    trackFormSubmission("error", fallbackMsg);
    return {
      success: false,
      message: fallbackMsg,
    };
  }
};
