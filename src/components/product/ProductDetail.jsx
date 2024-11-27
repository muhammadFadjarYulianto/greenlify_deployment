import React from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { Slash } from "lucide-react";
import { Star, StarHalf } from "lucide-react";
import Product from "@/components/product/Product.jsx";
import products from "@/data/product.json";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

function calculateDiscountPercentage(originalPrice, discountedPrice) {
	return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

function ProductDetail({ product }) {
	const fullStars = Math.floor(product.rating);
	const hasHalfStar = product.rating % 1 !== 0;

	return (
		<>
			<div className="flex flex-col md:flex-row items-center w-10/12 mx-auto mt-[66px]">
				<div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
					<img
						src={product.image}
						alt={product.name}
						className="max-w-full h-auto rounded-[6px]"
					/>
				</div>
				<div className="w-full md:w-1/2 md:pl-8">
					<Breadcrumb className="my-2 font-normal text-slate-600 overflow-x-auto">
						<BreadcrumbList className="flex flex-wrap">
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Beranda</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbLink href="/produk">Produk</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator>
								<Slash />
							</BreadcrumbSeparator>
							<BreadcrumbItem>
								<BreadcrumbPage>{product.category}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<Typography
						variant="h1"
						className="mb-2 text-emerald-600 text-4xl md:text-6xl"
					>
						{product.name}
					</Typography>

					<div className="mb-4 flex flex-wrap items-center gap-5">
						<Typography variant="h4" className="line-through text-gray-500">
							Rp {product.price.original.toLocaleString()}
						</Typography>
						<Typography variant="h2" className="text-slate-900">
							Rp {product.price.discounted.toLocaleString()}
						</Typography>
						<Badge className="bg-emerald-600 text-white">
							Diskon{" "}
							{calculateDiscountPercentage(
								product.price.original,
								product.price.discounted,
							)}
							%
						</Badge>
					</div>

					<div className="flex items-center mb-4">
						{[...Array(fullStars)].map((_, index) => (
							<Star
								key={index.toString()}
								size={24}
								className="mr-1"
								color="#40916C"
								fill="#40916C"
							/>
						))}
						{hasHalfStar && (
							<StarHalf
								size={24}
								className="mr-1"
								color="#40916C"
								fill="#40916C"
							/>
						)}
						<Typography variant="large" className="mr-5 text-emerald-600">
							( {product.rating} )
						</Typography>
					</div>

					<div className="mb-4">
						<Typography variant="h3" className="mb-2">
							Stok: {product.availability.stock}
						</Typography>
						<div className="flex flex-wrap gap-2">
							{product.availability.colors.map((color) => (
								<div
									key={color}
									style={{
										backgroundColor: color,
										width: "20px",
										height: "20px",
										borderRadius: "50%",
									}}
									className="inline-block"
								/>
							))}
						</div>
					</div>

					<Typography variant="p" className="mb-4 text-justify">
						{product.description}
					</Typography>

					<Button variant="primary" className="w-full md:w-auto">
						{product.cta}
					</Button>
				</div>
			</div>
			{/*<div className="flex items-center w-10/12 mx-auto mt-[66px]">*/}
			{/*    <div className="grid grid-cols-2 gap-4 p-4">*/}
			{/*        <div className="relative col-span-1 row-span-2 overflow-hidden rounded-lg">*/}
			{/*            <img*/}
			{/*                src="https://images.pexels.com/photos/6193131/pexels-photo-6193131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"*/}
			{/*                alt="Produk Terbaru"*/}
			{/*                className="w-full h-full object-cover"*/}
			{/*            />*/}
			{/*            <div*/}
			{/*                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">*/}
			{/*                <Typography*/}
			{/*                    variant="h1"*/}
			{/*                    className="text-white text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl"*/}
			{/*                >*/}
			{/*                    Produk terbaru*/}
			{/*                </Typography>*/}
			{/*            </div>*/}
			{/*        </div>*/}
			{/*        <div className="relative col-span-1 overflow-hidden rounded-lg">*/}
			{/*            <img*/}
			{/*                src="https://images.pexels.com/photos/3737576/pexels-photo-3737576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"*/}
			{/*                alt="Keranjang Anyaman"*/}
			{/*                className="w-full h-full object-cover"*/}
			{/*            />*/}
			{/*            <div*/}
			{/*                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">*/}
			{/*                <Typography*/}
			{/*                    variant="h1"*/}
			{/*                    className="text-white text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl"*/}
			{/*                >*/}
			{/*                    Keranjang Anyaman*/}
			{/*                </Typography>*/}
			{/*            </div>*/}
			{/*        </div>*/}
			{/*        <div className="relative col-span-1 overflow-hidden rounded-lg">*/}
			{/*            <img*/}
			{/*                src="https://images.pexels.com/photos/3737672/pexels-photo-3737672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"*/}
			{/*                alt="Cangkir Kertas"*/}
			{/*                className="w-full h-full object-cover"*/}
			{/*            />*/}
			{/*            <div*/}
			{/*                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100">*/}
			{/*                <Typography*/}
			{/*                    variant="h1"*/}
			{/*                    className="text-white text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl"*/}
			{/*                >*/}
			{/*                    Cangkir Kertas*/}
			{/*                </Typography>*/}
			{/*            </div>*/}
			{/*        </div>*/}
			{/*    </div>*/}
			{/*</div>*/}
			{/*<div className="w-full mt-[66px] h-auto flex flex-col items-center">*/}
			{/*    <div className="text-center max-w-4xl px-4">*/}
			{/*        <Typography variant="h1" className="">*/}
			{/*            <strong className="text-emerald-600">Produk</strong> Lainnya*/}
			{/*        </Typography>*/}
			{/*    </div>*/}
			{/*    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-10/12 mt-[33px]">*/}
			{/*        {products.map((product) => (*/}
			{/*            <Link to={`/produk/${product.id}`}>*/}
			{/*                <product*/}
			{/*                    key={product.id}*/}
			{/*                    image={product.image}*/}
			{/*                    price={product.price}*/}
			{/*                    title={product.title}*/}
			{/*                    rating={product.rating}*/}
			{/*                    description={product.description}*/}
			{/*                />*/}
			{/*            </Link>*/}
			{/*        ))}*/}
			{/*    </div>*/}
			{/*</div>*/}
		</>
	);
}

export default ProductDetail;
