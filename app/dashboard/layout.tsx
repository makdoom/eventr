import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import AppSidebar from "../components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../components/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "../lib/auth";
import { LogOut, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { getUserSession } from "../lib/hooks";
import prisma from "../lib/db";
import { redirect } from "next/navigation";

const checkForUsername = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  });
  if (!data?.username) return redirect("/onboarding");

  return data;
};

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getUserSession();

  await checkForUsername(session.user?.id as string);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <h1 className="font-medium text-lg">Hey Makdoom Welcome Back 👋</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-lg" size="icon" variant="secondary">
                  <Avatar className="rounded-lg">
                    <AvatarImage
                      className="rounded-lg"
                      src={session?.user?.image as string}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Avatar className="rounded-lg">
                    <AvatarImage
                      className="rounded-lg size-10"
                      src={session?.user?.image as string}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>{session?.user?.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      {session?.user?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <Separator />
                <DropdownMenuItem className="mt-2 cursor-pointer">
                  <UserRound />
                  <span>My Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer text-red-400 font-medium hover:!text-red-500"
                >
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button className="w-full flex items-center gap-2">
                      <LogOut />
                      <span>Logout</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default DashboardLayout;
