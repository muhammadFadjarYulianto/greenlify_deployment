import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/images/logo.svg";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
} from "@/components/ui/navigation-menu";

export default function Header() {
	return (
		<div className="w-full h-[75px] px-[65px] border-b border-slate-300 justify-between items-center inline-flex">
			<div className="flex items-center gap-2.5">
				<Link to="/">
					<img src={Logo} alt="Logo" className="h-11" />
				</Link>
			</div>

			<div className="hidden md:flex items-center gap-4">
				<NavigationMenu className="hidden md:block">
					<NavigationMenuList>
						{["Beranda", "Statistik", "Prediksi", "Produk", "Tentang Kami"].map(
							(item) => (
								<NavigationMenuItem key={item}>
									<Link
										to={`/${item.toLowerCase().replace(" ", "")}`}
										className="px-10 py-2 text-emerald-700 font-semibold hover:text-emerald-800"
									>
										{item}
									</Link>
								</NavigationMenuItem>
							),
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			<div className="flex items-center gap-4">
				<Button size="lg">Klasifikasi</Button>
				<div className="md:hidden">
					<Button className="p-2 bg-emerald-500 text-white">
						<svg
							aria-label="Toggle Menu"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<title>Toggle Menu</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</Button>
				</div>
			</div>
		</div>
	);
}
