interface Env {
  CONTACT_EMAIL?: string;
  RESEND_API_KEY?: string;
  WEBHOOK_URL?: string;
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
    const { fullName, email, phone, company, city, customCity, service, customService, message, privacyAccepted } = body;

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
        JSON.stringify({ success: false, message: "Por favor describe brevemente tus necesidades en el mensaje." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Optional webhook or email integration if Cloudflare secrets are set
    if (context.env.WEBHOOK_URL) {
      try {
        await fetch(context.env.WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            data: {
              fullName: fullName.trim(),
              email: email.trim(),
              phone: phone.trim(),
              company: company.trim(),
              city: city === "Otra ciudad" && customCity ? customCity.trim() : (city || "No especificada"),
              service: service || "No especificado",
              message: message.trim(),
            }
          })
        });
      } catch (err) {
        console.error("Error forwarding to webhook:", err);
      }
    }

    // If Resend API key is configured
    if (context.env.RESEND_API_KEY && context.env.CONTACT_EMAIL) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "RECLIM Web <notificaciones@reclim.com>",
            to: [context.env.CONTACT_EMAIL],
            subject: `Nueva solicitud de servicio RECLIM: ${company.trim()} (${city || "México"})`,
            text: `
Nueva solicitud recibida desde el sitio web www.reclim.com

Nombre: ${fullName}
Empresa: ${company}
Correo: ${email}
Teléfono: ${phone}
Ciudad: ${city === "Otra ciudad" ? customCity : city}
Servicio: ${service}
Mensaje:
${message}

Fecha: ${new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" })}
            `
          })
        });
      } catch (err) {
        console.error("Error sending email via Resend:", err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "¡Gracias por contactar a RECLIM! Hemos recibido tu solicitud y nos comunicaremos contigo lo antes posible."
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "No fue posible enviar tu solicitud en este momento. Verifica tu conexión e inténtalo nuevamente más tarde."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
