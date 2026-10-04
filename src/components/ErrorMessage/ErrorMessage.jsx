import Button from '../Button'
import './ErrorMessage.css'

/**
 * Componente ErrorMessage para visualizar de manera clara los errores al fallar la API.
 * Proporciona feedback amigable al usuario con opción de reintentar la conexión.
 *
 * @param {Object} props
 * @param {string} [props.title='No pudimos cargar los productos'] - Título del error
 * @param {string} [props.message='Ocurrió un inconveniente al conectar con el servidor.'] - Detalle del error
 * @param {Function} [props.onRetry] - Callback opcional para volver a intentar la petición
 */
function ErrorMessage({
  title = 'No pudimos cargar los productos',
  message = 'Ocurrió un inconveniente al conectar con el servidor.',
  onRetry,
}) {
  return (
    <div className="error-message-card" role="alert" aria-live="assertive">
      <div className="error-message-card__icon-box">
        <svg
          className="error-message-card__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <div className="error-message-card__content">
        <h3 className="error-message-card__title">{title}</h3>
        <p className="error-message-card__desc">{message}</p>
      </div>

      {onRetry && (
        <div className="error-message-card__actions">
          <Button
            variant="primary"
            size="md"
            onClick={onRetry}
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            }
          >
            Reintentar conexión
          </Button>
        </div>
      )}
    </div>
  )
}

export default ErrorMessage
