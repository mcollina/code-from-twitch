'use strict'

module.exports = async function (app) {
  app.get('/', async function (req, res) {
    return { hello: 'from bar' }
  })
}
