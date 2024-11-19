import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo.svg";

export default function Footer() {
	return (
		<footer className="w-full h-[480px] bg-emerald-600 flex flex-col items-center justify-between py-10 mt-[66px] relative">
			<div className="w-11/12 max-w-[1200px] flex flex-col lg:flex-row justify-between gap-10">
				<div className="flex flex-col items-start gap-4">
					<div className="flex items-center gap-4">
						<img src={Logo} alt="Logo" className="w-full h-full object-cover" />
						<span className="text-[#fdfaf1] text-lg font-medium">
							Transformasikan sampah menjadi manfaat
						</span>
					</div>
					<div className="flex gap-4"></div>
				</div>

				<div className="flex flex-col gap-5">
					<h4 className="text-[#fdfaf1] text-xl font-bold">Navigation</h4>
					<Link to="/" className="text-[#fdfaf1] text-base font-medium">
						Beranda
					</Link>
					<Link
						to="/statistik"
						className="text-[#fdfaf1] text-base font-medium"
					>
						Statistik
					</Link>
					<Link to="/prediksi" className="text-[#fdfaf1] text-base font-medium">
						Prediksi
					</Link>
					<Link to="/produk" className="text-[#fdfaf1] text-base font-medium">
						Produk
					</Link>
				</div>

				{/* Community */}
				<div className="flex flex-col gap-5">
					<h4 className="text-[#fdfaf1] text-xl font-bold">Community</h4>
					<Link
						to="/tentang-kami"
						className="text-[#fdfaf1] text-base font-medium"
					>
						Tentang Kami
					</Link>
				</div>

				{/* Social Links */}
				<div className="flex flex-col gap-5">
					<h4 className="text-[#fdfaf1] text-xl font-bold">Socials</h4>
					<a
						href="https://discord.com/"
						className="text-[#fdfaf1] text-base font-medium"
					>
						Discord
					</a>
					<a
						href="https://www.instagram.com/"
						className="text-[#fdfaf1] text-base font-medium"
					>
						Instagram
					</a>
					<a
						href="https://x.com/"
						className="text-[#fdfaf1] text-base font-medium"
					>
						Twitter
					</a>
					<a
						href="https://www.facebook.com/"
						className="text-[#fdfaf1] text-base font-medium"
					>
						Facebook
					</a>
				</div>
			</div>

			<div className="w-11/12 border-t-2 border-[#fdfaf1]" />

			{/* Bottom Section */}
			<div className="w-11/12 max-w-[1200px] flex flex-col lg:flex-row items-center justify-between gap-4">
				<div className="text-[#fdfaf1] text-base font-medium">
					©2024 ErsTalent. All rights reserved
				</div>
				<div className="flex gap-4">
					<Link
						to="/privacy-policy"
						className="text-[#fdfaf1] text-base font-medium"
					>
						Privacy & Policy
					</Link>
					<Link
						to="/terms-condition"
						className="text-[#fdfaf1] text-base font-medium"
					>
						Terms & Condition
					</Link>
				</div>
			</div>
		</footer>
	);
}
