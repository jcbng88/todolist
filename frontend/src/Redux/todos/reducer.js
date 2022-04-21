import { ADD_TODO, EDIT_TODO, DELETE_TODO, GET_TODOS, GET_INFO } from './actions'

const initialState = {
  todos: [],
  name: ''
}

export default function TodoReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: state.todos.concat([action.payload]),
        name: state.name
      }
    case EDIT_TODO:
      const newTodo = action.payload[0]
      const index = state.todos.findIndex(i => i.id === newTodo.id)
      state.todos.splice(index, 1, newTodo)
      return {
        todos: state.todos,
        name: state.name
      }
    case DELETE_TODO:
      return {
        todos: state.todos.filter(todo => {
          return todo.id !== action.payload
        }),
        name: state.name
      }
    case GET_TODOS:
      return {
        todos: action.payload.sort((a, b) => a.id - b.id),
        name: state.name
      }
    case GET_INFO:
      return {
        todos: state.todos,
        name: action.payload
      }
    default:
      return state
  }
}
