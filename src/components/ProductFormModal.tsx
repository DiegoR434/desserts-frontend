import { useEffect, useRef } from "react";

import ProductForm from "./ProductForm";
import { useCreateProduct } from "../hooks/useCreateProduct";
import type { ProductFormData } from "../schemas/productSchema";
import type { Product } from "../types/product";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

interface ProductFormModalProps {
  product?: Product;
  onClose: () => void;
}

export default function ProductFormModal({
  product,
  onClose,
}: ProductFormModalProps) {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const isEditing = Boolean(product);
  const isPending = createMutation.isPending || updateMutation.isPending;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      if (product) {
        await updateMutation.mutateAsync({ id: product.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }

      onClose();
    } catch {
      // El error se muestra mediante createMutation.isError.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
        onKeyDown={(event) => {
          if (event.key === "Escape" && !createMutation.isPending) {
            onClose();
          }
        }}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 outline-none sm:p-8"
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2
            id="product-form-title"
            className="text-2xl font-bold text-rose-900"
          >
            {isEditing ? "Agregar producto" : "Editar producto"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={createMutation.isPending}
            aria-label="Cerrar formulario"
            className="text-2xl text-rose-500 hover:text-red disabled:opacity-50"
          >
            ×
          </button>
        </div>

        <ProductForm
          key={product?.id ?? "create"}
          mode={isEditing ? "edit" : "create"}
          initialValues={product}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />

        {(createMutation.isError || updateMutation.isError) && (
          <p role="alert" className="mt-4 text-sm text-red">
            No se pudo guardar el producto. Inténtalo nuevamente.
          </p>
        )}
      </div>
    </div>
  );
}
