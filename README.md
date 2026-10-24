# RECLIM — Sitio Web Corporativo

Sitio web corporativo moderno, ultra-rápido y optimizado para SEO desarrollado para **RECLIM**, empresa dedicada a la recolección y gestión responsable de residuos tecnológicos y electrónicos para empresas, instituciones y comercios en México (experiencia desde 2017 y cobertura en 7 ciudades).

---

## 🚀 Tecnologías

- **Frontend:** React 19 + TypeScript + Vite 8
- **Estilos:** Tailwind CSS 3.4 (Paleta corporativa RECLIM, responsive design, accesibilidad WCAG)
- **Iconografía:** Lucide React
- **Cloud Hosting:** Cloudflare Pages + Cloudflare Workers / Pages Functions (`functions/api/contact.ts`)
- **Dominio:** Squarespace (`www.reclim.com`)
- **Analítica y Presencia:** Google Analytics 4 (GA4), Google Search Console, Schema.org (JSON-LD), Open Graph, Twitter Cards, Sitemap XML y Robots.txt.

---

## 📁 Estructura del Proyecto

```text
website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD automatizado para Cloudflare Pages
├── functions/
│   └── api/
│       └── contact.ts          # Endpoint seguro serverless en Cloudflare Workers
├── public/
│   ├── images/                 # Imágenes optimizadas (PNG y WebP)
│   │   ├── logo.png            # Logotipo oficial transparente
│   │   ├── logo-white.png      # Logotipo oficial en blanco (footer)
│   │   ├── hero-electronics.webp # Fotografía hero computadoras y servidores
│   │   ├── mexico-coverage-map.webp # Mapa estilizado de cobertura nacional
│   │   ├── coverage-electronics.webp # Fotografía de gestión responsable
│   │   └── og-image.jpg        # Banner OpenGraph (1200x630) para WhatsApp / RRSS
│   ├── _headers                # Headers de seguridad y caché HTTP para Cloudflare
│   ├── _redirects              # Reglas de redirección SPA para Cloudflare
│   ├── favicon.svg             # Favicon vectorial marca RECLIM
│   ├── favicon.ico             # Favicon multiresolución
│   ├── apple-touch-icon.png    # Icono para dispositivos Apple / móviles
│   ├── manifest.json           # Manifiesto de aplicación web (PWA)
│   ├── robots.txt              # Directivas para Googlebot y buscadores
│   └── sitemap.xml             # Mapa del sitio para indexación en Google
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Encabezado corporativo sticky con navegación
│   │   ├── MobileMenu.tsx      # Menú móvil deslizable accesible
│   │   ├── HeroSection.tsx     # Sección principal de alto impacto visual
│   │   ├── ServicesSection.tsx # 4 servicios oficiales confirmados
│   │   ├── CoverageSection.tsx # Experiencia desde 2017 y mapa de 7 ciudades
│   │   ├── ProcessSection.tsx  # Flujo en 4 pasos + ¿Por qué elegirnos?
│   │   ├── ContactSection.tsx  # Sección de contacto y datos oficiales
│   │   ├── ContactForm.tsx     # Formulario validado con selector condicional
│   │   ├── PrivacyModal.tsx    # Modal con Aviso de Privacidad
│   │   ├── FloatingWhatsApp.tsx# Botón flotante para WhatsApp directo
│   │   └── Footer.tsx          # Pie de página corporativo
│   ├── config/
│   │   └── siteConfig.ts       # Configuración centralizada de datos (teléfonos, ciudades, textos)
│   ├── services/
│   │   └── contactService.ts   # Lógica de validación y envío de solicitudes
│   ├── utils/
│   │   └── analytics.ts        # Helper para eventos personalizados de GA4
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html                  # HTML con metadatos SEO, OpenGraph y JSON-LD
├── wrangler.toml               # Configuración para Cloudflare Pages
└── package.json
```

---

## 🛠️ Ejecución Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

3. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Genera la carpeta optimizada `dist/`.

---

## 🌐 1. Conexión con Repositorio de GitHub

1. Inicializa el repositorio local (si aún no lo está):
   ```bash
   git init
   git add .
   git commit -m "feat: inicializar sitio web RECLIM para Cloudflare Pages"
   git branch -M main
   ```
2. Crea un nuevo repositorio en tu cuenta de GitHub (ej. `reclim-website`).
3. Vincula y sube los cambios:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/reclim-website.git
   git push -u origin main
   ```

---

## ⚡ 2. Conexión con Cloudflare Pages & Workers

1. Entra a [Cloudflare Dashboard](https://dash.cloudflare.com/) y dirígete a **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Selecciona tu repositorio de GitHub `reclim-website`.
3. Configuración de Build:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Haz clic en **Save and Deploy**.
5. Las Cloudflare Pages Functions (`functions/api/contact.ts`) se desplegarán automáticamente para gestionar el formulario de contacto de forma serverless y segura.

---

## 🏷️ 3. Conexión con el Dominio de Squarespace (`www.reclim.com`)

Tienes dos métodos disponibles:

### Método Recomendado (Delegación de DNS a Cloudflare):
1. En Cloudflare, haz clic en **Add a Site** e ingresa `reclim.com`.
2. Cloudflare te proporcionará 2 servidores de nombres (Nameservers), por ejemplo:
   - `alec.ns.cloudflare.com`
   - `sara.ns.cloudflare.com`
3. Inicia sesión en **Squarespace** > **Domains** > selecciona `reclim.com` > **DNS Settings** > **Nameservers**.
4. Cambia a *Custom Nameservers* y coloca los dos proporcionados por Cloudflare.
5. En Cloudflare Pages, ve a tu proyecto > **Custom domains** > haz clic en **Set up a custom domain** e ingresa `www.reclim.com`.
6. Añade una regla de redirección para que `reclim.com` redirija automáticamente a `https://www.reclim.com`.

### Método Alternativo (DNS en Squarespace directo):
1. En **Squarespace** > **Domains** > `reclim.com` > **DNS Settings**:
2. Agrega un registro **CNAME**:
   - **Host:** `www`
   - **Data / Points to:** `reclim-website.pages.dev`
3. En Squarespace, configura el reenvío de dominio (Domain Forwarding) de `reclim.com` a `https://www.reclim.com` (con código 301 permanente y SSL activado).

---

## 📈 4. Google Analytics 4 (GA4) y Posicionamiento en Google (SEO)

### Configurar Google Analytics 4:
1. Crea una propiedad en [Google Analytics](https://analytics.google.com/) para `www.reclim.com` y obtén tu ID de medición (formato `G-XXXXXXXXXX`).
2. Configúralo en el archivo `.env` o en las variables de entorno de Cloudflare Pages:
   ```env
   VITE_GA_MEASUREMENT_ID=G-TU_ID_AQUI
   ```
   *El sitio ya tiene integrados eventos automáticos para clics en botones de contacto, WhatsApp y envíos del formulario.*

### Alta en Google Search Console y Buscadores:
1. Accede a [Google Search Console](https://search.google.com/search-console).
2. Añade la propiedad de dominio `https://www.reclim.com/`.
3. Para la verificación:
   - Puedes usar el registro TXT de DNS en Cloudflare/Squarespace, o
   - Copiar la clave de verificación y colocarla en `index.html` en la etiqueta:
     `<meta name="google-site-verification" content="TU_TOKEN" />`
4. Una vez verificada, ve a la sección **Sitemaps** y envía la URL:
   `https://www.reclim.com/sitemap.xml`
5. El archivo `robots.txt` ya apunta automáticamente a este sitemap.
6. La estructura incluye marcado de datos enriquecidos **Schema.org** (`RecyclingCenter`, `Organization` y `WebSite`) para que Google muestre fragmentos enriquecidos con las 7 ciudades de atención.

---

## ✏️ 5. Cómo Actualizar Datos de Contacto

Todos los datos editables están centralizados en:
📁 `src/config/siteConfig.ts`

Puedes actualizar fácilmente:
- Números de teléfono (`phoneDisplay`, `phoneValue`)
- Correo oficial (`email`)
- Enlace y mensaje de WhatsApp (`whatsappNumber`, `whatsappMessage`)
- Ciudades de cobertura
- Textos de los servicios y motivos para elegir a RECLIM
