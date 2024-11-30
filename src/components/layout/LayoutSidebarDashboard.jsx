import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export default function LayoutSidebarDashboard() {
    const navigate = useNavigate();

   useEffect(() => {
       const token = localStorage.getItem("access_token");
       if (!token) {
           navigate("/login");
       }
   }, []);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Outlet />
			</SidebarInset>
			<Toaster />
		</SidebarProvider>
	);
}
