import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import homeImg from "@/assets/images/home-image.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";
import { Upload, ScanLine, MessageSquareMore } from "lucide-react";

const steps = [
	{
		id: 1,
		title: "Pilih Foto Sampah",
		description:
			"Pilih foto sampah Anda yang ingin digunakan untuk diunggah dan diklasifikasi.",
		icon: <ImagePlus size={34} className="text-white" />,
	},
	{
		id: 2,
		title: "Unggah Foto Sampah",
		description:
			"Unggah foto sampah Anda untuk mendapatkan informasi lebih lanjut dan klasifikasi yang tepat.",
		icon: <Upload size={34} className="text-white" />,
	},
	{
		id: 3,
		title: "Deteksi Sampah",
		description:
			"Setelah diunggah, sistem akan langsung menganalisis dan memberikan hasil klasifikasi dengan cepat.",
		icon: <ScanLine size={34} className="text-white" />,
	},
	{
		id: 4,
		title: "Saran Pengelolaan",
		description:
			"Setelah jenis sampah terdeteksi, Anda akan menerima saran pengelolaan yang sesuai, seperti cara mendaur ulang atau mengolah sampah.",
		icon: <MessageSquareMore size={34} className="text-white" />,
	},
];

const benefits = [
	{
		id: 1,
		title: "Mendukung pengelolaan sampah yang berkelanjutan",
		description:
			"Dengan klasifikasi sampah yang tepat, kita dapat mengurangi dampak negatif sampah terhadap lingkungan, mengoptimalkan daur ulang, dan memastikan sampah dikelola dengan cara yang lebih ramah lingkungan",
		badge: "Advantages #1",
		image: "https://via.placeholder.com/894x596",
	},
	{
		id: 2,
		title: "Inovasi dalam pengelolaan sampah modern",
		description:
			"Kami berkomitmen untuk menciptakan solusi inovatif yang ramah lingkungan, efisien, dan didukung teknologi terkini, untuk memastikan pengelolaan sampah yang lebih baik dan berkelanjutan demi masa depan yang lebih hijau.",
		badge: "Advantages #2",
		image: "https://via.placeholder.com/1166x777",
	},
];

const Home = () => {
	return (
		<main>
			<div className="w-full mt-[66px] h-auto flex flex-col items-center gap-[33px]">
				<div className="w-full flex flex-col lg:flex-row justify-around items-center px-4 sm:px-8 md:px-[65px] gap-8 lg:gap-0">
					<div className="max-w-3xl text-center lg:text-left">
						<Typography variant="title">
							Transformasi <strong className="text-emerald-600">Sampah</strong>,
							Ciptakan <strong className="text-emerald-600">Manfaat</strong>
						</Typography>
					</div>
					<div className="max-w-md text-center lg:text-left">
						<Typography variant="p" type="description">
							Sistem Cerdas AI untuk Mengklasifikasi Sampah Organik dan
							Anorganik Secara Otomatis
						</Typography>
						<div className="mt-4">
							<Button variant="outline" size="lg">
								Lihat lebih banyak
							</Button>
						</div>
					</div>
				</div>
				<img
					src={homeImg}
					alt="Home"
					className="w-full mt-4 px-4 md:px-12 lg:px-24 xl:px-52"
				/>
				<div className="w-full flex flex-col-reverse lg:flex-row justify-around items-center px-4 sm:px-8 md:px-[65px] gap-8 lg:gap-0">
					<div className="max-w-3xl text-center lg:text-left">
						<Typography variant="p" type="quote">
							“ Platform kami dirancang untuk membantu masyarakat memahami
							berbagai jenis sampah dan memberikan rekomendasi pengelolaan yang
							tepat menggunakan implementasi dari machine learning. Dengan
							begitu, sampah dapat dikelola secara efektif, memberi manfaat, dan
							mendukung keberlanjutan lingkungan “
						</Typography>
					</div>
					<div className="max-w-md text-center lg:text-right">
						<Typography variant="h1">
							Sekilas{" "}
							<strong className="text-emerald-600">Pengolahan Sampah</strong>{" "}
							Modern
						</Typography>
					</div>
				</div>
			</div>
			<div className="w-full mt-[66px] h-auto flex flex-col items-center">
				<div className="text-center max-w-4xl px-4">
					<Typography variant="h1" className="">
						Pengunggahan Gambar <br /> Yang Cepat & Mudah
					</Typography>
					<Typography variant="p" className="mt-7" type="description">
						Dengan fitur unggah gambar, pengguna bisa dengan mudah mengirimkan
						foto sampah untuk diklasifikasikan. Prosesnya cepat, mudah, dan
						intuitif, sehingga siapa saja dapat melakukannya tanpa kesulitan.
					</Typography>
				</div>
				<div className="mt-12 flex flex-wrap items-center justify-around gap-y-12 px-4 sm:px-8 md:px-[65px]">
					{steps.map((step) => (
						<div
							key={step.id}
							className="flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4"
						>
							<Card className="w-full">
								<CardHeader className="flex flex-col items-center gap-[23px]">
									<Button
										variant="outline"
										className="w-20 h-20 bg-emerald-500 text-white"
									>
										{step.icon}
									</Button>
									<Typography variant="h3" className="text-emerald-600">
										{step.title}
									</Typography>
								</CardHeader>
								<CardContent>
									<Typography variant="p" type="description">
										{step.description}
									</Typography>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>
			<div className="w-full mt-[66px] h-auto flex flex-col items-center">
				<div className="text-center max-w-4xl px-4">
					<Typography variant="h1" className="">
						Deteksi Sampah <br /> Dengan Teknologi AI
					</Typography>
					<Typography variant="p" className="mt-7" type="description">
						Dengan teknologi canggih AI, sistem kami mampu mengidentifikasi
						jenis sampah secara otomatis. Ini memudahkan pengguna dalam
						mengelola sampah mereka dengan lebih efisien dan efektif.
					</Typography>
					<div className="mt-[33px] flex flex-col md:flex-row justify-center items-center gap-8 px-4 md:px-8">
						{benefits.map((benefit) => (
							<Card
								key={benefit.id}
								className="w-full sm:w-[535px] h-[420px] bg-cover bg-center rounded-xl shadow-md relative"
								style={{ backgroundImage: `url(${benefit.image})` }}
							>
								<div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl" />
								<CardContent className="relative z-10 p-6 flex flex-col gap-10">
									<Typography className="bg-emerald-500 text-white rounded-[52px] px-4 py-2 text-sm font-semibold inline-block">
										{benefit.badge}
									</Typography>
									<Typography variant="h2" className="text-white text-left">
										{benefit.title}
									</Typography>
									<Typography
										variant="p"
										type="description"
										className="text-white text-justify"
									>
										{benefit.description}
									</Typography>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
			<div
				className="w-full h-[298px] sm:h-[200px] md:h-[250px] lg:h-[298px] mt-[66px] sm:mt-[40px] md:mt-[50px] mb-[66px] sm:mb-[40px] md:mb-[50px] relative bg-cover bg-center"
				style={{
					backgroundImage: "url('https://via.placeholder.com/1090x298')",
				}}
			>
				<div className="w-full h-full absolute bg-black opacity-40" />
				<div className="w-full max-w-5xl absolute text-center px-4 sm:px-6 md:px-8 lg:px-6 top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2">
					<Typography
						variant="h3"
						className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl"
					>
						Setiap sampah yang kita hasilkan adalah keputusan yang diambil dalam
						ketidaktahuan kita terhadap dampaknya. Mari beralih menjadi lebih
						bijaksana, agar bumi tetap bisa menyambut kita dengan keindahan yang
						tak ternilai.
					</Typography>
				</div>
			</div>
		</main>
	);
};

export default Home;
