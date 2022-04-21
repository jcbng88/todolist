import { signupUserThunk } from '../Redux/auth/actions'
import UserForm from './Form'

function Signup () {
  return <UserForm signup name='signup' thunk={signupUserThunk} />
}

export default Signup
