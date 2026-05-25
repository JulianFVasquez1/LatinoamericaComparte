import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import './AdminHeader.css';

export default function AdminHeader({ title }) {
  const { user, role, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="admin-header">
      {/* Título de la sección actual */}
      <div className="admin-header__left">
        <h6 className="admin-header__title mb-0">{title || 'Panel de Administración'}</h6>
      </div>

      {/* Controles de la derecha */}
      <div className="admin-header__right">

        {/* Nombre + rol del usuario */}
        <div className="admin-header__user d-none d-md-flex">
          <i className="bi bi-person-circle fs-5 me-2 opacity-75"></i>
          <div className="d-flex flex-column lh-1">
            <span className="fw-semibold small">{user?.nombre} {user?.apellido}</span>
            <span className="admin-header__role">{role?.replace(/_/g, ' ')}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="admin-header__divider d-none d-md-block"></div>

        {/* Botón de toggle de tema */}
        <button
          onClick={toggleTheme}
          className="admin-header__theme-btn"
          aria-label="Cambiar tema"
          title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
        >
          {theme === 'light' ? (
            <i className="bi bi-moon-stars-fill"></i>
          ) : (
            <i className="bi bi-sun-fill text-warning"></i>
          )}
        </button>

        {/* Botón de cerrar sesión */}
        <button
          onClick={logout}
          className="admin-header__logout-btn"
          title="Cerrar sesión"
        >
          <i className="bi bi-box-arrow-right me-1"></i>
          <span className="d-none d-sm-inline">Salir</span>
        </button>

      </div>
    </header>
  );
}
