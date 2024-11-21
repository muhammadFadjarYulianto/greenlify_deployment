import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Product from "@/components/layout/product";
import products from "@/data/product.json";
import useProductFilterStore, {
	ProductType,
	ProductMaterial,
	PriceRange,
} from "@/store/useFilterStore";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default function Products() {
	const {
		selectedProductTypes,
		setProductTypes,
		selectedPriceRanges,
		setPriceRanges,
		selectedMaterials,
		setMaterials,
	} = useProductFilterStore();

	return (
		<div>
			<Header />
			<div className="w-full mt-[66px] h-auto flex flex-col items-center gap-[33px]">
				<div className="relative w-10/12 mx-auto">
					<img
						src="https://images.pexels.com/photos/3737672/pexels-photo-3737672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
						alt="Home"
						className="w-full h-[481px] object-cover rounded-[20px]"
					/>
					<div className="absolute inset-0 bg-black opacity-40 rounded-[20px]" />
					<div className="absolute inset-0 z-10 flex items-center justify-center">
						<Typography
							variant="h1"
							className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center"
						>
							Produk Ramah Lingkungan
						</Typography>
					</div>
				</div>
				<div className="w-full h-auto flex flex-col items-center">
					<div className="text-center max-w-6xl px-4">
						<Typography
							variant="lead"
							className="mt-7 text-[16px] leading-[24px] md:text-[20px] font-normal md:leading-[28px]"
							type="description"
						>
							Produk inovatif kami dirancang untuk mendukung keberlanjutan dan
							menciptakan masa depan yang lebih hijau, dengan solusi ramah
							lingkungan yang membantu mengurangi dampak negatif terhadap bumi.
						</Typography>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 w-10/12 p-4">
					<div className="relative col-span-1 row-span-2 overflow-hidden rounded-lg">
						<img
							src="https://images.pexels.com/photos/6193131/pexels-photo-6193131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							alt="Produk Terbaru"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
							<Typography
								variant="h1"
								className="text-white text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
							>
								Produk terbaru
							</Typography>
						</div>
					</div>
					<div className="relative col-span-1 overflow-hidden rounded-lg">
						<img
							src="https://images.pexels.com/photos/3737576/pexels-photo-3737576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							alt="Keranjang Anyaman"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
							<Typography
								variant="h1"
								className="text-white text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
							>
								Keranjang Anyaman
							</Typography>
						</div>
					</div>
					<div className="relative col-span-1 overflow-hidden rounded-lg">
						<img
							src="https://images.pexels.com/photos/3737672/pexels-photo-3737672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							alt="Cangkir Kertas"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">
							<Typography
								variant="h1"
								className="text-white text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
							>
								Cangkir Kertas
							</Typography>
						</div>
					</div>
				</div>
				<div className="w-full h-auto mt-[66px] flex flex-col items-center">
					<div className="w-11/12 md:w-10/12 flex flex-col md:flex-row justify-between items-center">
						<div className="flex w-full md:w-full max-w-2xl items-center space-x-2">
							<Select
								onValueChange={(value) => {
									setProductTypes(
										selectedProductTypes.includes(value)
											? selectedProductTypes.filter((t) => t !== value)
											: [...selectedProductTypes, value],
									);
								}}
								multiple
							>
								<SelectTrigger className="w-full md:w-[260px] h-10 bg-emerald-500 text-white">
									<SelectValue
										placeholder="Tipe Produk"
										className="text-white"
									/>
								</SelectTrigger>
								<SelectContent className="bg-emerald-500 text-white">
									{Object.values(ProductType).map((type) => (
										<SelectItem
											key={type}
											value={type}
											className="text-white hover:bg-emerald-700 focus:bg-emerald-700"
										>
											{type}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select
								onValueChange={(value) => {
									setPriceRanges(
										selectedPriceRanges.includes(value)
											? selectedPriceRanges.filter((r) => r !== value)
											: [...selectedPriceRanges, value],
									);
								}}
								multiple
							>
								<SelectTrigger className="w-full md:w-[180px] h-10 bg-emerald-500 text-white">
									<SelectValue
										placeholder="Rentang Harga"
										className="text-white"
									/>
								</SelectTrigger>
								<SelectContent className="bg-emerald-500 text-white">
									{Object.values(PriceRange).map((range) => (
										<SelectItem
											key={range}
											value={range}
											className="text-white hover:bg-emerald-700 focus:bg-emerald-700"
										>
											{range}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select
								onValueChange={(value) => {
									setMaterials(
										selectedMaterials.includes(value)
											? selectedMaterials.filter((m) => m !== value)
											: [...selectedMaterials, value],
									);
								}}
								multiple
							>
								<SelectTrigger className="w-full md:w-[180px] h-10 bg-emerald-500 text-white">
									<SelectValue placeholder="Material" className="text-white" />
								</SelectTrigger>
								<SelectContent className="bg-emerald-500 text-white">
									{Object.values(ProductMaterial).map((material) => (
										<SelectItem
											key={material}
											value={material}
											className="text-white hover:bg-emerald-600 focus:bg-emerald-600"
										>
											{material}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex w-full md:w-full max-w-2xl items-center space-x-2 mt-4 md:mt-0">
							<Input
								type="text"
								placeholder="Masukan produk yang dicari ..."
								className="h-10 text-emerald-600 border-2 border-emerald-500 w-full"
							/>
							<Button variant="primary">Cari</Button>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-10/12 mt-[33px]">
					{products.map((product) => (
						<Product
							key={product.id}
							image={product.image}
							price={product.price}
							title={product.title}
							rating={product.rating}
							description={product.description}
						/>
					))}
				</div>
				<div className="w-10/12 mt-8 sm:mt-[33px]">
					<Pagination className="gap-5 flex flex-wrap justify-center">
						<PaginationPrevious className="order-1 sm:order-none">
							<PaginationLink>Previous</PaginationLink>
						</PaginationPrevious>
						<PaginationContent className="order-3 sm:order-none hidden sm:flex">
							<PaginationItem className="sm:mx-1">
								<PaginationLink isActive>1</PaginationLink>
							</PaginationItem>
							<PaginationItem className="sm:mx-1">
								<PaginationLink>2</PaginationLink>
							</PaginationItem>
							<PaginationItem className="sm:mx-1">
								<PaginationLink>3</PaginationLink>
							</PaginationItem>
							<PaginationItem className="sm:mx-1">
								<PaginationLink>4</PaginationLink>
							</PaginationItem>
							<PaginationItem className="sm:mx-1">
								<PaginationLink>5</PaginationLink>
							</PaginationItem>
						</PaginationContent>
						<PaginationNext className="order-2 sm:order-none">
							<PaginationLink>Next</PaginationLink>
						</PaginationNext>
					</Pagination>
				</div>
			</div>
			<Footer />
		</div>
	);
}
