import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ConfirmOrderModal from "../components/ConfirmOrderModal";
import Header from "../components/Header";
import ProductFilters from "../components/ProductFilters";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import ProductFormModal from "../components/ProductFormModal";
import type { Product } from "../types/product";
import DeleteProductModal from "../components/DeleteProductmodal";
import Pagination from "../components/Pagination";
import { useCategories } from "../hooks/useCategories";

function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [page, setPage] = useState(1);

  const {
    data: response,
    isPending,
    isError,
  } = useProducts({ name: search.trim(), category, page });
  const products = response?.data ?? [];

  const {
    data: categoriesData = [],
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useCategories();

  const categories = categoriesData.map((item) => item.name);

  const totalPages = response?.pages ?? 1;

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset page to 1 when search changes
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1); // Reset page to 1 when category changes
  };

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">
      {isModalOpen && (
        <ConfirmOrderModal onClose={() => setIsModalOpen(false)} />
      )}

      {isProductModalOpen && (
        <ProductFormModal
          product={selectedProduct ?? undefined}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {productToDelete && (
        <DeleteProductModal
          product={productToDelete}
          onClose={() => setProductToDelete(null)}
        />
      )}

      <Header />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Columna izquierda: filtros y productos */}
          <div className="min-w-0">
            <ProductFilters
              search={search}
              category={category}
              categories={categories}
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onAddProduct={() => {
                setSelectedProduct(null);
                setIsProductModalOpen(true);
              }}
            />

            <section
              className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
              aria-label="Catálogo de postres"
            >
              {isPending ? (
                Array.from({ length: 8 }).map((_, index) => (
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
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={setProductToDelete}
                  />
                ))
              )}
            </section>

            {!isPending && !isError && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>

          {/* Columna derecha: carrito */}
          <CartDrawer onConfirm={() => setIsModalOpen(true)} />
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;
