const uuid = require('uuid')
const faker = require('faker')

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

module.exports = {
  init,
  make
}
