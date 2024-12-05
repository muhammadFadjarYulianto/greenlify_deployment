import * as React from "react";
import {
	Bot,
	Settings2,
	LayoutDashboardIcon,
	StoreIcon,
	TableOfContents,
	Tags,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
// @ts-ignore
import Logo from "@/assets/logo/logo.svg";
import { Link } from "react-router-dom";

const data = {
	user: {
		name: "Admin",
		email: "Admin@gmail.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboardIcon,
			isActive: true,
		},
		{
			title: "Manajemen AI",
			url: "#",
			icon: Bot,
		},
		{
			title: "Manajemen Category",
			url: "/dashboard/category",
			icon: Tags,
		},
		{
			title: "Manajemen Produk",
			url: "/dashboard/produk",
			icon: StoreIcon,
		},
		{
			title: "Manajemen Konten",
			url: "#",
			icon: TableOfContents,
		},
		// {
		// 	title: "Settings",
		// 	url: "#",
		// 	icon: Settings2,
		// 	items: [
		// 		{
		// 			title: "Profil Admin",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Keamanan",
		// 			url: "#",
		// 		},
		// 		{
		// 			title: "Backup Data",
		// 			url: "#",
		// 		},
		// 	],
		// },
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="mt-5">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/">
								<div className="grid flex-1 justify-center">
									<img src={Logo} alt="Logo" className="h-18 w-18" />
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
