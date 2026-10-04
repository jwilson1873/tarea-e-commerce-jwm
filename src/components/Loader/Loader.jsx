import './Loader.css'

/**
 * Componente Loader para mostrar un indicador visual de carga durante peticiones a la API.
 * Cumple con accesibilidad mediante role="status" y aria-live="polite".
 *
 * @param {Object} props
 * @param {string} [props.message='Cargando productos...'] - Mensaje descriptivo del estado de carga
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Tamaño visual del spinner
 */
function Loader({
  message = 'Cargando productos...',
  size = 'md',
}) {
  return (
    <div className={`loader-container loader-container--${size}`} role="status" aria-live="polite">
      <div className="loader-spinner">
        <div className="loader-spinner__ring" />
        <div className="loader-spinner__core" />
      </div>
      {message && <p className="loader-message">{message}</p>}
      <span className="loader-sr-only">Cargando contenido, por favor espera...</span>
    </div>
  )
}

export default Loader
