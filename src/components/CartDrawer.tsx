import { useCartStore } from "../stores/useCartStore";

function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const orderTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="self-start rounded-xl bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold text-red">
        Your Cart ({totalItems})
      </h2>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-4">
          <img
            src="/assets/images/illustration-empty-cart.svg"
            alt=""
            className="w-32"
          />

          <p className="text-center text-sm font-semibold text-rose-500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center justify-between gap-3 border-b border-rose-100 pb-4"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-rose-900">
                    {item.product.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <span className="font-semibold text-red">
                      {item.quantity}x
                    </span>

                    <span className="text-rose-400">
                      @ ${item.product.price.toFixed(2)}
                    </span>

                    <span className="font-semibold text-rose-500">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  aria-label={`Eliminar ${item.product.name} del carrito`}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rose-400 text-rose-400 hover:border-rose-900 hover:text-rose-900"
                >
                  <img
                    src="/assets/images/icon-remove-item.svg"
                    alt=""
                    className="h-3 w-3"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="my-6 flex items-center justify-between">
            <span className="text-sm text-rose-900">
              Order Total
            </span>

            <span className="text-2xl font-bold text-rose-900">
              ${orderTotal.toFixed(2)}
            </span>
          </div>

          <div className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-rose-50 p-4">
            <img
              src="/assets/images/icon-carbon-neutral.svg"
              alt=""
              className="h-5 w-5"
            />

            <p className="text-sm text-rose-900">
              This is a <strong>carbon-neutral</strong> delivery
            </p>
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-red py-3 font-semibold text-white hover:opacity-90"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}

export default CartDrawer;
