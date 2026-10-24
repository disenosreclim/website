export interface CityCoverage {
  name: string;
  state: string;
  region: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: "recycle" | "monitor" | "leaf" | "building";
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  iconName: "message" | "fileText" | "truck" | "leaf";
}

export const siteConfig = {
  brand: {
    name: "RECLIM",
    legalRepresentative: "Ángel Fernando Gonzales Juárez",
    experienceSince: 2017,
    slogan: "Dale un mejor destino a tu equipo electrónico",
    subSlogan: "Residuos tecnológicos en buenas manos",
    mission: "En RECLIM nos dedicamos a la recolección y gestión responsable de residuos tecnológicos y electrónicos, contribuyendo al cuidado del medio ambiente y al aprovechamiento de materiales.",
    domain: "www.reclim.com",
    fullUrl: "https://www.reclim.com",
  },

  // Contact details & operational scope
  contact: {
    coverageScope: "Cobertura en 7 ciudades de México",
    attentionMode: "Recepción de solicitudes vía formulario web",
    officialEmail: "reciclandoelectronicaculican@gmail.com",
    officialPhone: "6674319527",
  },

  // Flujo de notificaciones y automatizaciones (Email & WhatsApp)
  notifications: {
    // Si isTestMode es true, envía a los destinatarios de prueba; en false, a producción.
    isTestMode: true,

    // Destinatarios de PRUEBA (actuales)
    testEmail: "disenosreclim@gmail.com",
    testPhoneWhatsApp: "5216671942460",

    // Destinatarios OFICIALES de PRODUCCIÓN
    prodEmail: "reciclandoelectronicaculican@gmail.com",
    prodPhoneWhatsApp: "5216674319527",

    // Datos oficiales de contacto RECLIM que se entregan al cliente
    officialEmail: "reciclandoelectronicaculican@gmail.com",
    officialPhone: "6674319527",

    // Configuración Evolution API
    evolutionLocalUrl: "http://localhost:8082",
    evolutionPublicUrl: "https://whatsapp.la2pc.com",
    evolutionApiKey: "LaSegundaPC_WA_ClaveSecreta_2026_API",
    evolutionInstance: "la-segunda-pc",
  },

  // 7 official coverage cities
  coverageCities: [
    { name: "Culiacán", state: "Sinaloa", region: "Noroeste" },
    { name: "Los Mochis", state: "Sinaloa", region: "Noroeste" },
    { name: "Guadalajara", state: "Jalisco", region: "Occidente" },
    { name: "Tuxtla Gutiérrez", state: "Chiapas", region: "Sureste" },
    { name: "Villahermosa", state: "Tabasco", region: "Sureste" },
    { name: "Oaxaca", state: "Oaxaca", region: "Sur" },
    { name: "Mérida", state: "Yucatán", region: "Península" },
  ] as CityCoverage[],

  // Official confirmed services
  services: [
    {
      id: "recoleccion",
      title: "Recolección de residuos electrónicos",
      description: "Computadoras, servidores, laptops, monitores, impresoras, celulares, cables, periféricos y más equipos tecnológicos en desuso.",
      iconName: "recycle",
    },
    {
      id: "obsoletos",
      title: "Apoyo en la gestión de equipos obsoletos",
      description: "Orientación para organizar y canalizar equipos que han llegado al final de su vida útil.",
      iconName: "monitor",
    },
    {
      id: "manejo-responsable",
      title: "Manejo responsable",
      description: "Reducimos la disposición inadecuada de residuos electrónicos y fomentamos una cultura de responsabilidad ambiental.",
      iconName: "leaf",
    },
    {
      id: "empresas-instituciones",
      title: "Atención a empresas e instituciones",
      description: "Coordinamos servicios para negocios, oficinas, comercios y organizaciones de distintos sectores.",
      iconName: "building",
    },
  ] as ServiceItem[],

  // Process steps
  process: [
    {
      step: 1,
      title: "1. Contacto",
      description: "Nos compartes tus necesidades y te asesoramos.",
      iconName: "message",
    },
    {
      step: 2,
      title: "2. Cotización",
      description: "Te enviamos una propuesta acorde a tus requerimientos.",
      iconName: "fileText",
    },
    {
      step: 3,
      title: "3. Recolección",
      description: "Coordinamos la logística del servicio en la fecha acordada.",
      iconName: "truck",
    },
    {
      step: 4,
      title: "4. Gestión responsable",
      description: "Los equipos son canalizados para su correcto manejo y aprovechamiento.",
      iconName: "leaf",
    },
  ] as ProcessStep[],

  // Value proposition reasons
  whyChooseUs: [
    "Experiencia desde 2017",
    "Cobertura en 7 ciudades del país",
    "Atención personalizada",
    "Compromiso con el medio ambiente",
    "Soluciones a la medida de cada cliente",
  ],

  // Form options
  equipmentQuantities: [
    "1 a 10 equipos",
    "11 a 50 equipos",
    "51 a 100 equipos",
    "Más de 100 equipos",
    "Aún no lo sabemos",
  ],

  // Google Analytics ID
  analytics: {
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX",
  }
};
