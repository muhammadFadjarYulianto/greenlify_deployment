import { BadgeCheck, Bell, LogOut, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { CaretSortIcon, ComponentPlaceholderIcon } from "@radix-ui/react-icons";
import React from "react";
import { Typography } from "@/components/ui/Typography";
import { useNavigate } from "react-router-dom";
import AuthServices from "@/services/auth";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const { isMobile } = useSidebar();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await AuthServices.logout();
			navigate("/");
		} catch (error) {
			console.error("Gagal logout:", error);
			alert("Gagal logout. Silakan coba lagi.");
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-10 w-10 rounded-lg">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg bg-emerald-500">
									Ad
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left">
								<Typography variant="p-semibold">{user.name}</Typography>
								<Typography variant="small">{user.email}</Typography>
							</div>
							<CaretSortIcon className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-emerald-500 text-white"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="rounded-lg bg-emerald-100">
										CN
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left">
									<Typography variant="p-semibold" className="text-white">
										{user.name}
									</Typography>
									<Typography variant="small" className="text-white">
										{user.email}
									</Typography>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut />
							<Typography variant="p-regular" className="text-white">
								Log Out
							</Typography>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
