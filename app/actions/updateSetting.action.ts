"use server";

import { SettingSchemaType } from "@/schemas";
import { getUserSession } from "../lib/hooks";
import prisma from "../lib/db";

export const updatedSettingAction = async (formData: SettingSchemaType) => {
  try {
    const session = await getUserSession();

    const { fullName, image, about } = formData;

    await prisma.user.update({
      where: { id: session.user?.id },
      data: { name: fullName, image, about },
    });

    return true;
  } catch (error) {
    throw error;
  }
};
