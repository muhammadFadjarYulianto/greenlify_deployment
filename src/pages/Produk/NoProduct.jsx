import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NoProduct() {
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center gap-[33px]">
			<div className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 max-w-screen-md mx-auto">
				<Typography
					variant="title"
					className="text-center text-6xl md:text-6xl lg:text-8xl"
				>
					Oops!
				</Typography>
				<Typography
					variant="title"
					className="text-center text-4xl md:text-4xl lg:text-6xl text-emerald-600"
				>
					Produk Tidak Ditemukan
				</Typography>
				<Typography
					variant="p"
					className="text-base md:text-lg text-center text-slate-600 max-w-xl px-4 md:px-0 leading-relaxed"
				>
					Maaf, produk yang Anda cari tidak tersedia saat ini. Silakan coba cari
					produk lain atau kembali ke halaman produk.
					<br className="hidden md:block" />
					Terima kasih.
				</Typography>
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto px-4 sm:px-0">
					<Button
						variant="primary"
						size="lg"
						className="w-full sm:w-auto min-w-[200px] text-base"
					>
						<Link
							to="/produk"
							className="w-full h-full flex items-center justify-center"
						>
							Cari Produk Lain
						</Link>
					</Button>

					<Button
						variant="outline"
						size="lg"
						className="w-full sm:w-auto min-w-[200px] text-base"
					>
						<Link
							to="/"
							className="w-full h-full flex items-center justify-center"
						>
							Kembali ke Beranda
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
