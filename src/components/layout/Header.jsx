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
		<div className="w-full h-[75px] px-[65px] bg-[#fdfaf1] border-b border-slate-300 justify-between items-center inline-flex">
			<div className="flex items-center gap-2.5">
				<Link to="/">
					<img src={Logo} alt="Logo" className="h-10" />
				</Link>
			</div>
			<NavigationMenu className="hidden md:block">
				<NavigationMenuList>
					{["Beranda", "Statistik", "Prediksi", "Produk", "Tentang Kami"].map(
						(item) => (
							<NavigationMenuItem key={item}>
								<Link
									to={`/${item.toLowerCase().replace(" ", "")}`}
									className="px-7 py-2 text-[#1b4332] text-base font-semibold font-roboto hover:bg-[#e9f5ee] rounded-md"
								>
									{item}
								</Link>
							</NavigationMenuItem>
						),
					)}
				</NavigationMenuList>
			</NavigationMenu>
			<Button className="h-10 px-4 py-2 bg-[#40916c] text-white text-sm font-medium font-inter hover:bg-[#347a57]">
				Klasifikasi
			</Button>
		</div>
	);
}
