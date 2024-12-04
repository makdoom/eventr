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
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard/availability");
};

export const deleteAvailabilityEvent = async (eventId: string) => {
  try {
    const session = await getUserSession();

    await prisma.availabilitySchedule.delete({
      where: { id: eventId, userId: session?.user?.id },
    });
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard/availability");
};

export const copyAvailabilityEvent = async (eventId: string) => {
  try {
    const session = await getUserSession();

    await prisma.$transaction(async (tx) => {
      // Get existing event
      const eventToCopy = await tx.availabilitySchedule.findUnique({
        where: { id: eventId, userId: session.user?.id },
        select: { eventName: true, isDefault: true, schedule: true },
      });

      if (!eventToCopy) throw new Error("Event not found");

      // Create new event
      await tx.availabilitySchedule.create({
        data: {
          userId: session.user?.id,
          eventName: `${eventToCopy?.eventName} - Copy`,
          isDefault: false,
          schedule: {
            create: eventToCopy.schedule.map((item) => ({
              day: item.day,
              isActive: item.isActive,
              fromTime: item.fromTime,
              tillTime: item.tillTime,
            })),
          },
        },
      });
    });
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard/availability");
};

export const updateDefaultEvent = async (eventId: string) => {
  try {
    const session = await getUserSession();

    await prisma.$transaction(async (tx) => {
      // Get existing event
      await tx.availabilitySchedule.updateMany({
        where: { userId: session.user?.id, isDefault: true },
        data: { isDefault: false },
      });

      // Create new event
      await tx.availabilitySchedule.update({
        where: { id: eventId, userId: session.user?.id },
        data: {
          isDefault: true,
        },
      });
    });
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard/availability");
};
