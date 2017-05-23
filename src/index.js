const uuid = require('uuid')

const make = (router, store) => {
  // Get all todos
  router.get('/all', (req, res) => {
    res.json(store.getDeep('todos', 'data'))
  })
  // Save a todo
  router.post('/', (req, res) => {
    const data = store.getDeep('todos', 'data')
    const { author, text } = req.body
    store.setDeep('todos', 'data', [
      ...data,
      {
        _id: uuid.v4(),
        completed: false,
        text,
        author
      }
    ])
    res.status(200).end()
  })

  return router
}

const init = (fake) => {
  return {
    data: []
  }
}

module.exports = {
  init,
  make
}
