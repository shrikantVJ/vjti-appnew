
import React from "react";

import {
  Settings,
  Database,
  FolderKanban,
  ChartArea,
  Building2,
  MessageSquare,
  Users
} from "lucide-react";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";




const companyNav = [
  { name: "Dashboard", Icon: ChartArea, link: "/admin" },
  { name: "Departments", Icon: FolderKanban, link: "/admin/departments" },
  { name: "Video Meet", Icon: Database, link: "/admin/video-meet" },
  { name: "Discussion", Icon: MessageSquare, link: "/admin/discussion" },
  { name: "Employee DB", Icon: Users, link: "/admin/employee" },
  { name: "Settings", Icon: Settings, link: "/admin/settings" },
];

const AdminSidebar = async () => {

  return (
    <Sidebar>
      <SidebarHeader className="px-5 border-b py-2">
        <div>
          <div className="flex gap-3">
            <h1 className="text-lg font-semibold">
              blue<span className="text-blue-700">Circle</span>.
            </h1>
          </div>
          <p className="text-sm text-slate-500">for organization</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Company</SidebarGroupLabel>
          <SidebarGroupContent className="p-3 flex gap-3 text-sm rounded-lg font-medium bg-blue-100">
            <Building2 size={18} />
            <h2>Slash Ritesh</h2>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">
            Applications
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {companyNav.map((data, index) => {
                return <SingleSideBtn data={data} key={index} />;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
       
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;


const SingleSideBtn = ({ data }) => {
  const { Icon, name, link } = data;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <div>
          <Icon />
          <Link className="text-sm font-medium" href={link}>
            {name}
          </Link>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
