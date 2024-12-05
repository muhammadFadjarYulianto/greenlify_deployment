import {LogOut} from "lucide-react";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
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
import {CaretSortIcon} from "@radix-ui/react-icons";
import React from "react";
import {Typography} from "@/components/ui/Typography";
import {useNavigate} from "react-router-dom";
import {getAdmin} from "@/services/admin";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

export function NavUser({user}) {
    const {isMobile} = useSidebar();
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchAdmin = async () => {
            const response = await getAdmin();
            setName(response.name);
            setEmail(response.email);
        };
        fetchAdmin();
    }, []);

    const handleLogout = async () => {
        try {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setIsDeleteModalOpen(false);
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
                            <Avatar className="h-10 w-10 rounded-full">
                                <AvatarImage src={user.avatar} alt={name}/>
                                <AvatarFallback className="rounded-lg bg-emerald-500 text-background">
                                    A
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left">
                                <Typography variant="p-semibold">{name}</Typography>
                                <Typography variant="small">{email}</Typography>
                            </div>
                            <CaretSortIcon className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-emerald-500 text-background"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)} className="cursor-pointer">
                            <LogOut/>
                            <Typography variant="p-regular" className="text-background">
                                Keluar
                            </Typography>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent>
                        <DialogHeader className="space-y-4">
                            <DialogTitle className="text-left text-[30px] font-bold leading-[36px]">
                                Keluar dari Akun
                            </DialogTitle>
                            <Typography variant="p-regular" className="text-left max-w-lg text-slate-500">
                                Apakah Anda yakin ingin keluar dari akun? Anda akan diarahkan ke halaman Beranda.
                            </Typography>
                        </DialogHeader>
                        <div className="flex justify-end gap-4">
                            <Button
                                variant="secondary"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    handleLogout();
                                    setIsDeleteModalOpen(false);
                                }}
                            >
                                Kaluar
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
