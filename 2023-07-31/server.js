import fastify from "fastify"
import fibonacci from "fibonacci"
import piscina from 'piscina'

const server = fastify({
})

const pool = new piscina({
  filename: './worker.js'
})

server.get("/", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        number: {
          type: "number",
          default: 10
        },
      }
    }
  }
}, async (request, reply) => {
  const { number } = request.query
  // return fibonacci.iterate(number)
  return pool.run({ number })
})

await server.listen({ port: 3000 })
