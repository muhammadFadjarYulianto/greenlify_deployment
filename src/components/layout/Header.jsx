import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo/logo.svg";
import { X, Menu } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const menuItems = [
		{ label: "Beranda", path: "beranda" },
		{ label: "Statistik", path: "statistik" },
		{ label: "Prediksi", path: "prediksi" },
		{ label: "Produk", path: "produk" },
		{ label: "Tentang Kami", path: "tentangkami" },
	];

	return (
		<div className="relative">
			<div className="w-full h-[75px] px-4 md:px-[65px] border-b border-slate-300 flex justify-between items-center">
				<Link to="/">
					<img src={Logo} alt="Logo" className="h-11" />
				</Link>

				<NavigationMenu className="hidden md:block">
					<NavigationMenuList className="justify-between gap-10">
						{menuItems.map(({ label, path }) => (
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
					<div className="hidden md:flex gap-4">
						<Button size="lg" asChild>
							<Link to="/klasifikasi">Klasifikasi</Link>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<Link to="/login">Login</Link>
						</Button>
					</div>

					<Button
						onClick={() => setIsMobileMenuOpen(true)}
						className="md:hidden p-2 bg-emerald-500 text-white"
					>
						<Menu />
					</Button>
				</div>
			</div>
			{isMobileMenuOpen && (
				<div className="fixed inset-0 z-50 md:hidden bg-background p-4">
					<div className="flex flex-col space-y-4">
						<div className="flex justify-between items-center">
							<Link to="/">
								<img src={Logo} alt="Logo" className="h-11" />
							</Link>
							<Button
								onClick={() => setIsMobileMenuOpen(false)}
								className="p-2"
							>
								<X />
							</Button>
						</div>
						{menuItems.map(({ label, path }) => (
							<Link
								key={label}
								to={`/${path}`}
								onClick={() => setIsMobileMenuOpen(false)}
								className="text-emerald-700 font-semibold text-xl py-2 rounded"
							>
								{label}
							</Link>
						))}
						<Button size="lg" asChild>
							<Link to="/klasifikasi">Klasifikasi</Link>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<Link to="/login">Login</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
