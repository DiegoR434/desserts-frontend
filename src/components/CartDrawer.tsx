function CartDrawer(){
    return (
    <div className="rounded-xl bg-white p-6 self-start">
      <h2 className="mb-8 text-2xl font-bold text-red">
        Your Cart (0)
      </h2>

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
    </div>
    );
}

export default CartDrawer