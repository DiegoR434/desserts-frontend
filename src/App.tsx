import CartDrawer from "./components/CartDrawer"
import ProductCard from "./components/ProductCard"
import Header from "./components/Header"
import ConfirmOrderModal from "./components/ConfirmOrderModal"

import { products } from "./data/products"
import { useState } from "react";
import { useProducts } from "./hooks/useProducts"
import ProductCardSkeleton from "./components/ProductCardSkeleton"


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data:products, isPending, isError } = useProducts();

  
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">


      <button onClick={() => setIsModalOpen(true)} > Mostrar Confirmacion </button>
      {
        isModalOpen && <ConfirmOrderModal onClose={() => setIsModalOpen(false)} />
      }

      <Header />

      <div 
      className="mx-auto grid max-w-7xl grid-cols-1 gap-7 min-[1440px]:grid-cols-[minmax(0,1fr)_320px]">
        
        <section
          className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Catálogo de postres"
        >
          {isPending
    ? Array.from({ length: 9 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))
    : isError
      ? (
        <p className="col-span-full text-red">
          Ocurrió un error al cargar los productos.
        </p>
      )
      : products.length === 0
        ? (
          <p className="col-span-full text-rose-500">
            No se encontraron productos.
          </p>
        )
        : products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={index === 0}
          />
        ))}
        </section>
        <CartDrawer />
      </div>
      
    </main>
  )
}

export default App
