import { useAuth } from './AuthContext';
import { Navigate } from 'react-router';
// Redirige a login si no está logueado
export const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
