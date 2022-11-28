import logo from '/assets/logo.svg'
import { Link } from 'react-router-dom'
import { isServer, useRouteContext } from '/dx:core.jsx'

export function getMeta () {
  return {
    title: 'Welcome to Fastify DX!'
  }
}

export default function Index () {
  const { snapshot, state } = useRouteContext()
  if (isServer) {
    // State is automatically hydrated on the client
    state.message = 'Welcome to Fastify DX for React!'
  }
  return (
    <>
      <img src={logo} />
      <h1>{snapshot.message}</h1>
      <ul className="columns-2">
        <li><Link to="/using-store">/using-store</Link> demonstrates how to 
        leverage the 
        automated <a href="https://github.com/pmndrs/valtio">Valtio</a> store 
        to retrieve server data for a route and maintain it in a global 
        state even after navigating to another route.</li>
      </ul>
    </>
  )
}
