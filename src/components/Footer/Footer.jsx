import './Footer.css'

/**
 * Componente Footer moderno y sobrio para Homestore.
 * Diseñado en armonía con la identidad visual del Header (Hogar, Construcción y Decoración).
 *
 * @param {Object} props
 * @param {string} [props.storeName='Homestore'] - Nombre de la tienda
 * @param {string} [props.tagline='Todo para construir, renovar y decorar tu hogar'] - Lema de la tienda
 * @param {string} [props.phone='600 600 3010'] - Teléfono de atención
 * @param {string} [props.email='contacto@homestore.cl'] - Correo electrónico de contacto
 * @param {string} [props.schedule='Lunes a Domingo: 08:30 a 20:00 hrs'] - Horario de atención
 * @param {number} [props.year] - Año para el copyright
 * @param {boolean} [props.showBenefits=true] - Muestra u oculta la barra de beneficios
 */
function Footer({
  storeName = 'Homestore',
  tagline = 'Todo para construir, renovar y decorar tu hogar',
  phone = '600 600 3010',
  email = 'contacto@homestore.cl',
  schedule = 'Lunes a Domingo: 08:30 a 20:00 hrs',
  year = new Date().getFullYear(),
  showBenefits = true,
}) {
  const isHomestore = storeName.toLowerCase() === 'homestore'

  return (
    <footer className="homestore-footer">
      {/* 1. Franja de Beneficios y Confianza */}
      {showBenefits && (
        <div className="homestore-footer__benefits">
          <div className="homestore-footer__container">
            <div className="homestore-footer__benefits-grid">
              
              <div className="homestore-footer__benefit-card">
                <div className="homestore-footer__benefit-icon">🚚</div>
                <div className="homestore-footer__benefit-text">
                  <h4>Despacho a todo el país</h4>
                  <p>Envíos rápidos y seguimiento en línea</p>
                </div>
              </div>

              <div className="homestore-footer__benefit-card">
                <div className="homestore-footer__benefit-icon">🛡️</div>
                <div className="homestore-footer__benefit-text">
                  <h4>Garantía de Satisfacción</h4>
                  <p>Cambios y devoluciones sin complicaciones</p>
                </div>
              </div>

              <div className="homestore-footer__benefit-card">
                <div className="homestore-footer__benefit-icon">💳</div>
                <div className="homestore-footer__benefit-text">
                  <h4>Pago 100% Seguro</h4>
                  <p>Transacciones cifradas y múltiples medios</p>
                </div>
              </div>

              <div className="homestore-footer__benefit-card">
                <div className="homestore-footer__benefit-icon">📞</div>
                <div className="homestore-footer__benefit-text">
                  <h4>Soporte Especializado</h4>
                  <p>Asesoría para todos tus proyectos</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. Contenido Principal del Footer */}
      <div className="homestore-footer__main">
        <div className="homestore-footer__container">
          <div className="homestore-footer__grid">
            
            {/* Columna 1: Marca & Descripción */}
            <div className="homestore-footer__col homestore-footer__col--brand">
              <div className="homestore-footer__brand">
                <div className="homestore-footer__logo-badge">
                  <svg
                    className="homestore-footer__logo-svg"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 16L18 4L32 16"
                      stroke="url(#footerHomeGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 15V28C8 29.1 8.9 30 10 30H26C27.1 30 28 29.1 28 28V15"
                      stroke="#94a3b8"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 30V19C14 18.45 14.45 18 15 18H21C21.55 18 22 18.45 22 19V30"
                      fill="url(#footerHomeGradient)"
                    />
                    <path d="M25 8V12" stroke="url(#footerHomeGradient)" strokeWidth="3" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="footerHomeGradient" x1="4" y1="4" x2="32" y2="30" gradientUnits="userSpaceOnContext">
                        <stop stopColor="#E11D48" />
                        <stop offset="1" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="homestore-footer__brand-title">
                  {isHomestore ? (
                    <span className="homestore-footer__name">
                      <span className="homestore-footer__name--white">HOME</span>
                      <span className="homestore-footer__name--accent">STORE</span>
                    </span>
                  ) : (
                    <span className="homestore-footer__name homestore-footer__name--white">{storeName}</span>
                  )}
                  <span className="homestore-footer__badge">HOGAR</span>
                </div>
              </div>

              <p className="homestore-footer__description">{tagline}</p>

              {/* Redes sociales */}
              <div className="homestore-footer__social">
                <span className="homestore-footer__social-label">Síguenos:</span>
                <div className="homestore-footer__social-links">
                  <a href="#instagram" className="homestore-footer__social-btn" aria-label="Instagram">
                    📷
                  </a>
                  <a href="#facebook" className="homestore-footer__social-btn" aria-label="Facebook">
                    📘
                  </a>
                  <a href="#youtube" className="homestore-footer__social-btn" aria-label="YouTube">
                    ▶️
                  </a>
                  <a href="#whatsapp" className="homestore-footer__social-btn" aria-label="WhatsApp">
                    💬
                  </a>
                </div>
              </div>
            </div>

            {/* Columna 2: Servicio al Cliente */}
            <div className="homestore-footer__col">
              <h3 className="homestore-footer__col-title">Servicio al Cliente</h3>
              <ul className="homestore-footer__links">
                <li><a href="#preguntas-frecuentes" className="homestore-footer__link">Preguntas Frecuentes</a></li>
                <li><a href="#seguimiento" className="homestore-footer__link">Seguimiento de tu Compra</a></li>
                <li><a href="#cambios-devoluciones" className="homestore-footer__link">Cambios y Devoluciones</a></li>
                <li><a href="#boleta" className="homestore-footer__link">Boleta y Factura Electrónica</a></li>
                <li><a href="#garantias" className="homestore-footer__link">Pólizas de Garantía</a></li>
              </ul>
            </div>

            {/* Columna 3: Sobre Homestore */}
            <div className="homestore-footer__col">
              <h3 className="homestore-footer__col-title">Sobre Nosotros</h3>
              <ul className="homestore-footer__links">
                <li><a href="#nosotros" className="homestore-footer__link">Quiénes Somos</a></li>
                <li><a href="#tiendas" className="homestore-footer__link">Nuestras Sucursales</a></li>
                <li><a href="#sostenibilidad" className="homestore-footer__link">Compromiso Sustentable</a></li>
                <li><a href="#terminos" className="homestore-footer__link">Términos y Condiciones</a></li>
                <li><a href="#privacidad" className="homestore-footer__link">Políticas de Privacidad</a></li>
              </ul>
            </div>

            {/* Columna 4: Contacto y Horarios */}
            <div className="homestore-footer__col">
              <h3 className="homestore-footer__col-title">Contacto y Ayuda</h3>
              <div className="homestore-footer__contact-info">
                <div className="homestore-footer__contact-item">
                  <span className="homestore-footer__contact-icon">📞</span>
                  <div>
                    <strong>Venta y Atención:</strong>
                    <span>{phone}</span>
                  </div>
                </div>

                <div className="homestore-footer__contact-item">
                  <span className="homestore-footer__contact-icon">✉️</span>
                  <div>
                    <strong>Escríbenos:</strong>
                    <span>{email}</span>
                  </div>
                </div>

                <div className="homestore-footer__contact-item">
                  <span className="homestore-footer__contact-icon">🕒</span>
                  <div>
                    <strong>Horario:</strong>
                    <span>{schedule}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Barra Inferior de Copyright y Medios de Pago */}
      <div className="homestore-footer__bottom">
        <div className="homestore-footer__container homestore-footer__bottom-container">
          <p className="homestore-footer__copyright">
            © {year} <strong>{storeName}</strong> SpA. Todos los derechos reservados.
          </p>

          <div className="homestore-footer__payments">
            <span className="homestore-footer__payments-label">Medios de pago:</span>
            <div className="homestore-footer__payment-tags">
              <span className="homestore-footer__pay-tag">WebPay Plus</span>
              <span className="homestore-footer__pay-tag">Redcompra</span>
              <span className="homestore-footer__pay-tag">Visa / Mastercard</span>
              <span className="homestore-footer__pay-tag homestore-footer__pay-tag--accent">Tarjeta Homestore</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
