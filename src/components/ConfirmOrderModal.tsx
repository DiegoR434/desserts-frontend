import { useCartStore } from "../stores/useCartStore";

interface ConfirmOrderModalProps {
  onClose: () => void;
}

function ConfirmOrderModal({ onClose }: ConfirmOrderModalProps) {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const orderTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleNewOrder = () => {
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6">
        <img
          src="/assets/images/icon-order-confirmed.svg"
          alt=""
          className="mb-5 h-10 w-10"
        />

        <h2 id="order-modal-title" className="text-3xl font-bold text-rose-900">
          Order Confirmed
        </h2>

        <p className="mt-2 text-rose-500">We hope you enjoy your food!</p>

        <div className="my-6 rounded-lg bg-rose-50 p-4">
          <ul>
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center gap-3 border-b border-rose-100 py-3"
              >
                <img
                  src={item.product.image.thumbnail}
                  alt=""
                  className="h-12 w-12 rounded"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-rose-900">
                    {item.product.name}
                  </h3>

                  <div className="mt-1 flex gap-3 text-sm">
                    <span className="font-semibold text-red">
                      {item.quantity}x
                    </span>

                    <span className="text-rose-400">
                      @ ${item.product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <span className="font-semibold text-rose-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-rose-900">Order Total</span>

            <span className="text-2xl font-bold text-rose-900">
              ${orderTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNewOrder}
          className="w-full rounded-full bg-red py-3 font-semibold text-white hover:opacity-90"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmOrderModal;
