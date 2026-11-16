import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { AxiosError } from "axios";

function ProductDetailPage() {
  console.log("ProductDetailPage rendered");

  const { id } = useParams<{ id: string }>();

  console.log("id", id);

  const { data: product, isPending, isError, error } = useProduct(id);

  if (isPending) {
    return (
      <main className="min-h-screen bg-rose-50 px-6 py-12">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="mb-8 h-5 w-36 rounded bg-rose-300/40" />
          <div className="grid gap-8 md:grid-cols-2">
            <div className="aspect-square rounded-xl bg-rose-300/40" />
            <div className="space-y-5">
              <div className="h-4 w-24 rounded bg-rose-300/40" />
              <div className="h-8 w-3/4 rounded bg-rose-300/40" />
              <div className="h-6 w-20 rounded bg-rose-300/40" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    const notFound =
      error instanceof AxiosError && error.response?.status === 404;

    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-rose-50 px-6 text-center">
        <h1 className="text-4xl font-bold text-rose-900">
          {notFound
            ? "404 - Producto no encontrado"
            : "Error al cargar el producto"}
        </h1>

        <p className="mt-3 text-rose-500">
          {notFound
            ? "El producto solicitado no existe."
            : "No pudimos obtener la información. Inténtalo nuevamente."}
        </p>

        <Link
          to="/"
          className="mt-6 rounded-full bg-red px-6 py-3 font-semibold text-white"
        >
          Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-rose-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-8 inline-block font-semibold text-red hover:underline"
        >
          ← Volver al catálogo
        </Link>

        <div className="grid items-center gap-8 md:grid-cols-2">
          <picture>
            <source media="(min-width: 768px)" srcSet={product.image.desktop} />
            <img
              src={product.image.mobile}
              alt={product.name}
              className="w-full rounded-xl object-cover"
            />
          </picture>

          <div className="space-y-4">
            <p className="text-rose-500">{product.category}</p>

            <h1 className="text-3xl font-bold text-rose-900">{product.name}</h1>

            <p className="text-2xl font-bold text-red">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetailPage;
