import './Header.css'

/**
 * Componente Header reutilizable para la tienda online.
 * Según los requisitos: Muestra el logo y el nombre de la tienda.
 *
 * @param {Object} props
 * @param {string} [props.storeName='Mi Tienda'] - Nombre de la tienda
 * @param {string|React.ReactNode} [props.logo] - URL de la imagen del logo o elemento React
 * @param {string} [props.tagline] - Lema o subtítulo opcional
 * @param {React.ReactNode} [props.children] - Elementos adicionales opcionales (ej. barra de búsqueda, navegación, etc.)
 */
function Header({
  storeName = 'Mi Tienda Online',
  logo,
  tagline,
  children,
}) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand">
          {logo ? (
            typeof logo === 'string' ? (
              <img src={logo} alt={`${storeName} logo`} className="header__logo" />
            ) : (
              logo
            )
          ) : (
            <div className="header__logo-fallback" aria-label="Logo de la tienda">
              🛒
            </div>
          )}
          <div className="header__info">
            <h1 className="header__title">{storeName}</h1>
            {tagline && <p className="header__tagline">{tagline}</p>}
          </div>
        </div>

        {children && <div className="header__actions">{children}</div>}
      </div>
    </header>
  )
}

export default Header
