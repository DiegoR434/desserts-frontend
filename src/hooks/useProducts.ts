import { useQuery } from "@tanstack/react-query";
import { getProducts, type ProductFilters } from "../services/productService";

export function useProducts(filters : ProductFilters) {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: () => getProducts(filters),
    })
}