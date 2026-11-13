interface QuantityStepperProps {
  quantity: number;
}

function QuantityStepper({ quantity }: QuantityStepperProps) {
  return (
    <div className="flex w-40 items-center justify-between rounded-full bg-red px-3 py-3 text-white">
      <button
        type="button"
        className="flex h-5 w-5 items-center justify-center rounded-full border border-rose-50 hover:border-red  hover:bg-rose-500"
      >
        <img
          src="/assets/images/icon-decrement-quantity.svg"
          alt=""
        />
      </button>

      <span className="text-sm font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        className="flex h-5 w-5 items-center justify-center rounded-full border border-rose-50 hover:border-red hover:bg-rose-500"
      >
        <img
          src="/assets/images/icon-increment-quantity.svg"
          alt=""
        />
      </button>
    </div>
      );
}

export default QuantityStepper;
