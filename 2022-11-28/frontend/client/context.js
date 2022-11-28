const backend = 'http://127.0.0.1:3042'

export default async (ctx) => {
  if (ctx.server) {
    const data = await fetch(backend + '/items')
    ctx.state.todoList = await data.json()
  }
}

export const state = () => ({
  todoList: null,
})

export const actions = {
  async addTodoItem (state, title) {
    const data = await fetch(backend + '/items', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title })
    })
    const item = await data.json()
    state.todoList.push(item)
  },
  async removeTodoItem (state, index) {
    await $fetch.delete('items', {
      json: { index },
    })
    state.todoList.splice(index, 1)
  }
}
