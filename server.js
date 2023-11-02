// server.js
const express = require('express')
const next = require('next')

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

const port = 3000
const sub_uri = constants.SUB_URI

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const nextApp = next({ dev, port, hostname })
const handle = nextApp.getRequestHandler()
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
  app.get('/app-bar/search/', (req, res) => {
    const { q = '' } = req.query
    const queryLowered = q.toLowerCase()

    const exactData = {
      dashboards: [],
      appsPages: [],
      userInterface: [],
      formsTables: [],
      chartsMisc: []
    }

    const includeData = {
      dashboards: [],
      appsPages: [],
      userInterface: [],
      formsTables: [],
      chartsMisc: []
    }
    const searchData = require('./api/config/appBarSearch.js')
    searchData.forEach(obj => {
      const isMatched = obj.title.toLowerCase().startsWith(queryLowered)
      if (isMatched && exactData[obj.category].length < 5) {
        exactData[obj.category].push(obj)
      }
    })

    searchData.forEach(obj => {
      const isMatched =
        !obj.title.toLowerCase().startsWith(queryLowered) && obj.title.toLowerCase().includes(queryLowered)
      if (isMatched && includeData[obj.category].length < 5) {
        includeData[obj.category].push(obj)
      }
    })

    const categoriesCheck = []
    Object.keys(exactData).forEach(category => {
      if (exactData[category].length > 0) {
        categoriesCheck.push(category)
      }
    })

    if (categoriesCheck.length === 0) {
      Object.keys(includeData).forEach(category => {
        if (includeData[category].length > 0) {
          categoriesCheck.push(category)
        }
      })
    }

    const resultsLength = categoriesCheck.length === 1 ? 5 : 3

    const response = [
      ...exactData.dashboards.concat(includeData.dashboards).slice(0, resultsLength),
      ...exactData.appsPages.concat(includeData.appsPages).slice(0, resultsLength),
      ...exactData.userInterface.concat(includeData.userInterface).slice(0, resultsLength),
      ...exactData.formsTables.concat(includeData.formsTables).slice(0, resultsLength),
      ...exactData.chartsMisc.concat(includeData.chartsMisc).slice(0, resultsLength)
    ]

    res.status(200).json(response)
  })

  // For all other routes, let Next.js handle them
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
