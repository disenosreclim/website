import { trackFormSubmission } from "../utils/analytics";
import { siteConfig } from "../config/siteConfig";

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

// Helper para disparar notificación de WhatsApp a Evolution API
const sendWhatsAppAlert = async (data: ContactFormData) => {
  try {
    const notifyPhone = "5216671942460";
    const effectiveCity = data.city === "Otra ubicación" && data.customCity ? data.customCity.trim() : (data.city || "No especificada");
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const waText = 
`🔔 *NUEVO FORMULARIO - RECLIM*

👤 *Nombre:* ${data.fullName.trim()}
🏢 *Empresa:* ${data.company.trim()}
📧 *Correo:* ${data.email.trim()}
📱 *Teléfono:* ${data.phone.trim()}
📍 *Ciudad:* ${effectiveCity}
📦 *Servicio:* ${data.service || "No especificado"}
🔢 *Equipos:* ${data.equipmentQty || "No especificada"}

💬 *Mensaje:*
${data.message.trim()}

⏰ *Fecha:* ${formattedDate}`;

    // Intentar vía backend local
    const targetUrl = `${siteConfig.notifications.evolutionLocalUrl}/message/sendText/${siteConfig.notifications.evolutionInstance}`;

    await fetch(targetUrl, {
      method: "POST",
      headers: {
        "apikey": siteConfig.notifications.evolutionApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: notifyPhone,
        text: waText,
      }),
    });
  } catch (waErr) {
    console.warn("[RECLIM] Envío de WhatsApp:", waErr);
  }
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
        message: result.message || "¡Gracias por contactar a RECLIM! Hemos recibido tu solicitud correctamente. Nuestro equipo se pondrá en contacto contigo a la brevedad.",
      };
    } else {
      // En modo desarrollo local con Vite (sin Cloudflare runtime)
      if (import.meta.env.DEV && (response.status === 404 || !response.ok)) {
        console.info("[RECLIM Dev Mode] Disparando alerta de WhatsApp a través de Evolution API local...");
        await sendWhatsAppAlert(data);
        trackFormSubmission("success");
        return {
          success: true,
          message: "¡Gracias por contactar a RECLIM! Hemos recibido tu solicitud. Nuestro equipo revisará los requerimientos de tu empresa y se pondrá en contacto contigo a la brevedad.",
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
    // Si la llamada al backend falla en desarrollo local, enviar la alerta directamente a Evolution API
    if (import.meta.env.DEV) {
      console.info("[RECLIM Dev Mode] Enviando alerta directa de WhatsApp...");
      await sendWhatsAppAlert(data);
      trackFormSubmission("success");
      return {
        success: true,
        message: "¡Gracias por contactar a RECLIM! Hemos recibido tu solicitud. Nuestro equipo revisará los requerimientos de tu empresa y se pondrá en contacto contigo a la brevedad.",
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
