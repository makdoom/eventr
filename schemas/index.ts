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

// const timeSlotSchema = z.object({
//   startTime: z
//     .string()
//     .regex(/^([0-9]{1,2}):([0-9]{2})(am|pm)$/i, "Invalid time format"),
//   endTime: z
//     .string()
//     .regex(/^([0-9]{1,2}):([0-9]{2})(am|pm)$/i, "Invalid time format"),
// });

export const scheduleSchema = z.object({
  eventName: z.string(),
  isDefault: z.boolean().default(false),
  schedule: z.array(
    z.object({
      day: z.string(),
      // day: z.enum([
      //   "Sunday",
      //   "Monday",
      //   "Tuesday",
      //   "Wednesday",
      //   "Thursday",
      //   "Friday",
      //   "Saturday",
      // ]),
      isActive: z.boolean(),
      fromTime: z.string(),
      tillTime: z.string(),
      // timeSlots: z.array(timeSlotSchema).optional(),
    })
  ),
});

// Example type
export type ScheduleFormValues = z.infer<typeof scheduleSchema>;
