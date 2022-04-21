import { loginUserThunk } from '../Redux/auth/actions'
import UserForm from './Form'

function Login () {
  return <UserForm name='login' thunk={loginUserThunk} />
}

export default Login
