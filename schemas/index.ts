import { Schedule } from "@prisma/client";
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

export const SettingSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  username: z.string(),
  email: z.string(),
  about: z.string(),
  image: z.string(),
});
export type SettingSchemaType = z.infer<typeof SettingSchema>;

export const scheduleSchema = z.object({
  id: z.string().optional(),
  eventName: z.string().min(3, "Event name is required"),
  isDefault: z.boolean().default(false),
  schedule: z.array(
    z.object({
      day: z.string(),
      isActive: z.boolean(),
      fromTime: z.string(),
      tillTime: z.string(),
    })
  ),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;

export type AvailabilityType = {
  eventName: string;
  isDefault: boolean;
  schedule: Schedule[];
  createdAt: Date;
  scheduleMessageList: string[];
};

export const eventFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  url: z.string(),
  description: z.string().min(1, "Description is required"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  isActive: z.boolean().default(false),
  videoCallSoftware: z.string().default("Google Meet"),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
