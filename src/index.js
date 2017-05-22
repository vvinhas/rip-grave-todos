const express = require('express')
const uuid = require('uuid')

const make = (store) => {
  const router = express.Router()

  router.get('/all', (req, res) => {
    res.json(store.get('data'))
  })

  router.post('/', (req, res) => {
    const todos = store.get('data')
    todos.push({
      _id: uuid.v4(),
      text: req.body.text,
      completed: false
    })
    store.set('data', todos)
    res.status(200).end()
  })

  return router
}

const init = (store, fake) => {
  store.set('data', [])
  return store
}

module.exports = {
  init,
  make
}
