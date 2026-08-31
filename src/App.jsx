import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  // Estado para gestionar los productos en el carrito
  const [cartCount] = useState(3)

  const handleCartClick = () => {
    alert(`Tienes ${cartCount} producto(s) en tu carrito de compras de Homestore.`)
  }

  return (
    <div className="app-container">
      <Header
        storeName="Homestore"
        tagline="Encuentra todo lo que necesitas para tu hogar y proyectos"
        topBanner="✨ Envíos gratis por compras sobre $29.990 • 🚚 Despacho rápido a todo Chile"
        cartCount={cartCount}
        onCartClick={handleCartClick}
      />

      <main className="main-content">
        {/* Espacio para SearchBar, ProductList, ProductCard */}
      </main>

      <Footer
        storeName="Homestore"
        tagline="Todo para construir, renovar y decorar tu hogar con la mejor calidad y garantía."
      />
    </div>
  )
}

export default App
