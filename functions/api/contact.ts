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
    const nowMex = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

    // Determinar modo de pruebas o producción
    const isTest = context.env.IS_TEST_MODE !== "false";
    const notifyWaPhone = context.env.NOTIFY_PHONE_WA || (isTest ? "5216671942460" : "5216674319527");
    const notifyAdminEmail = context.env.CONTACT_EMAIL || (isTest ? "disenosreclim@gmail.com" : "reciclandoelectronicaculican@gmail.com");

    // ── 1. ENVÍO DE NOTIFICACIÓN WHATSAPP MEDIANTE EVOLUTION API ───────────
    const evolutionUrl = context.env.EVOLUTION_API_URL || "https://whatsapp.la2pc.com";
    const evolutionKey = context.env.EVOLUTION_API_KEY || "LaSegundaPC_WA_ClaveSecreta_2026_API";
    const evolutionInst = context.env.EVOLUTION_INSTANCE || "la-segunda-pc";

    const waText = 
`🔔 *NUEVA SOLICITUD DE RECOLECCIÓN - RECLIM* 🔔

👤 *Nombre:* ${fullName.trim()}
🏢 *Empresa:* ${company.trim()}
📧 *Correo:* ${email.trim()}
📱 *Teléfono:* ${phone.trim()}
📍 *Ciudad:* ${effectiveCity}
📦 *Servicio:* ${service || "No especificado"}
🔢 *Equipos:* ${equipmentQty || "No especificado"}

💬 *Mensaje:*
"${message.trim()}"

⏰ *Fecha:* ${nowMex}`;

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

    // ── 2. ENVÍO DE CORREO (SI RESEND ESTÁ CONFIGURADO) ─────────────────────
    if (context.env.RESEND_API_KEY) {
      try {
        // Correo 1: Notificación para el equipo de RECLIM
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "RECLIM Notificaciones <notificaciones@reclim.com>",
            to: [notifyAdminEmail],
            subject: `Nueva solicitud RECLIM: ${company.trim()} (${effectiveCity})`,
            text: `
Nueva solicitud recibida a través del sitio web oficial www.reclim.com

Nombre: ${fullName.trim()}
Empresa: ${company.trim()}
Correo: ${email.trim()}
Teléfono: ${phone.trim()}
Ciudad: ${effectiveCity}
Servicio: ${service || "No especificado"}
Cantidad de equipos: ${equipmentQty || "No especificada"}

Mensaje:
${message.trim()}

Fecha y hora: ${nowMex}
            `,
          }),
        });

        // Correo 2: Confirmación automática para el cliente con los datos de RECLIM
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "RECLIM <contacto@reclim.com>",
            to: [email.trim()],
            subject: `Hemos recibido tu solicitud de recolección - RECLIM`,
            text: `
Hola ${fullName.trim()},

¡Gracias por contactar a RECLIM! Hemos recibido tu solicitud para la gestión de equipos tecnológicos en desuso para ${company.trim()}.

Nuestro equipo logístico revisará los detalles de tu requerimiento y un asesor se pondrá en contacto contigo a la brevedad.

Si requieres atención inmediata o tienes dudas sobre tus equipos, puedes contactarnos directamente:
📧 Correo: reciclandoelectronicaculican@gmail.com
📱 Teléfono: 6674319527

Atentamente,
Equipo de Gestión y Recolección — RECLIM
www.reclim.com
            `,
          }),
        });
      } catch (err) {
        console.error("Error enviando correos vía Resend:", err);
      }
    }

    // ── 3. ENVÍO A WEBHOOK OPCIONAL (ZAPIER / MAKE / N8N) ───────────────────
    if (context.env.WEBHOOK_URL) {
      try {
        await fetch(context.env.WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            fullName: fullName.trim(),
            company: company.trim(),
            email: email.trim(),
            phone: phone.trim(),
            city: effectiveCity,
            service: service || "No especificado",
            equipmentQty: equipmentQty || "No especificada",
            message: message.trim(),
          }),
        });
      } catch (err) {
        console.error("Error enviando a Webhook:", err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "¡Gracias por contactar a RECLIM! Hemos recibido tu solicitud correctamente. Nuestro equipo se pondrá en contacto contigo a la brevedad.",
        contactInfo: {
          email: "reciclandoelectronicaculican@gmail.com",
          phone: "6674319527",
        }
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
