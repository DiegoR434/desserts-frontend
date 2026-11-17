function ProductCardSkeleton() {
     return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-xl bg-rose-300/40" />

      <div className="mt-8 space-y-3">
        <div className="h-3 w-20 rounded bg-rose-300/40" />
        <div className="h-4 w-3/4 rounded bg-rose-300/40" />
        <div className="h-4 w-16 rounded bg-rose-300/40" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;