import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './DashboardPage.css';

export const DashboardPage = () => {
  const { user, role, country } = useAuth();

  // Verifica si el rol actual es superadmin
  const isSuperAdmin = role === 'superadmin';

  // Obtiene el logo dinámico según el slug del país o carga un logo genérico
  const getLogoPath = () => {
    if (country && country.slug) {
      return `/assets/logos/${country.slug}.png`;
    }
    return '/assets/logos/default.png';
  };

  return (
    <div className="container-fluid py-4 px-4">
      
      {/* Header con Mensaje de Bienvenida y Logo */}
      <div className="row mb-5 align-items-center">
        <div className="col-auto">
          <div 
            className="logo-container bg-body p-2 rounded-4 shadow-sm d-flex justify-content-center align-items-center" 
            style={{ width: '90px', height: '90px' }}
          >
            <img 
              src={getLogoPath()} 
              alt={`Logo ${country ? country.nombre : 'Global'}`} 
              className="img-fluid" 
              style={{ maxHeight: '100%', objectFit: 'contain' }}
              onError={(e) => { e.target.src = '/assets/logos/default.png'; }}
            />
          </div>
        </div>
        <div className="col">
          <h1 className="h2 mb-1 text-slate-custom fw-bold">
            ¡Bienvenido, {user?.nombre} {user?.apellido}!
          </h1>
          <p className="text-muted mb-0 fs-5">
            Panel de Administración CMS - {isSuperAdmin ? 'Vista Global' : `Sede ${country?.nombre}`}
          </p>
        </div>
      </div>

      {/* Tarjetas Informativas */}
      <div className="row g-4">
        
        {/* Card 1: Mi País */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-slate-custom text-white">
            <div className="card-body p-4 d-flex flex-column justify-content-center">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-body text-slate-custom rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-globe-americas fs-4"></i>
                </div>
                <h5 className="card-title mb-0 fw-semibold">Mi País</h5>
              </div>
              <h2 className="display-6 fw-bold mb-0">
                {country ? country.nombre : 'Global'}
              </h2>
              <p className="text-white-50 mt-2 mb-0">Región de administración</p>
            </div>
          </div>
        </div>

        {/* Card 2: Rol de Usuario */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4 d-flex flex-column justify-content-center">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-body text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-person-badge fs-4"></i>
                </div>
                <h5 className="card-title text-body mb-0 fw-semibold">Rol de Usuario</h5>
              </div>
              <h2 className="display-6 fw-bold text-body mb-0 text-capitalize">
                {role?.replace('_', ' ')}
              </h2>
              <p className="text-body mt-2 mb-0 opacity-75">Nivel de acceso en plataforma</p>
            </div>
          </div>
        </div>

        {/* Card 3: Noticias Totales */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4 d-flex flex-column justify-content-center">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-box bg-body text-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-newspaper fs-4"></i>
                </div>
                <h5 className="card-title text-body mb-0 fw-semibold">Noticias Totales</h5>
              </div>
              <h2 className="display-6 fw-bold text-body mb-0">
                0
              </h2>
              <p className="text-body mt-2 mb-0 opacity-75">Publicaciones registradas</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;