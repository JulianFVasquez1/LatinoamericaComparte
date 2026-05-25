import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeSelector from './ThemeSelector';
import './Sidebar.css';

export default function Sidebar() {
  const { user, role, country, logout } = useAuth();
  const location = useLocation();

  const isSuperAdmin = role === 'superadmin';

  const getLogoPath = () => {
    if (country && country.slug) {
      return `/assets/logos/${country.slug}.png`;
    }
    return '/assets/logos/default.png';
  };

  const navLinks = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: 'bi-speedometer2', roles: ['superadmin', 'admin_pais', 'editor'] },
    { path: '/admin/noticias', name: 'Noticias', icon: 'bi-newspaper', roles: ['superadmin', 'admin_pais', 'editor'] },
    { path: '/admin/testimonios', name: 'Testimonios', icon: 'bi-chat-quote', roles: ['superadmin', 'admin_pais', 'editor'] },
    { path: '/admin/solicitudes', name: 'Solicitudes', icon: 'bi-envelope', roles: ['superadmin', 'admin_pais'] },
    { path: '/admin/users', name: 'Usuarios', icon: 'bi-people', roles: ['superadmin'] },
    { path: '/admin/auditoria', name: 'Auditoría', icon: 'bi-clipboard-data', roles: ['superadmin'] },
  ];

  return (
    <div className="sidebar-wrapper bg-slate-custom text-white">

      {/* ── 1. HEADER ── */}
      <div className="sidebar-header text-center px-3 pt-4 pb-3">
        <img
          src={getLogoPath()}
          alt="Logo País"
          className="img-fluid rounded mb-2"
          style={{ maxHeight: '64px', objectFit: 'contain' }}
          onError={(e) => { e.target.src = '/assets/logos/default.png'; }}
        />
        <h6 className="mb-0 fw-bold text-white">CMS Multipaís</h6>
        <small className="text-white-50">{country ? country.nombre : 'Global'}</small>
      </div>

      <hr className="sidebar-divider" />

      {/* ── 2. NAV (scroll interno si hay muchos ítems) ── */}
      <nav className="sidebar-nav px-2">
        {navLinks.map((link) => {
          if (!link.roles.includes(role)) return null;
          const isActive = location.pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
            >
              <i className={`${link.icon} sidebar-link__icon`}></i>
              <span>{link.name}</span>
            </Link>
          );
        })}

        {isSuperAdmin && (
          <>
            <hr className="sidebar-divider mt-3" />
            <Link
              to="/admin/configuracion"
              className={`sidebar-link ${location.pathname.startsWith('/admin/configuracion') ? 'sidebar-link--active' : ''}`}
            >
              <i className="bi-gear sidebar-link__icon"></i>
              <span>Config. Global</span>
            </Link>
          </>
        )}
      </nav>

      {/* ── 3. FOOTER ── */}
      <div className="sidebar-footer">
        {/* Fila de usuario + ThemeSelector */}
        <div className="sidebar-footer__row">
          <div className="dropdown">
            <a
              href="#"
              className="sidebar-user dropdown-toggle text-decoration-none text-white"
              id="dropdownUser"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi-person-circle fs-4"></i>
              <div className="sidebar-user__info">
                <strong className="small d-block">{user?.nombre} {user?.apellido}</strong>
                <span className="text-white-50" style={{ fontSize: '0.68rem' }}>
                  {role?.replace(/_/g, ' ')}
                </span>
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark shadow mb-2" aria-labelledby="dropdownUser">
              <li>
                <Link className="dropdown-item py-2" to="/admin/profile">
                  <i className="bi-person me-2"></i> Mi Perfil
                </Link>
              </li>
              <li>
                <Link className="dropdown-item py-2" to="/admin/change-password">
                  <i className="bi-key me-2"></i> Cambiar Clave
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger py-2" onClick={logout}>
                  <i className="bi-box-arrow-right me-2"></i> Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>

          {/* Botón de Tema */}
          <ThemeSelector />
        </div>
      </div>

    </div>
  );
}
