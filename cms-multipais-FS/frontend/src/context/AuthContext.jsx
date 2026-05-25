import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar sesión del localStorage al cargar la app
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setRole(parsedUser.rol);
        setCountry(parsedUser.pais);
      } catch (error) {
        console.error("Error parsing stored user data", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Llamar a authService
    const data = await authService.login(username, password);
    
    // Guardar en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Actualizar estado global
    setToken(data.token);
    setUser(data.user);
    setRole(data.user.rol);
    setCountry(data.user.pais);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setToken(null);
    setUser(null);
    setRole(null);
    setCountry(null);
  };

  const value = {
    user,
    token,
    role,
    country,
    login,
    logout,
    isAuthenticated: !!token,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};