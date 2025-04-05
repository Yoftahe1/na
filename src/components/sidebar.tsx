import * as React from "react";
import { Link } from "react-router-dom";
import {
  LifeBuoy,
  BookOpenText,
  Send,
  BarChart,
  SquarePen,
} from "lucide-react";

import icon from "@/assets/icon.svg";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar as ShadSideBar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Users",
      url: "/app/users",
      icon: BookOpenText,
      isActive: true,
    },
    {
      title: "Courses",
      url: "/app/course",
      icon: BarChart,
      isActive: true,
    },
    {
      title: "Requests",
      url: "/app/request",
      icon: BarChart,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

const Sidebar = ({ ...props }: React.ComponentProps<typeof ShadSideBar>) => {
  return (
    <ShadSideBar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <img src={icon} className="aspect-square size-12 " />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ኒቆዲሞስ</span>
                  <span className="truncate text-xs">የማታ ተማሪ</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
    </ShadSideBar>
  );
};

export default Sidebar;
