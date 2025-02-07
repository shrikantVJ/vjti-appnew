import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <div>
          <AdminSidebar />
        </div>
        <div className=" w-full">
            <AdminNavbar />
            {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default layout;
