"use server";

import { ScheduleFormValues } from "@/schemas";
import prisma from "../lib/db";
import { getUserSession } from "../lib/hooks";
import { Schedule } from "@prisma/client";

const getFormattedTimeStr = (data: Schedule[]) => {
  const filtered = data.filter((item) => item.isActive);

  const finalStr = filtered.reduce((acc, curr, index) => {
    if (curr.isActive && !acc) {
      acc += `${curr.day} - `;
    }

    if (index !== 0 && curr.isActive) {
      const prevItem = filtered[index - 1];
      const prevTimeStr = `${prevItem.fromTime}-${prevItem.tillTime}`;
      const currTimeStr = `${curr.fromTime}-${curr.tillTime}`;

      if (prevTimeStr !== currTimeStr) {
        if (!acc.includes(prevItem.day)) {
          acc += `${prevItem.day}  -  ${prevItem.fromTime}  -  ${prevItem.tillTime}`;
        } else {
          acc += `${prevItem.fromTime} -  ${prevItem.tillTime}`;
        }

        acc += `|${curr.day} - `;
        if (index == filtered.length - 1) {
          acc += ` ${curr.fromTime}  -  ${curr.tillTime}`;
        }
      }
    }

    return acc;
  }, "");

  console.log(finalStr.split("|"));
  return finalStr.split("|");
};

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
  });

  const formattedTimeStr = getFormattedTimeStr();
  return { data, formattedTimeStr };
};

export const createNewAvailablityEvent = async (
  formData: ScheduleFormValues
) => {
  try {
    const session = await getUserSession();
    const { eventName, schedule, isDefault } = formData;

    // const event = await prisma.$transaction(async (tx) => {
    //   // Create a event
    //   const createdEvent = await tx.availabilitySchedule.create({
    //     data: {
    //       eventName,
    //       isDefault,
    //     },
    //   });

    //   // Create schedule for created event
    //   schedule.map((item) =>
    //     tx.schedule.create({
    //       data: {
    //         availabilityScheduleId: createdEvent.id,
    //         day: item.day,
    //         fromTime: item.fromTime,
    //         tillTime: item.tillTime,
    //         isActive: item.isActive,
    //       },
    //     })
    //   );

    //   return createdEvent;
    // });
    const result = await prisma.availabilitySchedule.create({
      data: {
        eventName: eventName,
        isDefault: isDefault,
        userId: session?.user?.id || null, // Handle optional user association
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

    return result;
  } catch (error) {
    throw error;
  }
};
