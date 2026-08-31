import './Header.css'

/**
 * Componente Header moderno, estilizado y de alto impacto visual para Homestore.
 * Combina un diseño premium y sobrio, optimizado para catálogo en página única.
 *
 * @param {Object} props
 * @param {string} [props.storeName='Homestore'] - Nombre de la tienda
 * @param {string|React.ReactNode} [props.logo] - Logo personalizado o imagen
 * @param {string} [props.tagline='Todo para renovar y decorar tu hogar'] - Lema de la tienda
 * @param {number} [props.cartCount=0] - Cantidad de artículos en el carrito
 * @param {string} [props.topBanner] - Mensaje superior promocional (opcional)
 * @param {Function} [props.onCartClick] - Callback al hacer clic en el carrito
 * @param {React.ReactNode} [props.children] - Espacio para la barra de búsqueda (SearchBar)
 */
function Header({
  storeName = 'Homestore',
  logo,
  tagline = 'Todo para construir, renovar y decorar tu hogar',
  cartCount = 0,
  topBanner = '✨ Envíos gratis por compras sobre $29.990 • 🚚 Despacho rápido a todo el país',
  onCartClick,
  children,
}) {
  // Separamos el nombre si es Homestore para estilizar 'HOME' y 'STORE' con diseño distintivo
  const isHomestore = storeName.toLowerCase() === 'homestore'

  return (
    <header className="homestore-header">
      {/* 1. Micro-banner superior informativo y elegante */}
      {topBanner && (
        <div className="homestore-header__topbanner">
          <div className="homestore-header__topbanner-inner">
            <span className="homestore-header__topbanner-text">{topBanner}</span>
            <div className="homestore-header__topbanner-badges">
              <span className="homestore-header__pill">🔒 Compra Segura</span>
              <span className="homestore-header__pill">⭐ Garantía Oficial</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Barra principal con efecto Glassmorphism y sombras sutiles */}
      <div className="homestore-header__main">
        <div className="homestore-header__container">
          
          {/* Marca / Logo */}
          <div className="homestore-header__brand">
            <div className="homestore-header__logo-box">
              {logo ? (
                typeof logo === 'string' ? (
                  <img src={logo} alt={`${storeName} logo`} className="homestore-header__logo-img" />
                ) : (
                  logo
                )
              ) : (
                <div className="homestore-header__logo-badge" title={storeName}>
                  <svg
                    className="homestore-header__logo-svg"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Techo estilizado con gradiente */}
                    <path
                      d="M4 16L18 4L32 16"
                      stroke="url(#homeGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Estructura de la casa */}
                    <path
                      d="M8 15V28C8 29.1 8.9 30 10 30H26C27.1 30 28 29.1 28 28V15"
                      stroke="#334155"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    {/* Puerta / Detalle central */}
                    <path
                      d="M14 30V19C14 18.45 14.45 18 15 18H21C21.55 18 22 18.45 22 19V30"
                      fill="url(#homeGradient)"
                    />
                    {/* Chimenea */}
                    <path d="M25 8V12" stroke="url(#homeGradient)" strokeWidth="3" strokeLinecap="round" />
                    
                    <defs>
                      <linearGradient id="homeGradient" x1="4" y1="4" x2="32" y2="30" gradientUnits="userSpaceOnContext">
                        <stop stopColor="#E11D48" />
                        <stop offset="1" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
            </div>

            <div className="homestore-header__titles">
              <div className="homestore-header__brand-heading">
                {isHomestore ? (
                  <h1 className="homestore-header__name">
                    <span className="homestore-header__name--bold">HOME</span>
                    <span className="homestore-header__name--accent">STORE</span>
                  </h1>
                ) : (
                  <h1 className="homestore-header__name">{storeName}</h1>
                )}
                <span className="homestore-header__badge">HOGAR</span>
              </div>
              {tagline && <p className="homestore-header__tagline">{tagline}</p>}
            </div>
          </div>

          {/* Área central: SearchBar o buscador visual estilizado */}
          <div className="homestore-header__search-area">
            {children ? (
              children
            ) : (
              <div className="homestore-header__search-bar">
                <svg
                  className="homestore-header__search-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="¿Qué buscas para tu hogar o proyecto?"
                  className="homestore-header__search-input"
                  aria-label="Buscar productos"
                />
                <button type="button" className="homestore-header__search-submit" aria-label="Buscar">
                  Buscar
                </button>
              </div>
            )}
          </div>

          {/* Acciones: Carrito de compras con diseño moderno */}
          <div className="homestore-header__actions">
            <button
              type="button"
              className={`homestore-header__cart-btn ${cartCount > 0 ? 'homestore-header__cart-btn--active' : ''}`}
              onClick={onCartClick}
              aria-label={`Carrito de compras con ${cartCount} productos`}
            >
              <div className="homestore-header__cart-icon-wrap">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className={`homestore-header__cart-badge ${cartCount > 0 ? 'homestore-header__cart-badge--show' : ''}`}>
                  {cartCount}
                </span>
              </div>
              <div className="homestore-header__cart-info">
                <span className="homestore-header__cart-label">Mi Carrito</span>
                <span className="homestore-header__cart-sub">
                  {cartCount === 0 ? '0 items' : `${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`}
                </span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
