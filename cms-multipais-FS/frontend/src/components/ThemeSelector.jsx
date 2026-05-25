import { useTheme } from '../context/ThemeContext';

export default function ThemeSelector() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="btn btn-outline-secondary d-flex align-items-center rounded-circle p-2 shadow-sm"
      title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      style={{ width: '40px', height: '40px', justifyContent: 'center' }}
    >
      {theme === 'light' ? (
        <i className="bi bi-moon-stars-fill fs-5"></i>
      ) : (
        <i className="bi bi-sun-fill text-warning fs-5"></i>
      )}
    </button>
  );
}
