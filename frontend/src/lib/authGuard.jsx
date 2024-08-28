import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const isAuthenticated = () => {
  return false
}

export const PublicRoutes = () => {
  const location = useLocation()

  return <Outlet />
}

export const ProtectedRoutes = () => {
  const location = useLocation()

  return isAuthenticated() ?
    <Navigate to="/login" state={{ from: location }} /> : <Outlet />}