"use server";

import prisma from "../lib/db";

export const getBookingDetails = async (userName: string, eventUrl: string) => {
  try {
    const data = await prisma.event.findFirst({
      where: {
        url: eventUrl,
        User: {
          username: userName,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        videoCallSoftware: true,
        User: {
          select: {
            name: true,
            email: true,
            image: true,
            availabilitySchedule: {
              where: {
                isDefault: true,
              },
              select: {
                id: true,
                eventName: true,
                schedule: {
                  select: {
                    day: true,
                    isActive: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};
