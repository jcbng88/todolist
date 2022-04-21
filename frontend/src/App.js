import TodoList from './Components/TodoList'
import Login from './Components/Login'
import Signup from './Components/Signup'

import { Routes, BrowserRouter, Link, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Navbar, NavItem } from 'react-bootstrap'
import LogoutButton from './Components/LogoutButton'

function RequireAuth ({ children, redirectTo }) {
  let isAuthenticated = useSelector(state => state.authStore.auth)
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

function App () {
  let isAuthenticated = useSelector(state => state.authStore.auth)

  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar bg='dark'>
            {isAuthenticated ? (
              <Container>
                <NavItem>
                  <LogoutButton />
                </NavItem>
              </Container>
            ) : (
              <Container>
                <NavItem>
                  <Link to='/'>Signup </Link>
                </NavItem>
                <NavItem>
                  <Link to='/login'>Login </Link>
                </NavItem>
                <NavItem>
                  <Link to='/todos'>Todos </Link>
                </NavItem>
              </Container>
            )}
          </Navbar>

          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/todos'
              element={
                <RequireAuth redirectTo='/login'>
                  <TodoList />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
