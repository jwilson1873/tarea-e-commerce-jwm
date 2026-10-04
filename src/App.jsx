import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

function App() {
  // Estados requeridos para consumo de API: datos, carga y error
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryTrigger, setRetryTrigger] = useState(0)

  // Estado para el contador del carrito de compras
  const [cartCount, setCartCount] = useState(0)
  // Estado para la búsqueda controlada por input
  const [searchTerm, setSearchTerm] = useState('')
  // Estado para el filtro de categorías
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  // Consumo de API dentro de useEffect al montar y al reintentar
  useEffect(() => {
    let isCancelled = false
    const controller = new AbortController()

    async function fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(
            `Error en la respuesta del servidor (Código ${response.status}: ${
              response.statusText || 'Error de conexión'
            })`
          )
        }

        const data = await response.json()

        if (!isCancelled) {
          if (Array.isArray(data?.products)) {
            setProducts(data.products)
            setError(null)
          } else {
            throw new Error(
              'El formato recibido desde la API no contiene una lista válida de productos.'
            )
          }
        }
      } catch (err) {
        if (!isCancelled && err.name !== 'AbortError') {
          setError(
            err.message ||
              'No se pudo conectar con el servicio de DummyJSON. Por favor verifica tu conexión a internet.'
          )
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [retryTrigger])

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setRetryTrigger((prev) => prev + 1)
  }

  // Obtener categorías únicas dinámicamente desde los productos de la API
  const categories = useMemo(() => {
    if (!products.length) return ['Todos']
    const uniqueCategories = [
      'Todos',
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ]
    return uniqueCategories
  }, [products])

  // Formatear visualmente el nombre de la categoría (capitalizado)
  const formatCategoryName = (cat) => {
    if (!cat) return ''
    if (cat === 'Todos') return 'Todos'
    return cat.charAt(0).toUpperCase() + cat.slice(1)
  }

  // Filtrado reactivo de productos según categoría y búsqueda por nombre
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = product.title || product.name || ''
      const productCategory = product.category || ''

      const matchesCategory =
        selectedCategory === 'Todos' ||
        productCategory.toLowerCase() === selectedCategory.toLowerCase()

      const matchesSearch =
        searchTerm.trim() === '' ||
        productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        productCategory.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchTerm])

  const handleCartClick = () => {
    alert(
      cartCount === 0
        ? 'Tu carrito de compras en Homestore está vacío.'
        : `Tienes ${cartCount} producto(s) en tu carrito de compras de Homestore.`
    )
  }

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1)
  }

  return (
    <div className="app-container">
      <Header
        storeName="Homestore"
        tagline="Encuentra todo lo que necesitas para tu hogar y proyectos"
        topBanner="✨ Envíos gratis por compras sobre $50 USD • 🚚 Despacho rápido a todo el país"
        cartCount={cartCount}
        onCartClick={handleCartClick}
      >
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
          placeholder="Buscar productos por nombre..."
        />
      </Header>

      <main className="main-content">
        {/* Visualización de estado de carga */}
        {loading && (
          <Loader message="Cargando catálogo de productos desde DummyJSON..." />
        )}

        {/* Visualización de estado de error */}
        {error && !loading && (
          <ErrorMessage
            title="Error al consultar los productos"
            message={error}
            onRetry={handleRetry}
          />
        )}

        {/* Visualización de datos y catálogo cuando no hay carga ni error */}
        {!loading && !error && (
          <>
            {/* Encabezado del catálogo y filtros */}
            <section className="catalog-header">
              <div className="catalog-header__info">
                <h2 className="catalog-header__title">Catálogo de Productos</h2>
                <p className="catalog-header__subtitle">
                  Mostrando <strong>{filteredProducts.length}</strong> de{' '}
                  <strong>{products.length}</strong> productos disponibles
                </p>
              </div>

              {/* Filtro interactivo por categorías dinámicas */}
              {categories.length > 1 && (
                <div
                  className="catalog-filters"
                  role="tablist"
                  aria-label="Filtros por categoría"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`catalog-filter-btn ${
                        selectedCategory === cat ? 'catalog-filter-btn--active' : ''
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                      role="tab"
                      aria-selected={selectedCategory === cat}
                    >
                      {formatCategoryName(cat)}
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Listado de productos renderizado usando ProductList y ProductCard con map y key */}
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              emptyMessage={
                searchTerm
                  ? `No se encontraron resultados para "${searchTerm}". Prueba con otra palabra clave o categoría.`
                  : 'No hay productos disponibles en esta categoría.'
              }
            />
          </>
        )}
      </main>

      <Footer
        storeName="Homestore"
        tagline="Todo para construir, renovar y decorar tu hogar con la mejor calidad y garantía."
      />
    </div>
  )
}

export default App
