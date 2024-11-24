import { z } from 'zod';

const stationeryValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.enum([
    "Writing",
    "Office Supplies",
    "Art Supplies",
    "Educational",
    "Technology",
  ]),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().int().min(1, "Quantity must be a positive integer"),
  inStock: z.boolean(),
}).refine(data => data.category !== undefined, {
  message: "Category must be one of the allowed values",
  path: ["category"], // This points to the specific key
});

export default stationeryValidationSchema;