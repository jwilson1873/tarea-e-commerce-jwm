import './SearchBar.css'

/**
 * Componente SearchBar controlado para Homestore.
 * - Input controlado para búsqueda con useState.
 * - Separado en carpeta /components/SearchBar.
 *
 * @param {Object} props
 * @param {string} props.value - Valor actual de búsqueda
 * @param {Function} props.onChange - Callback cuando cambia el texto
 * @param {Function} [props.onClear] - Callback para limpiar el buscador
 * @param {string} [props.placeholder='¿Qué estás buscando para tu hogar?'] - Texto placeholder
 */
function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = '¿Qué buscas para tu hogar o proyecto?',
}) {
  return (
    <div className="hs-searchbar">
      <svg
        className="hs-searchbar__icon"
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
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="hs-searchbar__input"
        aria-label="Buscar productos"
      />
      {value && (
        <button
          type="button"
          className="hs-searchbar__clear"
          onClick={() => {
            if (onClear) onClear()
            else onChange?.('')
          }}
          aria-label="Limpiar búsqueda"
          title="Limpiar"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
