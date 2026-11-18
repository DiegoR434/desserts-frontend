import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import QuantityStepper from "./QuantityStepper";
import { useCartStore } from "../stores/useCartStore";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  const cartItem = items.find((item) => item.product.id === product.id);

  console.log("Producto actual:", product.id);
  console.log("Productos del carrito:", items);
  console.log("Producto encontrado:", cartItem);

  return (
    <div className="flex flex-col">
      {/* Imagen */}
      <div className="relative mb-8">
        <picture>
          <source media="(min-width: 1440px)" srcSet={product.image.desktop} />

          <img
            src={product.image.mobile}
            alt={product.name}
            className="w-full rounded-xl object-cover"
          />
        </picture>

        {/* Botón visual del carrito */}

        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
          {cartItem ? (
            <QuantityStepper
              productId={product.id}
              quantity={cartItem.quantity}
            />
          ) : (
            <button
              type="button"
              onClick={() => addItem(product)}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-rose-400 bg-white px-6 py-3 text-sm font-semibold text-rose-900 transition-colors hover:border-orange-700 hover:text-orange-700"
            >
              <img
                src="../assets/images/icon-add-to-cart.svg"
                alt="add-to-cart"
                className="h-5 w-5"
              />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Información del producto */}
      <div className="space-y-1">
        <p className="font-sans text-rose-400">{product.category}</p>

        <h2 className="text-base font-semibold text-rose-900">
          <Link
            to={`/producto/${product.id}`}
            className="hover:text-red hover:underline"
          >
            {product.name}
          </Link>
        </h2>

        <p className="font-semibold text-red">${product.price.toFixed(2)}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="rounded-lg border border-rose-400 px-4 py-2 text-sm font-semibold text-rose-900 transition-colors hover:border-red hover:bg-rose-50 hover:text-red"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => onDelete(product)}
            className="rounded-lg border border-red px-4 py-2 text-sm font-semibold text-red transition-colors hover:bg-red hover:text-white"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
