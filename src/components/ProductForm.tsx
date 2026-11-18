import { useForm } from "react-hook-form";

import { productSchema, type ProductFormData, type ProductFormInput } from "../schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";


interface ProductFormProps {
  mode: "create" | "edit";
  initialValues?: ProductFormData;
  onSubmit: (data: ProductFormData) => void | Promise<void>;
  isSubmitting?: boolean;
}

function ProductForm({
  mode,
  initialValues,
  onSubmit,
  isSubmitting = false,
}: ProductFormProps) {
    const{
        register,
        handleSubmit,
        formState: { errors, isSubmitting: isFormSubmitting },
    } = useForm <ProductFormInput, unknown, ProductFormData>({
        resolver: zodResolver(productSchema),
    defaultValues: initialValues ?? {
      name: "",
      category: "",
      price: 0,
      image: {
        thumbnail: "",
        mobile: "",
        tablet: "",
        desktop: "",
      },
    },
    });

    const isBusy = isSubmitting || isFormSubmitting;

    return(
        <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-semibold text-rose-900"
        >
          Nombre del producto *
        </label>

        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full rounded-lg border border-rose-300 px-3 py-2 focus:border-red focus:outline-none"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-semibold text-rose-900"
        >
          Categoría *
        </label>

        <input
          id="category"
          type="text"
          {...register("category")}
          className="w-full rounded-lg border border-rose-300 px-3 py-2 focus:border-red focus:outline-none"
        />

        {errors.category && (
          <p className="mt-1 text-sm text-red">
            {errors.category.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="mb-1 block text-sm font-semibold text-rose-900"
        >
          Precio *
        </label>

        <input
          id="price"
          type="number"
          min="0.01"
          step="0.01"
          {...register("price")}
          className="w-full rounded-lg border border-rose-300 px-3 py-2 focus:border-red focus:outline-none"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red">
            {errors.price.message}
          </p>
        )}
      </div>

      <h3 className="border-t border-rose-100 pt-4 font-semibold text-rose-900">
        Imágenes del producto
      </h3>

      <div>
        <label
          htmlFor="thumbnail"
          className="mb-1 block text-sm font-semibold text-rose-900"
        >
          Imagen thumbnail *
        </label>

        <input
          id="thumbnail"
          type="text"
          placeholder="/assets/images/imagen-thumbnail.jpg"
          {...register("image.thumbnail")}
          className="w-full rounded-lg border border-rose-300 px-3 py-2 focus:border-red focus:outline-none"
        />

        {errors.image?.thumbnail && (
          <p className="mt-1 text-sm text-red">
            {errors.image.thumbnail.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="mobile"
          className="mb-1 block text-sm font-semibold text-rose-900"
        >
          Imagen mobile *
        </label>

        <input
          id="mobile"
          type="text"
          placeholder="/assets/images/imagen-mobile.jpg"
          {...register("image.mobile")}
          className="w-full rounded-lg border border-rose-300 px-3 py-2 focus:border-red focus:outline-none"
        />

        {errors.image?.mobile && (
          <p className="mt-1 text-sm text-red">
            {errors.image.mobile.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="tablet"
          className="mb-1 block text-sm font-semibold text-rose-900"
        >
          Imagen tablet (opcional)
        </label>

        <input
          id="tablet"
          type="text"
          {...register("image.tablet")}
          className="w-full rounded-lg border border-rose-300 px-3 py-2 focus:border-red focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="desktop"
          className="mb-1 block text-sm font-semibold text-rose-900"
        >
          Imagen desktop *
        </label>

        <input
          id="desktop"
          type="text"
          placeholder="/assets/images/imagen-desktop.jpg"
          {...register("image.desktop")}
          className="w-full rounded-lg border border-rose-300 px-3 py-2 focus:border-red focus:outline-none"
        />

        {errors.image?.desktop && (
          <p className="mt-1 text-sm text-red">
            {errors.image.desktop.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isBusy}
        className="w-full rounded-full bg-red py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isBusy
          ? "Guardando..."
          : mode === "create"
            ? "Crear producto"
            : "Guardar cambios"}
      </button>
    </form>
    );


}

export default ProductForm;