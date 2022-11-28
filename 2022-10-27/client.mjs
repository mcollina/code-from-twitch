import { Client } from 'undici'
import { setTimeout } from 'timers/promises'

const client = new Client('http://localhost:3000', {
  keepAliveTimeout: 10000,
  keepAliveMaxTimeout: 10000,
  pipelining: 2
})

client.on('connect', () => {
  console.log('connected')
})

client.on('disconenct', () => {
  console.log('disconnected')
})

{
  console.log('sending first request')
  const res = await client.request({
    method: 'GET',
    path: '/'
  })
  const data = await res.body.json()

  console.log('first', res.statusCode, data)
}

console.log('waiting for 4 seconds')
await setTimeout(4000)

{
  console.log('sending second request')
  const res = await client.request({
    method: 'GET',
    path: '/'
  })
  const data = await res.body.json()

  console.log('second', res.statusCode, data)
}
