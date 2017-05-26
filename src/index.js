const uuid = require('uuid')
const faker = require('faker')
const { Map } = require('immutable')

const generateFakeTodo = () => ({
  _id: faker.random.uuid(),
  author: faker.internet.email(),
  completed: faker.random.boolean(),
  text: faker.lorem.sentence(),
})

const init = (fake) => {
  let data = []

  while (data.length < fake) {
    data.push(generateFakeTodo())
  }
  
  return { data }
}

const make = (router, store) => {
  // Get all todos
  router.get('/all', (req, res) => {
    res.json(store.getState().get('data').toJSON())
  })
  // Save a todo
  router.post('/', (req, res) => {
    const { author, text } = req.body
    const newState = store.getState().update('data', todos => todos.push(Map({
      _id: uuid.v4(),
      completed: false,
      author,
      text
    })))
    store.updateState(newState)
    res.status(200).end()
  })

  return router
}

module.exports = {
  init,
  make
}
