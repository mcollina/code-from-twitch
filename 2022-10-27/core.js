'use strict'

const { createServer } = require('http')
const { promisify } = require('util')
const closeWithGrace = require('close-with-grace')

// We want the process to wait for all "in flight" requests
// to complete before exiting. This is a simple example.

let closing = false
const server = createServer((req, res) => {
  // return503OnClosing
  if (closing) {
    console.log('returning 503')
    res.statusCode = 503
    res.setHeader('connection', 'close')
    res.end(JSON.stringify({ msg: 'Server is closing' }))
    return
  }

  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ hello: 'world' }))
  }, 5000)
})

server.keepAliveTimeout = 10000

server.listen(3000)

closeWithGrace({ delay: 20000 }, async ({ signal, err }) => {
  if (err) console.log(err)
  process._rawDebug('closing')
  closing = true

  server.closeIdleConnections()
  // becames the default behavior in Node.js 19.0.0

  await promisify(server.close.bind(server))()
  process._rawDebug('closed')
})
