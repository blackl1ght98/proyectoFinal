import { createContext, useContext, useState, useEffect } from 'react';
import { logic } from '../logic';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //Crea un estado que guarda si el usuario esta logueado o no lo esta
  const [loggedIn, setLoggedIn] = useState(logic.isUserLoggedIn());
  //Si es true es que esta logueado si en cambi si es false es que no lo esta
  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);
  // Al montar el componente, sincroniza el estado 'loggedIn' con el valor actual de logic.isUserLoggedIn()

  useEffect(() => {
    setLoggedIn(logic.isUserLoggedIn());
  }, []);
  //En funcion de ese estado digo si esta o no logueado
  return <AuthContext.Provider value={{ loggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
