import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Usernam can only contains letters, number and hyphens(-)",
    }),
});

export type OnBoardingSchemaType = z.infer<typeof onboardingSchema>;
