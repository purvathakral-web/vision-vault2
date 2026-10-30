import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Wraps the private routes. Logged in -> show the page (<Outlet />).
// Not logged in -> redirect to /login and remember where they wanted to go.
function ProtectedRoute() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}

export default ProtectedRoute
