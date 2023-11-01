// server.js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const fileUpload = require('express-fileupload')
const path = require('path')
const { fileURLToPath } = require('url')
const cors = require('cors')
const authorization = require('./api/routes/authorization.js')
const role = require('./api/routes/role.js')
const admin = require('./api/routes/admin.js')
const location = require('./api/routes/location.js')
const verifyToken = require('./api/middleware/jwt.js')
const constants = require('./api/helpers/constants.js')
const webhook = require('./api/controller/webhook.js')
const { authMe } = require('./api/controller/authorization.js')

const PORT = constants.port
const sub_uri = constants.SUB_URI

nextApp.prepare().then(() => {
  const app = express()

  // Define your Express middleware and routes here
  app.use(cors())
  app.use(express.json())
  app.use(fileUpload())
  app.use(constants.STATIC_PATH, express.static(path.join(__dirname, 'public')))

  // Define your API routes with Express
  app.use(`${sub_uri}/webhook`, webhook.webhook)

  app.use(`${sub_uri}/authorization`, authorization)
  app.use(`${sub_uri}/role`, verifyToken.verifyToken, role)
  app.use(`${sub_uri}/admin`, admin)
  app.use(`${sub_uri}/location`, verifyToken.verifyToken, location)
  app.post('/auth/me', authMe)

  // For all other routes, let Next.js handle them
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
