import ProductCard from '../ProductCard'
import './ProductList.css'

/**
 * Componente ProductList para renderizar una lista de productos.
 * - Renderiza lista de productos usando map.
 * - Uso correcto de key única (product.id).
 * - Componente separado en carpeta /components/ProductList.
 *
 * @param {Object} props
 * @param {Array} [props.products=[]] - Lista de productos a renderizar
 * @param {Function} [props.onAddToCart] - Callback para añadir producto al carrito
 * @param {string} [props.emptyMessage] - Mensaje a mostrar si no hay productos
 */
function ProductList({
  products = [],
  onAddToCart,
  emptyMessage = 'No se encontraron productos disponibles en esta sección.',
}) {
  if (!products || products.length === 0) {
    return (
      <div className="product-list__empty">
        <div className="product-list__empty-icon">🔍</div>
        <h3 className="product-list__empty-title">Sin resultados</h3>
        <p className="product-list__empty-text">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="product-list-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductList
