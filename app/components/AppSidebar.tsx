import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SidebarLinks from "./SidebarLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogOut } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { signOut } from "../lib/auth";
import { Button } from "@/components/ui/button";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="font-bold text-2xl tracking-normal text-center">
          Even<span className="text-primary">tr</span>
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col flex-1">
          <SidebarLinks />
          <div className="flex-1 flex flex-col justify-end my-3 space-y-4">
            <div className="px-2 flex items-center justify-between cursor-pointer">
              <p className="text-sm text-muted-foreground flex-1 hover:text-primary">
                Dark Mode
              </p>
              <ModeToggle />
            </div>

            <Menubar className="bg-transparent border-0 p-0 w-full items-start">
              <MenubarMenu>
                <MenubarTrigger className="p-0 bg-transparents w-full">
                  <div className="flex w-full items-center gap-2 cursor-pointer hover:bg-secondary py-2 rounded-md px-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" className="" />
                      <AvatarFallback className="">M</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-start">
                      <p className="text-xs font-medium">Makdoom Shaikh</p>
                      <p className="text-xs text-muted-foreground">
                        makshaikh99@gmail.com
                      </p>
                    </div>
                  </div>
                </MenubarTrigger>
                <MenubarContent>
                  <form
                    className="flex items-center gap-2"
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer text-red-400 font-medium hover:!text-red-500 w-full flex justify-start py-1"
                    >
                      <LogOut className="size-4" />
                      <span>Logout</span>
                    </Button>
                  </form>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default AppSidebar;
