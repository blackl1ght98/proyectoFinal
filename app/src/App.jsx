import { useEffect } from 'react';
import { logic } from './logic';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Landing } from './view/Landing';
import { Register } from './view/Register';
import { Login } from './view/Login';
import { Users } from './view/Users';
import { Home } from './view/Home'; // Añade esta importación

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      return;
    }
    try {
      const loggedIn = logic.isUserLoggedIn();
      console.log('el login es ' + loggedIn);
      if (loggedIn) {
        navigate('/users', { replace: true });
      } else {
        navigate('/landing', { replace: true });
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
