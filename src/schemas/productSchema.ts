import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.coerce
    .number()
    .positive({ message: "El precio debe ser mayor que cero" }),
  image: z.object({
    mobile: z.string().trim().min(1, "La imagen mobile es obligatoria"),

    desktop: z.string().trim().min(1, "La imagen desktop es obligatoria"),

    thumbnail: z.string().trim().min(1, "La imagen thumbnail es obligatoria"),

    tablet: z.string().optional(),
  }),
});

export type ProductFormData = z.output<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;