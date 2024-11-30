import prisma from "@/app/lib/db";
import { getUserSession } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await getUserSession();

  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("No authorization code returned from Nylas", {
      status: 400,
    });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      code,
      redirectUri: nylasConfig.redirectUri,
    });
    const { grantId, email } = response;

    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { grantId, grantEmail: email },
    });
  } catch (error) {
    console.log("Something went wrong while exchnage", error);
  }

  return redirect("/");
};
