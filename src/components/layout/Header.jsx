import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import Logo from "@/assets/logo/logo.svg";
import {X, Menu, User, LogOut} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Typography} from "@/components/ui/Typography";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const menuItems = [
        {label: "Beranda", path: "beranda"},
        {label: "Statistik", path: "statistik"},
        {label: "Prediksi", path: "prediksi"},
        {label: "Produk", path: "produk"},
        {label: "Tentang Kami", path: "tentangkami"},
    ];

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        const userEmail = localStorage.getItem("user_email");

        if (accessToken) {
            setIsLoggedIn(true);
            setUserEmail(userEmail || "");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_email");

        setIsLoggedIn(false);
        setUserEmail("");

        window.location.href = "/login";
    };

    const renderMobileAuthOptions = () => {
        if (isLoggedIn) {
            return (
                <>
                    <Button size="md" className="w-full" onClick={() => window.location.href = "/dashboard"}>
                        <User className="mr-2 h-4 w-4"/>
                        Dashboard
                    </Button>
                    <Button variant="destructive" size="md" className="w-full mt-4" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4"/>
                        Logout
                    </Button>
                </>
            );
        }
        return (
            <Button variant="outline" size="md" asChild className="w-full">
                <Link to="/login">Login</Link>
            </Button>
        );
    };

    const renderDesktopAuthButton = () => {
        if (isLoggedIn) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer bg-emerald-500 text-white">
                            <AvatarImage src="" alt="User avatar"/>
                            <AvatarFallback>
                                {userEmail ? userEmail.charAt(0).toUpperCase() : <User/>}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end" sideOffset={8} className="bg-emerald-500 text-white">
                        <DropdownMenuLabel
                            className="text-[16px] font-semibold leading-[28px]">{userEmail}</DropdownMenuLabel>
                        <DropdownMenuSeparator className="border"/>
                        <DropdownMenuLabel className="text-[16px] font-semibold leading-[28px]">Menu</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = "/dashboard"}>
                            <User className="mr-2 h-6 w-6"/>
                            <Typography variant="p-semibold" className="text-white">Dashboard</Typography>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClickCapture={handleLogout} className="cursor-pointer">
                            <LogOut className="mr-2 h-6 w-6"/>
                            <Typography variant="p-semibold" className="text-white">Logout</Typography>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
        return (
            <Button variant="outline" size="md" asChild>
                <Link to="/login">Login</Link>
            </Button>
        );
    };

    return (
        <div className="relative">
            <div
                className="w-full h-[75px] px-4 md:px-[65px] border-b border-slate-300 flex justify-between items-center">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="h-11"/>
                </Link>

                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList className="justify-between gap-10">
                        {menuItems.map(({label, path}) => (
                            <NavigationMenuItem key={label}>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <Link to={`/${path}`}>{label}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-4 items-center">
                        <Button size="md" asChild>
                            <Link to="/klasifikasi">Klasifikasi</Link>
                        </Button>
                        {renderDesktopAuthButton()}
                    </div>

                    <Button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 bg-emerald-500 text-white">
                        <Menu/>
                    </Button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden bg-background p-4">
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                            <Link to="/">
                                <img src={Logo} alt="Logo" className="h-11"/>
                            </Link>
                            <Button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                                <X/>
                            </Button>
                        </div>

                        {menuItems.map(({label, path}) => (
                            <Link
                                key={label}
                                to={`/${path}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-emerald-700 font-semibold text-xl py-2 rounded"
                            >
                                {label}
                            </Link>
                        ))}

                        <Button size="md" asChild>
                            <Link to="/klasifikasi">Klasifikasi</Link>
                        </Button>

                        {renderMobileAuthOptions()}
                    </div>
                </div>
            )}
        </div>
    );
}
