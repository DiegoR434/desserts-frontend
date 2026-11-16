import type { Product } from "../types/product";
import { api } from "./api";

export interface ProductFilters{
    name: string;
    category: string;
}

export async function getProducts(
  filters: ProductFilters
): Promise<Product[]> {
  const [response] = await Promise.all([
    api.get<Product[]>("/products", {
      params: {
        ...(filters.name && {
          "name:contains": filters.name,
        }),
        ...(filters.category && {
          category: filters.category,
        }),
      },
    }),
    new Promise<void>((resolve) =>
      setTimeout(resolve, 1200)
    ),
  ]);

  return response.data;
}