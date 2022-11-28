import FastifyVite from '@fastify/vite'
import FastifyReact from '@fastify/react'
import fp from 'fastify-plugin'

export default fp(async function (server, opts) {
  await server.register(FastifyVite, { 
    root: import.meta.url, 
    renderer: FastifyReact,
    dev: true
  })

  await server.vite.ready()
})
