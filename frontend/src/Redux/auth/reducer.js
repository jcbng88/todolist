import { LOGIN_USER, LOGOUT_USER } from './actions'

const initalState = {
  auth: false || localStorage.getItem('TodoLoginToken') != null
}

export default function AuthReducer (state = initalState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        auth: true
      }
    case LOGOUT_USER:
      return {
        auth: false
      }
    default:
      return state
  }
}
