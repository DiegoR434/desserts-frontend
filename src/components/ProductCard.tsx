import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    return(
         <div className="flex flex-col">
      {/* Imagen responsive */}
      <div className="relative mb-8">
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={product.image.desktop}
          />
          
          <img
            src={product.image.mobile}
            alt={product.name}
            className="w-full rounded-xl object-cover"
          />
        </picture>

        {/* Botón visual del carrito */}
        <button
          type="button"
          className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-rose-400 bg-white px-6 py-3 text-sm font-semibold text-rose-900 transition-colors hover:border-orange-700 hover:text-orange-700"
        >
          <img
            src="../assets/images/icon-add-to-cart.svg"
            alt="add-to-cart"
            className="h-5 w-5"
          />
          Add to Cart
        </button>
      </div>

      {/* Información del producto */}
      <div className="space-y-1">
        <p className="font-sans text-rose-400">
          {product.category}
        </p>

        <h2 className="text-base font-semibold text-rose-900">
          {product.name}
        </h2>

        <p className="font-semibold text-red">
          ${product.price.toFixed(2)}
        </p>
      </div>
        </div>
    );
}

export default ProductCard;