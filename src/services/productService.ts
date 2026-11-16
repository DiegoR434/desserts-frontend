import type { Product } from "../types/product";
import { api } from "./api";

export async function getProducts(): Promise<Product[]> {
    const [response] = await Promise.all([
    api.get<Product[]>("/products"),
    new Promise<void>((resolve) => setTimeout(resolve, 1900)),
  ]);
    return response.data;
}