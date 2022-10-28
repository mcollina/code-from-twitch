'use strict'

const fastify = require('fastify')
const { promisify } = require('util')
const sleep = promisify(setTimeout)
const closeWithGrace = require('close-with-grace')

// We want the process to wait for all "in flight" requests
// to complete before exiting. This is a simple example.

const app = fastify({
  logger: {
    level: 'trace',
    transport: {
      target: 'pino-pretty'
    }
  }
})

app.get('/', async (request, reply) => {
  await sleep(5000)
  return { hello: 'world' }
})

app.listen({ port: 3000 })

closeWithGrace({ delay: 20000 }, async () => {
  app.log.info('closing')
  await app.close()
  app.log.info('closed')
})
