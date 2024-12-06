"use server";

import { OnBoardingSchemaType } from "@/schemas";
import { redirect } from "next/navigation";
import { getUserSession } from "../lib/hooks";
import prisma from "../lib/db";

export const onboardingAction = async (formData: OnBoardingSchemaType) => {
  try {
    const session = await getUserSession();

    const { username, fullName } = formData;

    // Check if username exists
    const isUsernameExits = await prisma.user.findUnique({
      where: { username },
    });
    if (isUsernameExits) throw new Error("Username is already in use");

    await prisma.user.update({
      where: { id: session.user?.id },
      data: { username, name: fullName },
    });
  } catch (error) {
    throw error;
  }

  return redirect("/onboarding/grant-permission");
};
