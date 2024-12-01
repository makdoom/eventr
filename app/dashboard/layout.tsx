import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import AppSidebar from "../components/AppSidebar";
import { getUserSession } from "../lib/hooks";
import prisma from "../lib/db";
import { redirect } from "next/navigation";

const checkForUsername = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true, grantId: true },
  });
  if (!data?.username) return redirect("/onboarding");
  if (!data?.grantId) return redirect("/onboarding/grant-permission");

  return data;
};

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getUserSession();

  await checkForUsername(session.user?.id as string);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default DashboardLayout;
