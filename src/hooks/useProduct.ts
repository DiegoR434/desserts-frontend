import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productService";

export function useProduct(id: string | undefined) {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => getProductById(id as string),
        enabled: !!id,
        retry: false,
    })
}