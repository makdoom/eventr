"use server";

import { ScheduleFormValues } from "@/schemas";
import prisma from "../lib/db";
import { getUserSession } from "../lib/hooks";
import { revalidatePath } from "next/cache";

export const getAvailableTimes = async (userId: string) => {
  const data = await prisma.availabilitySchedule.findMany({
    where: { userId },
    select: {
      id: true,
      eventName: true,
      isDefault: true,
      schedule: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return data;
};

export const createNewAvailablityEvent = async (
  formData: ScheduleFormValues
) => {
  try {
    const session = await getUserSession();
    const { eventName, schedule, isDefault } = formData;

    await prisma.availabilitySchedule.create({
      data: {
        eventName: eventName,
        isDefault: isDefault,
        userId: session?.user?.id || null,
        schedule: {
          create: schedule.map((item) => ({
            day: item.day,
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          })),
        },
      },
    });

    // return result;
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard/availability");
};
