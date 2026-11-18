import type { ProductFormData } from "../schemas/productSchema";
import type { Product } from "../types/product";
import { api } from "./api";

export interface ProductFilters{
    name: string;
    category: string;
}

export async function getProducts(
  filters: ProductFilters
): Promise<Product[]> {

  const params: Record<string, string> = {};

  if (filters.name) {
    params["name:contains"] = filters.name;
  }
  if (filters.category) {
    params.category = filters.category;
  }

  const [response] = await Promise.all([
    api.get<Product[]>("/products", {
      params: params,
    }),
    new Promise<void>((resolve) =>
      setTimeout(resolve, 1900)
    ),
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
  data: ProductFormData): Promise<Product> {
    const response = await api.patch<Product>(`/products/${id}`, data);
    
    return response.data;
}
