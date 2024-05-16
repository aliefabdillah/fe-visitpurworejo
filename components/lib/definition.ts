import { z } from "zod";

const MAX_FILE_SIZE = 256000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/octet-stream",
];

export const LoginFormSchema = z.object({
  identifier: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

export const RegisterFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(6, { message: "Be at least 6 characters long" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
  confirmPassword: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

export const EditProfilSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(6, { message: "Be at least 6 characters long" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  fullname: z
    .string()
    .max(255, { message: "A name can't more than 255 character" })
    .optional(),
  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 number" })
    .max(15, { message: "Phone number can't more than 15 number" })
    .optional(),
  hometown: z.string().optional(),
  img_profile: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file && file.size <= MAX_FILE_SIZE),
      `Max image size is 250KB.`
    )
    .refine(
      (file) => !file || (file && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, and .png formats are supported."
    ),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
  passwordConfirmation: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});

export const formArtikelSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Field cannot be empty" })
    .max(255, { message: "Field must be at least 255 characters" }),
  short_content: z
    .string()
    .min(1, { message: "Field cannot be empty" })
    .max(255, { message: "Input can't more than 255 character" }),
  publish_date: z.string().min(1, { message: "Field cannot be empty" }),
  kategori_id: z.string().min(1, { message: "Field cannot be empty" }),
  content: z.string().min(1, { message: "Field cannot be empty" }),
  img_cover: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file && file.size <= MAX_FILE_SIZE),
      `Max image size is 250KB.`,
    )
    .refine(
      (file) => !file || (file && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and video formats are supported.",
    ),
});
