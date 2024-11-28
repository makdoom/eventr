import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SidebarLinks from "./SidebarLinks";

const AppSidebar = () => {
  return (
    <Sidebar className="bg-red-500">
      <SidebarHeader className="p-4">
        <h2 className="font-bold text-2xl tracking-normal text-center">
          Even<span className="text-primary">tr</span>
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarLinks />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default AppSidebar;
