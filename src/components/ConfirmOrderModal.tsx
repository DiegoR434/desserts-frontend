interface ConfirmOrderModalProps {
  onClose: () => void;
}

function ConfirmOrderModal({onClose}: ConfirmOrderModalProps) {
    return(
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-lg rounded-xl bg-white p-6"
      >
        <img
          src="/assets/images/icon-order-confirmed.svg"
          alt=""
          className="mb-5 h-10 w-10"
        />

        <h2
          id="order-modal-title"
          className="text-3xl font-bold text-rose-900"
        >
          Order Confirmed
        </h2>

        <p className="mt-2 text-rose-500">
          We hope you enjoy your food!
        </p>

        <div className="my-6 rounded-lg bg-rose-50 p-4">
          <p className="text-sm text-rose-500">
            Your order summary will appear here.
          </p>
        </div>

        <button
          type="button"
          onClick={ onClose }
          className="w-full rounded-full bg-red py-3 font-semibold text-white hover:opacity-90"
        >
          Start New Order
        </button>
      </div>
    </div>
    );
}

export default ConfirmOrderModal;