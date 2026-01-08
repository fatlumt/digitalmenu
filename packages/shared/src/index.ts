import { z } from "zod";

export const slugSchema = z
  .string()
  .min(3)
  .max(50)
  .regex(/^[a-z0-9-]+$/, "Slug can only include lowercase letters, numbers, and dashes.")
  .transform((value) => value.toLowerCase());

export const restaurantSchema = z.object({
  name: z.string().min(2),
  slug: slugSchema,
  logoUrl: z.string().url().optional().nullable(),
  address: z.string().min(2),
  phone: z.string().min(5),
  currency: z.string().min(1),
  languages: z.array(z.string()).min(1),
  socialLinks: z.record(z.string().url()).optional(),
});

export type RestaurantInput = z.infer<typeof restaurantSchema>;

export const menuSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});

export type MenuInput = z.infer<typeof menuSchema>;

export const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  sortOrder: z.number().int().min(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const itemSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().min(0),
  imageUrl: z.string().url().optional().nullable(),
  tags: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
  isSpicy: z.boolean().default(false),
  isVegan: z.boolean().default(false),
  available: z.boolean().default(true),
  sortOrder: z.number().int().min(0),
});

export type ItemInput = z.infer<typeof itemSchema>;

export const optionGroupSchema = z.object({
  name: z.string().min(2),
  minSelectable: z.number().int().min(0),
  maxSelectable: z.number().int().min(1),
});

export type OptionGroupInput = z.infer<typeof optionGroupSchema>;

export const optionSchema = z.object({
  name: z.string().min(2),
  priceDelta: z.number(),
});

export type OptionInput = z.infer<typeof optionSchema>;
