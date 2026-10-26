interface Env {
  CONTACT_EMAIL?: string;
  RESEND_API_KEY?: string;
  WEBHOOK_URL?: string;
  EVOLUTION_API_URL?: string;
  EVOLUTION_API_KEY?: string;
  EVOLUTION_INSTANCE?: string;
  NOTIFY_PHONE_WA?: string;
  IS_TEST_MODE?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const contentType = context.request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({ success: false, message: "El formato de solicitud debe ser JSON." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await context.request.json() as any;
    const {
      fullName,
      email,
      phone,
      company,
      city,
      customCity,
      service,
      equipmentQty,
      message,
    } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return new Response(
        JSON.stringify({ success: false, message: "El nombre completo es requerido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ success: false, message: "Por favor proporciona un correo electrónico válido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 8) {
      return new Response(
        JSON.stringify({ success: false, message: "Por favor proporciona un número de teléfono de contacto válido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!company || typeof company !== "string" || !company.trim()) {
      return new Response(
        JSON.stringify({ success: false, message: "El nombre de tu empresa u organización es requerido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return new Response(
        JSON.stringify({ success: false, message: "Por favor describe brevemente tus requerimientos en el mensaje." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const effectiveCity = city === "Otra ubicación" && customCity ? customCity.trim() : (city || "No especificada");
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    // Destinatario de WhatsApp (pruebas: 5216671942460)
    const isTest = context.env.IS_TEST_MODE !== "false";
    const notifyWaPhone = context.env.NOTIFY_PHONE_WA || (isTest ? "5216671942460" : "5216674319527");

    // ── 1. ENVÍO DE NOTIFICACIÓN WHATSAPP MEDIANTE EVOLUTION API ───────────
    const evolutionUrl = context.env.EVOLUTION_API_URL || "https://whatsapp.la2pc.com";
    const evolutionKey = context.env.EVOLUTION_API_KEY || "LaSegundaPC_WA_ClaveSecreta_2026_API";
    const evolutionInst = context.env.EVOLUTION_INSTANCE || "la-segunda-pc";

    const waText = 
`🔔 *NUEVO FORMULARIO - RECLIM*

👤 *Nombre:* ${fullName.trim()}
🏢 *Empresa:* ${company.trim()}
📧 *Correo:* ${email.trim()}
📱 *Teléfono:* ${phone.trim()}
📍 *Ciudad:* ${effectiveCity}
📦 *Servicio:* ${service || "No especificado"}
🔢 *Equipos:* ${equipmentQty || "No especificado"}

💬 *Mensaje:*
${message.trim()}

⏰ *Fecha:* ${formattedDate}`;

    try {
      await fetch(`${evolutionUrl}/message/sendText/${evolutionInst}`, {
        method: "POST",
        headers: {
          "apikey": evolutionKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: notifyWaPhone,
          text: waText,
        }),
      });
    } catch (err) {
      console.error("Error enviando WhatsApp vía Evolution API:", err);
    }

    // ── 2. ENVÍO DE CORREOS (DESHABILITADO TEMPORALMENTE SEGÚN INSTRUCCIONES) ───
    // Por el momento no se envían correos automáticos, solo notificación vía WhatsApp.

    return new Response(
      JSON.stringify({
        success: true,
        message: "¡Gracias por contactar a RECLIM! Hemos recibido tu solicitud correctamente. Nuestro equipo se pondrá en contacto contigo a la brevedad.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "No fue posible enviar tu solicitud en este momento. Por favor verifica tu conexión e inténtalo nuevamente.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
