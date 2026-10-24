// Utility for Google Analytics 4 event tracking

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  } else {
    // Development fallback
    if (import.meta.env.DEV) {
      console.log(`[GA4 Event] ${eventName}:`, params);
    }
  }
};

export const trackContactClick = (method: "header_button" | "whatsapp_floating" | "hero_cta" | "phone" | "email") => {
  trackEvent("contact_cta_click", {
    method,
    page_location: window.location.href,
    timestamp: new Date().toISOString(),
  });
};

export const trackFormSubmission = (status: "attempt" | "success" | "error", errorReason?: string) => {
  trackEvent("contact_form_submit", {
    status,
    error_reason: errorReason || "none",
    timestamp: new Date().toISOString(),
  });
};
