import React, {useState, useRef, useCallback, useEffect} from "react";
import UploadIcon from "../assets/images/upload-cloud.svg";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {gsap} from "gsap";
gsap.registerPlugin(ScrollTrigger);
import Kaca from "../assets/images/kaca.png";
import Kardus from "../assets/images/kardus.png";
import Kertas from "../assets/images/kertas.png";
import Metal from "../assets/images/metal.png";
import Organik from "../assets/images/organik.png";
import Plastik from "../assets/images/plastik.png";
import CloseIcon from "../assets/images/x-square.svg";
import Craft from "../assets/images/craft.png";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const CardSampah = [
	{
		id: 1,
		img: Kardus,
		heading: "Kardus atau Cardboard",
		subHeading: "Kertas dengan bahan tebal",
	},
	{
		id: 2,
		img: Kaca,
		heading: "Kaca",
		subHeading: "Sampah berbahan dasar kaca",
	},
	{
		id: 3,
		img: Metal,
		heading: "Metal",
		subHeading: "Sampah berbahan metal seperti kaleng",
	},
	{
		id: 4,
		img: Kertas,
		heading: "Kertas",
		subHeading: "Majalah, koran bekas, kertas bekas",
	},
	{
		id: 5,
		img: Plastik,
		heading: "Plastik",
		subHeading: "Sampah berbahan dasar plastik",
	},
	{
		id: 6,
		img: Organik,
		heading: "Organik",
		subHeading: "Sisa-sisa makanan, sampah dapur",
	},
];

const Prediction = () => {
	const heroSectionRef = React.useRef(null);
	const classtificationRef = useRef([]);
	const [imagePreview, setImagePreview] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isPrediction, setIsPrediction] = useState(false); //test tampilan

	const webcamRef = useRef(null);
	const [imgSrc, setImgSrc] = useState(null);

	// create a capture function
	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		// console.log(imageSrc);
		setImgSrc(imageSrc);
	}, []);

	// Fungsi untuk menangani perubahan file
	const handleFileChange = (event) => {
		const file = event.target.files[0]; // Ambil file pertama yang dipilih
		if (file) {
			// Cek apakah file yang dipilih adalah gambar
			if (file.size > 2 * 1024 * 1024) {
				setIsError(true); // Set error jika ukuran file lebih dari 2MB
				setImagePreview(null); // Reset preview image jika terjadi error
				return; // Stop pengkondisian
			}
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result); // Simpan URL gambar untuk preview
			};
			reader.readAsDataURL(file); // Baca file sebagai data URL
			// console.log(file.size);
		}
	};

	useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: heroSectionRef.current,
                start: "top 80%",
                end: "bottom top",
                toggleActions: "play none none none",
            },
        })
            .fromTo(
                ".hero-title",
                {opacity: 0, x: 50},
                {opacity: 1, x: 0, duration: 0.8, ease: "power2.out"}
            )
            .fromTo(
                ".hero-description",
                {opacity: 0, y: 50},
                {opacity: 1, y: 0, duration: 0.8, ease: "power2.out"},
                "-=0.4"
            )

		classtificationRef.current.forEach((step, index) => {
            gsap.fromTo(
                step,
                {opacity: 0, x: 100},
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.0,
                    delay: index * 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: step,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    });

	return (
		<main>
			{/* Title */}
			<div className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px]">
				<div className="max-w-3x1 text-center lg:text-center">
					<Typography variant="title" className="hero-title">
						<strong className="text-emerald-700">Prediksi</strong> Sampah
					</Typography>
				</div>
				<div className="max-w-4xl text-center lg:text-center">
					<Typography variant="p" className="hero-description">
						Sistem canggih kami akan menganalisis gambar dan memberikan saran
						pengelolaan sampah yang tepat, mulai dari pemilahan hingga metode
						daur ulang yang ramah lingkungan. Dengan teknologi ini, mengelola
						sampah menjadi lebih mudah dan efisien, membantu Anda berperan aktif
						dalam menjaga kebersihan dan kelestarian bumi.
					</Typography>
				</div>
			</div>
			{/* Section input gambar */}
			<div className="w-full mt-[31px] mx-auto px-16 ">
				{/* Form handle gambar */}
				<form
					action="#"
					method="POST"
					className="flex flex-col items-center space-y-5"
				>
					<Tabs
						defaultValue="upload-file"
						className=" w-full flex flex-col items-center"
					>
						<TabsList>
							<TabsTrigger value="upload-file">Unggah File Gambar</TabsTrigger>
							<TabsTrigger value="camera">Scan Menggunakan Kamera</TabsTrigger>
						</TabsList>
						{/* Upload File */}
						<TabsContent value="upload-file">
							{/* Alert Error */}
							{isError && (
								<Alert variant="destructive" className="mb-5">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>
										Ukuran file gambar anda melebihi batas maksimal 2mb
									</AlertDescription>
								</Alert>
							)}

							<div className="relative border-2 border-dashed border-emerald-500 rounded-lg p-8 flex flex-col md:flex-row items-center justify-center gap-4 bg-[#EAF0E4] transition hover:bg-[rgb(221,230,212)] w-full md:w-[1312px] min-h-[412px]">
								{/* Preview Image */}
								{imagePreview && (
									<div className="mt-4">
										<img
											src={imagePreview}
											alt="Preview"
											className="max-w-32 md:max-w-40 rounded-lg"
										/>
									</div>
								)}
								<div className="flex flex-col items-center justify-center">
									<div className="text-emerald-500 text-xl">
										<img src={UploadIcon} alt="Upload Icon" />
									</div>
									<p className="text-center text-emerald-600 mt-4">
										Klik untuk <span className="font-semibold">upload</span>{" "}
										atau drag and drop
									</p>
									<p className="text-center text-sm text-emerald-600 mt-1">
										.jpg, .png MAX(100px x 100px)
									</p>

									{/* Input File */}
									<input
										type="file"
										accept="image/*" // Batasi hanya file gambar
										onChange={handleFileChange}
										className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
									/>
								</div>
							</div>
						</TabsContent>
						{/* Camera */}
						<TabsContent value="camera">
							<div className="relative border-2 border-dashed border-emerald-500 rounded-lg p-8 flex flex-col md:flex-row items-center justify-center gap-4 bg-[#EAF0E4] transition hover:bg-[rgb(221,230,212)] w-5xl w-full md:w-[1312px] ">
								<div className="h-full">
									{imgSrc ? (
										<img src={imgSrc} alt="webcam" />
									) : (
										<>
											<Webcam
												ref={webcamRef}
												className="h-full rounded-md"
												screenshotFormat="image/jpeg"
												screenshotQuality={0.8}
												videoConstraints={{
													facingMode: "environment",
												}}
											/>
											<div className="flex justify-center mt-2">
												<Button
													variant="outline"
													onClick={capture}
													type="button"
												>
													Capture Photo
												</Button>
											</div>
										</>
									)}
								</div>
							</div>
						</TabsContent>
					</Tabs>
					<Button size="md" className="max-w-fit px-8 " type="submit">
						Prediksi
					</Button>
				</form>
			</div>

			{/* Hasil prediksi */}
			{isPrediction && (
				<div className="max-w-[1512px] flex flex-col gap-8 mx-auto px-8 md:px-12 lg:px-16 mt-10 md:mt-14 lg:mt-16">
					{/* title prediksi */}
					<div className="text-center">
						<div>
							<Typography variant="h1">
								<strong className="text-emerald-600">
									Hasil Prediksi
								</strong>{" "}
							</Typography>
						</div>
						<div>
							<Typography variant="p">
								Dari file yang anda unggah, berikut adalah hasil prediksi yang
								sistem kami lakukan
							</Typography>
						</div>
					</div>
					{/* Deskripsi hasil prediksi */}
					<div className="grid grid-cols-1 md:grid-cols-2 bg-[#EAF0E4] border border-emerald-500 rounded-md p-4 md:p-6 lg:p-10 gap-4 md:gap-6 lg:gap-8">
						{/* Gambar kiri */}
						<div className="">
							<img
								src={Kardus}
								alt="sampah-kardus"
								className="w-full rounded-md"
							/>
						</div>
						{/* Penjelasan Deskripsi */}
						<div className="flex flex-col gap-4">
							<Typography
								variant="h4"
								className="w-full rounded-full bg-emerald-600 text-white text-center py-2"
							>
								{" "}
								Kardus{" "}
							</Typography>
							<div className="flex flex-col gap-1 items-center md:items-start">
								<Typography
									variant="lead"
									className="font-bold text-emerald-600"
								>
									Kategori :
								</Typography>
								<Typography
									variant="small"
									className="px-6 py-2 text-emerald-600 border border-emerald-600 rounded-full max-w-fit"
								>
									{" "}
									Anorganik{" "}
								</Typography>
							</div>
							<div>
								<Typography
									variant="lead"
									className="font-bold text-emerald-600"
								>
									Cara Pengolahan :{" "}
								</Typography>
								<ul className="list-decimal pl-6 text-justify">
									<li className="text-emerald-600">
										Upcycling: Limbah kertas dihancurkan dengan air hingga
										menjadi pulp, lalu ditekan dan dikeringkan untuk
										menghasilkan kertas baru untuk kartu ucapan, amplop, atau
										buku kecil handmade.
									</li>
									<li className="text-emerald-600">
										Quilling: Gulung strip kertas berwarna menjadi bentuk-bentuk
										dekoratif seperti bunga, hewan, atau pola abstrak untuk
										kartu ucapan, bingkai, atau hiasan..
									</li>
									<li className="text-emerald-600">
										Kerajinan Fungsional: Membuat tas belanja atau bungkus
										hadiah dari koran yang dilipat, Kertas yang dilipat atau
										dipotong menciptakan pola bayangan yang menarik cocok untuk
										membuat kap lampu gantung, meja, atau lantai
									</li>
								</ul>
							</div>
							<div>
								{/* Modal Box */}
								<AlertDialog>
									<AlertDialogTrigger asChild>
										{/* trigger modal */}
										<Typography
											variant="p"
											className="text-right italic font-bold text-emerald-600 cursor-pointer"
										>
											{" "}
											Lihat lebih banyak...{" "}
										</Typography>
									</AlertDialogTrigger>
									{/* Deskripsi Modal */}
									<AlertDialogContent className="overflow-y-auto max-h-[90vh] p-4">
										{/* header modal */}
										<AlertDialogTitle className="text-emerald-600 flex justify-between items-center">
											<Typography
												variant="p"
												className="font-bold text-emerald-600 cursor-pointer"
											>
												Detail Informasi
											</Typography>
											<AlertDialogCancel className="p-0 border-0 transition hover:bg-transparent">
												<img src={CloseIcon} alt="" className="" />
											</AlertDialogCancel>
										</AlertDialogTitle>
										{/* body modal */}
										<AlertDialogDescription className="grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-6 lg:gap-8">
											{/* gambar */}
											<div className="">
												<img
													src={Kardus}
													alt="sampah-kardus"
													className="w-full rounded-md"
												/>
											</div>
											{/* deskripsi */}
											<div className="flex flex-col gap-3">
												<Typography
													variant="h4"
													className="w-full rounded-full bg-emerald-600 text-white text-center py-2"
												>
													{" "}
													Kardus{" "}
												</Typography>
												<div className="flex gap-4">
													<Typography
														variant="lead"
														className="font-bold text-emerald-600"
													>
														Kategori :
													</Typography>
													<Typography
														variant="small"
														className="px-6 py-1.5 text-emerald-600 border border-emerald-600 rounded-full max-w-fit"
													>
														{" "}
														Anorganik{" "}
													</Typography>
												</div>
												<div className="flex gap-4 items-center">
													<Typography
														variant="lead"
														className="font-bold text-emerald-600"
													>
														Masa Lama :
													</Typography>
													<Typography
														variant="small"
														className="text-emerald-600"
													>
														1 Minggu
													</Typography>
												</div>
												<div className="flex gap-4 items-center">
													<Typography
														variant="lead"
														className="font-bold text-emerald-600"
													>
														Tingkat bahaya :
													</Typography>
													<Typography
														variant="small"
														className="text-emerald-600"
													>
														Sedang
													</Typography>
												</div>
												<div>
													<Typography
														variant="lead"
														className="font-bold text-emerald-600"
													>
														Cara Pengolahan :{" "}
													</Typography>
													<ul className="list-decimal pl-6 text-justify leading-loose">
														<li className="text-emerald-600">
															Upcycling: Limbah kertas dihancurkan dengan air
															hingga menjadi pulp, lalu ditekan dan dikeringkan
															untuk menghasilkan kertas baru untuk kartu ucapan,
															amplop, atau buku kecil handmade.
														</li>
														<li className="text-emerald-600">
															Quilling: Gulung strip kertas berwarna menjadi
															bentuk-bentuk dekoratif seperti bunga, hewan, atau
															pola abstrak untuk kartu ucapan, bingkai, atau
															hiasan..
														</li>
														<li className="text-emerald-600">
															Kerajinan Fungsional: Membuat tas belanja atau
															bungkus hadiah dari koran yang dilipat, Kertas
															yang dilipat atau dipotong menciptakan pola
															bayangan yang menarik cocok untuk membuat kap
															lampu gantung, meja, atau lantai
														</li>
													</ul>
												</div>
												<div className="w-full">
													<Typography
														variant="lead"
														className="font-bold text-emerald-600"
													>
														Produk Kerajinan :
													</Typography>
													<div
														className="max-w-xl flex gap overflow-auto gap-4"
														style={{
															scrollbarWidth: "none", // Untuk browser Firefox
															msOverflowStyle: "none", // Untuk Internet Explorer / Edge
														}}
													>
														<img src={Craft} alt="" className="rounded-md" />
														<img src={Craft} alt="" className="rounded-md" />
														<img src={Craft} alt="" className="rounded-md" />
													</div>
												</div>
											</div>
										</AlertDialogDescription>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Section kategori sampah */}
			<div className="grid grid-cols-1 md:grid-cols-12 place-items-center mx-auto max-w-[1512px] px-8 md:px-12 lg:px-16 mt-10 md:mt-14 lg:mt-16">
				{/* Title section */}
				<div className="col-span-4 text-center md:text-left place-self-start flex flex-col gap-2">
					<div>
						<Typography variant="h1" className="hero-title">
							<strong className="text-emerald-600">Kategori Sampah</strong> Yang
							Tersedia
						</Typography>
					</div>
					<div className="max-w-[300px] mx-auto md:mx-0">
						<Typography variant="p" className="hero-description">
							Jenis Sampah Yang Dapat Kami Deteksi Klasifikasi
						</Typography>
					</div>
				</div>
				{/* Container card sampah */}
				<div className="col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4 md:gap-y-8">
					{CardSampah.map((item) => (
						<figure
							key={item.id}
							ref={(el) => (classtificationRef.current[item.id] = el)}
						>
							<img
								src={item.img}
								alt={item.heading}
								className="rounded-t-md w-full shadow-md"
							/>
							<figcaption className="px-2 py-4">
								<Typography variant="lead">
									<strong className="text-emerald-600">{item.heading} </strong>
								</Typography>
								<Typography variant="p">{item.subHeading}</Typography>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</main>
	);
};

export default Prediction;
