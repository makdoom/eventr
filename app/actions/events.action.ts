"use server";

import { EventFormValues } from "@/schemas";
import prisma from "../lib/db";
import { getUserSession } from "../lib/hooks";
import { revalidatePath } from "next/cache";

export const getUserEvents = async () => {
  try {
    const session = await getUserSession();
    const userWithEvents = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
      select: {
        username: true,
        email: true,
        events: {
          select: {
            id: true,
            title: true,
            url: true,
            description: true,
            isActive: true,
            duration: true,
          },
        },
      },
    });

    return userWithEvents;
  } catch (error) {
    console.log(error);
  }
};

export const createNewEvent = async (data: EventFormValues) => {
  try {
    const session = await getUserSession();

    await prisma.event.create({
      data: {
        ...data,
        userId: session.user?.id,
      },
    });
  } catch (error) {
    throw error;
  }

  revalidatePath("/dashboard");
};
