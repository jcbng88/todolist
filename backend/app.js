const express = require('express')
const cors = require('cors')

const knexfile = require('./knexfile').development
const knex = require('knex')(knexfile)

const auth = require('./auth/auth')(knex)

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(auth.initialize())

const TodoRouter = require('./Routers/TodoRouter')
const TodoService = require('./Services/TodoService')
const AuthRouter = require('./Routers/AuthRouter')

const todoService = new TodoService(knex)

app.use('/api', new TodoRouter(todoService, auth, express).router())
app.use('/auth', new AuthRouter(express, knex).router())

app.listen(8080, () => {
  console.log('Application listening to port 8080')
})
