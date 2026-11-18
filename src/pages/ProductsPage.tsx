import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ConfirmOrderModal from "../components/ConfirmOrderModal";
import Header from "../components/Header";
import ProductFilters from "../components/ProductFilters";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: products,
    isPending,
    isError,
  } = useProducts({ name: search.trim(), category });

  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">
      {isModalOpen && (
        <ConfirmOrderModal onClose={() => setIsModalOpen(false)} />
      )}

      <Header />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Columna izquierda: filtros y productos */}
          <div className="min-w-0">
            <ProductFilters
              search={search}
              category={category}
              categories={[
                "Waffle",
                "Crème Brûlée",
                "Macaron",
                "Tiramisu",
                "Baklava",
                "Pie",
                "Cake",
                "Brownie",
                "Panna Cotta",
              ]}
              onSearchChange={setSearch}
              onCategoryChange={setCategory}
              onAddProduct={() => navigate("/add-product")}
            />

            <section
              className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
              aria-label="Catálogo de postres"
            >
              {isPending ? (
                Array.from({ length: 9 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : isError ? (
                <p className="col-span-full text-red">
                  Ocurrió un error al cargar los productos.
                </p>
              ) : products.length === 0 ? (
                <p className="col-span-full text-rose-500">
                  No se encontraron productos.
                </p>
              ) : (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </section>
          </div>

          {/* Columna derecha: carrito */}
          <CartDrawer onConfirm={() => setIsModalOpen(true)} />
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;
