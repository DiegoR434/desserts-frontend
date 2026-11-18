
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProduct } from "../services/productService";
import type { ProductFormData } from "../schemas/productSchema";

interface UpdateProductData {
  id: string;
  data: ProductFormData;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProductData) =>
      updateProduct(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}
