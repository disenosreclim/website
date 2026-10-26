import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

function reclimApiDevPlugin(): Plugin {
  return {
    name: 'reclim-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}')
              const {
                fullName = '',
                company = '',
                email = '',
                phone = '',
                city = '',
                customCity = '',
                service = '',
                equipmentQty = '',
                message = '',
              } = data

              const effectiveCity =
                city === 'Otra ubicación' && customCity
                  ? customCity.trim()
                  : city || 'No especificada'

              const now = new Date()
              const day = String(now.getDate()).padStart(2, '0')
              const month = String(now.getMonth() + 1).padStart(2, '0')
              const year = now.getFullYear()
              const formattedDate = `${day}/${month}/${year}`

              const waText = 
`🔔 *NUEVO FORMULARIO - RECLIM*

👤 *Nombre:* ${fullName.trim()}
🏢 *Empresa:* ${company.trim()}
📧 *Correo:* ${email.trim()}
📱 *Teléfono:* ${phone.trim()}
📍 *Ciudad:* ${effectiveCity}
📦 *Servicio:* ${service || 'No especificado'}
🔢 *Equipos:* ${equipmentQty || 'No especificado'}

💬 *Mensaje:*
${message.trim()}

⏰ *Fecha:* ${formattedDate}`

              const notifyPhone = '5216671942460'
              const evolutionUrl = 'http://127.0.0.1:8082'
              const evolutionKey = 'LaSegundaPC_WA_ClaveSecreta_2026_API'
              const evolutionInst = 'la-segunda-pc'

              try {
                const response = await fetch(
                  `${evolutionUrl}/message/sendText/${evolutionInst}`,
                  {
                    method: 'POST',
                    headers: {
                      apikey: evolutionKey,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      number: notifyPhone,
                      text: waText,
                    }),
                  }
                )
                const resData = await response.json().catch(() => ({}))
                console.log('[RECLIM Local Dev] WhatsApp enviado con éxito:', resData)
              } catch (waErr) {
                console.error('[RECLIM Local Dev] Error al conectar con Evolution API:', waErr)
              }

              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(
                JSON.stringify({
                  success: true,
                  message:
                    '¡Gracias por contactar a RECLIM! Hemos recibido tu solicitud correctamente. Nuestro equipo se pondrá en contacto contigo a la brevedad.',
                })
              )
            } catch (err: any) {
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 500
              res.end(JSON.stringify({ success: false, message: err.message }))
            }
          })
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), reclimApiDevPlugin()],
})
