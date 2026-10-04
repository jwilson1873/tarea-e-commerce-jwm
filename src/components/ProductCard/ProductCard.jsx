import { useState } from 'react'
import Button from '../Button'
import './ProductCard.css'

const productImageUrls = import.meta.glob('/src/assets/productos/*', {
  eager: true,
  query: '?url',
  import: 'default',
})
 
/**
 * Utilidad para formatear montos.
 * Soporta montos numéricos de la API DummyJSON (USD) y montos enteros locales.
 * @param {number} amount
 * @returns {string}
 */
const formatPrice = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * Componente ProductCard para Homestore.
 * - Recibe información del producto mediante props (product o id, name/title, price, category, image/thumbnail).
 * - Compatible con la API de DummyJSON y catálogos estáticos.
 * - Muestra nombre, precio, imagen, categoría y rating del producto.
 * - Maneja estado local con useState (favorito y feedback al añadir al carrito).
 * - Integración con botón reutilizable (Button).
 *
 * @param {Object} props
 * @param {Object} [props.product] - Objeto completo de producto según API o schema local
 * @param {number|string} [props.id] - Identificador único del producto
 * @param {string} [props.name] - Nombre o título comercial del producto
 * @param {number} [props.price] - Precio del producto
 * @param {string} [props.category] - Categoría a la que pertenece
 * @param {string} [props.image] - URL o ruta del recurso de imagen
 * @param {Function} [props.onAddToCart] - Callback disparado al hacer clic en 'Agregar al carrito'
 */
function ProductCard({
  product,
  id = product?.id,
  title,
  name,
  price = product?.price || 0,
  category = product?.category || 'General',
  image,
  thumbnail,
  rating: propRating,
  onAddToCart,
}) {
  // Estado con useState para alternar producto como favorito
  const [isFavorite, setIsFavorite] = useState(false)
  // Estado con useState para dar feedback visual de confirmación al agregar
  const [isAdded, setIsAdded] = useState(false)

  const resolvedName = title || name || product?.title || product?.name || 'Producto Homestore'
  const resolvedImage =
    thumbnail ||
    image ||
    product?.thumbnail ||
    (Array.isArray(product?.images) && product.images[0]) ||
    product?.image ||
    ''

  const productData = product || {
    id,
    name: resolvedName,
    title: resolvedName,
    price,
    category,
    image: resolvedImage,
    thumbnail: resolvedImage,
  }

  const imageUrl =
    typeof resolvedImage === 'string' && productImageUrls[resolvedImage]
      ? productImageUrls[resolvedImage]
      : resolvedImage

  const formattedCategory =
    typeof category === 'string' && category.trim().length > 0
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : 'General'

  const productSku = product?.sku || `HS-${String(id).padStart(4, '0')}`
  const rawRating = propRating !== undefined ? propRating : product?.rating
  const rating = rawRating ? Number(rawRating).toFixed(1) : null
  const shippingText =
    product?.shippingInformation ||
    (price >= 50 ? 'Envío gratis' : null)

  const handleToggleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite((prev) => !prev)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    setIsAdded(true)

    if (onAddToCart) {
      onAddToCart(productData)
    }

    // Volver al estado normal luego de 1.2 segundos
    setTimeout(() => {
      setIsAdded(false)
    }, 1200)
  }

  return (
    <article className="product-card" aria-label={name}>
      {/* Zona superior: Imagen, Badge de Categoría y Botón Favorito */}
      <div className="product-card__media">
        {formattedCategory && (
          <span className="product-card__category-badge" title={`Categoría: ${formattedCategory}`}>
            {formattedCategory}
          </span>
        )}

        {/* Botón interactivo de Favorito (useState) */}
        <button
          type="button"
          className={`product-card__fav-btn ${isFavorite ? 'product-card__fav-btn--active' : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          title={isFavorite ? 'Guardado en favoritos' : 'Añadir a lista de deseos'}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#e11d48' : 'none'}
            stroke={isFavorite ? '#e11d48' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Contenedor de la Imagen con zoom al hover */}
        <div className="product-card__img-wrap">
          <img
            src={imageUrl}
            alt={name}
            className="product-card__image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = 'https://placehold.co/400x400/f1f5f9/0f172a?text=Homestore'
            }}
          />
        </div>
      </div>

      {/* Zona central: Información del Producto */}
      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__sku">CÓD: {productSku}</span>
          {rating && (
            <span className="product-card__rating-badge" title={`Calificación: ${rating} de 5 estrellas`}>
              ⭐ {rating}
            </span>
          )}
          {shippingText && (
            <span className="product-card__shipping-badge" title={shippingText}>
              🚚 {shippingText.replace(/^🚚\s*/, '')}
            </span>
          )}
        </div>

        <h3 className="product-card__name" title={name}>
          {name}
        </h3>

        <div className="product-card__pricing">
          <span className="product-card__price-label">Precio Oferta</span>
          <div className="product-card__price">{formatPrice(price)}</div>
        </div>
      </div>

      {/* Zona inferior: Botón reutilizable para añadir al carrito */}
      <div className="product-card__footer">
        <Button
          variant={isAdded ? 'secondary' : 'primary'}
          fullWidth
          size="md"
          onClick={handleAddToCart}
          className={isAdded ? 'product-card__btn--success' : ''}
          icon={
            isAdded ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            )
          }
        >
          {isAdded ? '¡Agregado al Carrito!' : 'Agregar al Carrito'}
        </Button>
      </div>
    </article>
  )
}

export default ProductCard
