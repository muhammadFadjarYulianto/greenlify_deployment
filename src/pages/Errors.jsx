import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ErrorImg from "@/assets/images/404.svg";

export default function Errors() {
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center gap-[33px]">
			<div className="flex flex-col items-center justify-center gap-2 md:gap-2 lg:gap-4 max-w-screen-md mx-auto">
				<img
					src={ErrorImg}
					alt="404"
					className="w-80 md:w-[500px] md:h-[500px] object-cover"
				/>
				<Typography
					variant="title"
					className="text-center text-4xl md:text-4xl lg:text-6xl text-emerald-600"
				>
					Halaman Tidak Ditemukan!
				</Typography>
				<Typography
					variant="p"
					className="text-base md:text-lg text-center text-slate-600 max-w-xl px-4 md:px-0 leading-relaxed"
				>
					Maaf, halaman yang Anda cari tidak tersedia saat ini. Silakan coba
					kembali ke halaman beranda.
				</Typography>
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto px-4 sm:px-0">
					<Button
						variant="primary"
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
