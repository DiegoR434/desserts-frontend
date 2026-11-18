import type { ProductFormData } from "../schemas/productSchema";
import type { PaginatedResponse } from "../types/pagination";
import type { Product } from "../types/product";
import { api } from "./api";

export interface ProductFilters {
  name: string;
  category: string;
  page: number;
}

export async function getProducts(
  filters: ProductFilters,
): Promise<PaginatedResponse<Product>> {
  const params: Record<string, string | number> = {
    _page: filters.page,
    _per_page: 8,
  };

  if (filters.name) {
    params["name:contains"] = filters.name;
  }

  if (filters.category) {
    params.category = filters.category;
  }

  const [response] = await Promise.all([
    api.get<PaginatedResponse<Product>>("/products", {
      params,
    }),
    new Promise<void>((resolve) => setTimeout(resolve, 1200)),
  ]);

  return response.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  const response = await api.post<Product>("/products", data);
  return response.data;
}

export async function updateProduct(
  id: string,
  data: ProductFormData,
): Promise<Product> {
  const response = await api.patch<Product>(`/products/${id}`, data);

  return response.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/products/${id}`);
}
