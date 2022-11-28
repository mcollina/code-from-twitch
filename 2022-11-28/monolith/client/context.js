
export default async (ctx) => {
  if (ctx.server) {
    ctx.state.todoList = await ctx.server.platformatic.entities.item.find()
  }
}

export const state = () => ({
  todoList: null,
})

export const actions = {
  async addTodoItem (state, title) {
    const data = await fetch('/items', {
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
