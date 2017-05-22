const uuid = require('uuid')

const make = (router, store) => {
  // Get all todos
  router.get('/all', (req, res) => {
    res.json(store.data)
  })
  // Save a todo
  router.post('/', (req, res) => {
    const { user_id, text } = req.body
    store.data = [
      ...store.data,
      {
        _id: uuid.v4(),
        text: req.body.text,
        completed: false
      }
    ]
    res.status(200).end()
  })

  return router
}

const init = (fake) => {
  return {
    data: [{
      _id: 1,
      user_id: 1,
      text: 'Testing RIP'
    }]
  }
}

module.exports = {
  init,
  make
}
