import { z } from "zod";
import { ComponentType } from "@/generated/prisma/enums";

export const signupSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email(),
  birthDate: z.string().date().optional(), // "YYYY-MM-DD", optional at signup
});

export const activateSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(200),
});

const componentTypeSchema = z.enum([
  ComponentType.MENTAL,
  ComponentType.PHYSICAL,
  ComponentType.FINANCIAL,
  ComponentType.CAREER,
  ComponentType.RELATIONSHIPS,
  ComponentType.SOCIAL,
  ComponentType.HABITS,
  ComponentType.LEARNING,
  ComponentType.PURPOSE,
]);

export const weightsSchema = z.object({
  weights: z.record(componentTypeSchema, z.number().min(0).max(100)),
});

export const birthDateSchema = z.object({
  birthDate: z.string().date(),
});

export const assessmentSubmitSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1),
        rawValue: z.number().int().min(0).max(5),
      }),
    )
    .min(1),
});

export const userStatusSchema = z.object({
  status: z.enum(["ACTIVE", "SUSPENDED"]),
});
