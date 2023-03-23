import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { readFile } from 'fs/promises'

const app = fastify({ logger: true })

await app.register(swagger, {
  openapi: {}
})

const logo = await readFile('./logo.svg')
const logoBase64 = logo.toString('base64')
const logoData = `data:image/svg+xml;base64,${logoBase64}`

console.log(logoData)

const toRender = `
{
  const onload = window.onload
  window.onload = function replaceLogo() {
    onload && onload()
    const img = document.querySelector('#swagger-ui > section > div.topbar > div > div > a > img')
    console.log(img)
    img.src = '${logoData}'
    console.log('bbb')
  }
}
`

app.register(swaggerUI, {
  theme: {
    js: [
      { filename: 'special.js', content: toRender }
    ],
    css: [
      { filename: 'theme.css', content: await readFile('./theme.css', 'utf8') }
    ],
    favicon: [
      {
        filename: 'favicon.png',
        rel: 'icon',
        sizes: '16x16',
        type: 'image/x-icon',
        content: await readFile('./favicon.ico')
      }
    ]
  }
})

app.route({
  url: '/hello',
  method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  schema: {
    response: {
      200: {
        operationId: 'getHello',
        type: 'object',
        properties: {
          hello: { type: 'string' }
        },
        required: ['hello']
      }
    }
  },
  async handler () {
    return { hello: 'world' }
  }
})

await app.listen({ port: 3000 })
