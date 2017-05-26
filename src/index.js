const uuid = require('uuid')
const faker = require('faker')
const { Map } = require('immutable')

const generateFakeTodo = () => ({
  _id: faker.random.uuid(),
  author: faker.internet.email(),
  completed: faker.random.boolean(),
  text: faker.lorem.sentence(),
})

const createTodo = (author, text) => Map({
  _id: uuid.v4(),
  completed: false,
  author,
  text
})
const toggleTodo = (todo) => todo.update('completed', value => !value)
const sameId = (todo, id) => todo.get('_id') === id

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
    const todos = store.getState()
      .get('data')
    res.json(todos ? todos.toJSON() : [])
  })
  // Get a single todo
  router.get('/:id', (req, res) => {
    const todo = store.getState()
      .get('data')  
      .find(todo => sameId(todo, req.params.id))
    res.json(todo ? todo.toJSON() : {})
  })
  // Save a todo
  router.post('/', (req, res) => {
    const { author, text } = req.body
    const newState = store.getState()
      .update('data', todos => todos.push(createTodo(author, text)))
    store.updateState(newState)
    res.status(200).end()
  })
  // Toggle a todo
  router.patch('/toggle/:id', (req, res) => {
    const newState = store.getState()
      .update('data', todos => todos.map(todo => {
        return sameId(todo, req.params.id) ?
          toggleTodo(todo) :
          todo
      }))
    store.updateState(newState)
    res.status(200).end()
  })
  // Delete a todo
  router.delete('/delete/:id', (req, res) => {
    const newState = store.getState()
      .update('data', todos => todos.filter(todo => {
        return !sameId(todo, req.params.id)
      }))
    store.updateState(newState)
    res.status(200).end()
  })

  return router
}

module.exports = {
  init,
  make
}
