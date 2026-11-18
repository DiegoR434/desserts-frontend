import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useCartStore } from "../stores/useCartStore";
import type { Product } from "../types/product";

interface DeleteProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function DeleteProductModal({
  product,
  onClose,
}: DeleteProductModalProps) {
  const deleteMutation = useDeleteProduct();
  const removeItem = useCartStore((state) => state.removeItem);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(product.id);
      removeItem(product.id);
      onClose();
    } catch {
      // El error se muestra mediante deleteMutation.isError.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
        className="w-full max-w-md rounded-xl bg-white p-6"
      >
        <h2 id="delete-title" className="text-xl font-bold text-rose-900">
          Eliminar producto
        </h2>

        <p id="delete-description" className="my-4 text-sm text-rose-500">
          ¿Estás seguro de que deseas eliminar <strong>{product.name}</strong>?
          Esta acción no se puede deshacer.
        </p>

        {deleteMutation.isError && (
          <p role="alert" className="mb-4 text-sm text-red">
            No se pudo eliminar el producto. Inténtalo nuevamente.
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="rounded-full border border-rose-300 px-5 py-2 text-sm font-semibold text-rose-900 hover:bg-rose-50 disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="rounded-full bg-red px-5 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
