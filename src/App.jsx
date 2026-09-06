import { useState, useMemo } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import productsData from './data/products.json'
import './App.css'

function App() {
  // Estado para el contador del carrito de compras
  const [cartCount, setCartCount] = useState(0)
  // Estado para la búsqueda controlada por input
  const [searchTerm, setSearchTerm] = useState('')
  // Estado para el filtro de categorías
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  // Obtener categorías únicas dinámicamente desde el JSON
  const categories = useMemo(() => {
    const cats = ['Todos', ...new Set(productsData.map((p) => p.category))]
    return cats
  }, [])

  // Filtrado reactivo de productos según categoría y término de búsqueda
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory
      const matchesSearch =
        searchTerm.trim() === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

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
        topBanner="✨ Envíos gratis por compras sobre $29.990 • 🚚 Despacho rápido a todo Chile"
        cartCount={cartCount}
        onCartClick={handleCartClick}
      >
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />
      </Header>

      <main className="main-content">
        {/* Encabezado del catálogo y filtros */}
        <section className="catalog-header">
          <div className="catalog-header__info">
            <h2 className="catalog-header__title">Catálogo de Productos</h2>
            <p className="catalog-header__subtitle">
              Mostrando <strong>{filteredProducts.length}</strong> de{' '}
              <strong>{productsData.length}</strong> productos disponibles
            </p>
          </div>

          {/* Filtro por categorías */}
          <div className="catalog-filters" role="tablist" aria-label="Filtros por categoría">
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
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Listado de productos renderizado usando ProductList y ProductCard con map y key */}
        <ProductList
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          emptyMessage={
            searchTerm
              ? `No se encontraron resultados para "${searchTerm}". Prueba con otra palabra clave o categoría.`
              : 'No hay productos en esta categoría.'
          }
        />
      </main>

      <Footer
        storeName="Homestore"
        tagline="Todo para construir, renovar y decorar tu hogar con la mejor calidad y garantía."
      />
    </div>
  )
}

export default App
