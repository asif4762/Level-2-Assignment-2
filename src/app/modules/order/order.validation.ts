import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  product: z.string().min(1, "Product ID is required"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
  totalPrice: z
    .number()
    .positive("Total price must be greater than 0"),
});

export default orderValidationSchema;