import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="admin-shell">

      {/* ── SIDEBAR ── */}
      <aside className="admin-sidebar">
        <div className="brand-box">
          <div className="brand-icon">LC</div>
          <div>
            <h4>CMS Multipaís</h4>
            <span>Panel administrativo</span>
          </div>
        </div>

        {/* NAV: flex-grow para que ocupe el espacio y empuje el footer al fondo */}
        <nav className="admin-menu" style={{ flex: '1 1 0', overflowY: 'auto' }}>
          <NavLink to="/admin/dashboard" className="admin-link">
            <i className="bi bi-grid-1x2-fill" />
            Dashboard
          </NavLink>

          <NavLink to="/admin/noticias" className="admin-link">
            <i className="bi bi-newspaper" />
            Noticias
          </NavLink>

          <NavLink to="/admin/testimonios" className="admin-link">
            <i className="bi bi-chat-quote-fill" />
            Testimonios
          </NavLink>

          {['superadmin', 'admin_pais'].includes(user?.rol) && (
            <NavLink to="/admin/solicitudes" className="admin-link">
              <i className="bi bi-envelope-paper-fill" />
              Solicitudes
            </NavLink>
          )}

          <NavLink to="/admin/profile" className="admin-link">
            <i className="bi bi-person-circle" />
            Mi perfil
          </NavLink>

          <NavLink to="/admin/change-password" className="admin-link">
            <i className="bi bi-key-fill" />
            Cambiar contraseña
          </NavLink>

          <NavLink to="/admin/security-question" className="admin-link">
            <i className="bi bi-shield-lock-fill" />
            Pregunta de seguridad
          </NavLink>

          {user?.rol === 'superadmin' && (
            <NavLink to="/admin/users" className="admin-link">
              <i className="bi bi-people-fill" />
              Usuarios
            </NavLink>
          )}

          {user?.rol === 'superadmin' && (
            <NavLink to="/admin/auditoria" className="admin-link">
              <i className="bi bi-activity" />
              Auditoría
            </NavLink>
          )}
        </nav>

        {/* FOOTER: position relative, margin-top auto, sin superponerse al nav */}
        <div
          className="sidebar-footer"
          style={{
            position: 'relative',
            marginTop: 'auto',
            padding: '12px 16px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <small style={{ opacity: 0.6 }}>Latinoamérica Comparte</small>

          {/* Toggle Dark/Light Mode */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              fontSize: '0.9rem',
              transition: 'background 0.2s',
            }}
          >
            {theme === 'light'
              ? <i className="bi bi-moon-stars-fill"></i>
              : <i className="bi bi-sun-fill" style={{ color: '#ffc107' }}></i>
            }
          </button>
        </div>
      </aside>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="topbar-label">Bienvenido</p>
            <h5>{user?.nombre} {user?.apellido}</h5>
            <span>{user?.rol}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right" />
            Cerrar sesión
          </button>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>

    </div>
  );
}