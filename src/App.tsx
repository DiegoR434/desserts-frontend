import CartDrawer from "./components/CartDrawer"
import ProductCard from "./components/ProductCard"
import { products } from "./data/products"


function App() {

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">

      <h1 className="mb-8 text-4xl font-bold text-rose-900">
          Desserts
      </h1>

      <div 
      className="mx-auto grid max-w-7xl grid-cols-1 gap-7 min-[1440px]:grid-cols-[minmax(0,1fr)_320px]">
        
        <section
          className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Catálogo de postres"
        >
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
            />
          ))}
        </section>
        <CartDrawer />
      </div>
      
    </main>
  )
}

export default App
