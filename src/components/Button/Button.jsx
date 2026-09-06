import './Button.css'

/**
 * Componente Button reutilizable para Homestore.
 * Diseñado conforme a los requerimientos de la tarea de componentes custom en React.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido o texto del botón
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary'] - Variante de estilo
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Tamaño del botón
 * @param {boolean} [props.fullWidth=false] - Ocupa todo el ancho si es true
 * @param {boolean} [props.disabled=false] - Deshabilita la interacción
 * @param {string} [props.className=''] - Clases CSS adicionales
 * @param {Function} [props.onClick] - Callback al hacer click
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Tipo de botón HTML
 * @param {React.ReactNode} [props.icon] - Ícono complementario opcional
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  icon,
  ...rest
}) {
  const classes = [
    'hs-button',
    `hs-button--${variant}`,
    `hs-button--${size}`,
    fullWidth ? 'hs-button--full' : '',
    disabled ? 'hs-button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="hs-button__icon">{icon}</span>}
      <span className="hs-button__text">{children}</span>
    </button>
  )
}

export default Button
