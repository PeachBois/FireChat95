const path = require('path')
const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
module.exports = app

const createApp = () => {
  app.use(morgan('dev'))

  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true
    })
  )
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

async function bootApp () {
  // await sessionStore.sync()

  await createApp()
  await startListening()
}

if (require.main === module) {
  bootApp()
} else {
  createApp()
}
