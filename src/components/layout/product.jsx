import React from "react";
import { useMemo } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Product = ({ image, price, title, rating, description }) => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;

	const starsArray = useMemo(
		() =>
			Array.from({ length: fullStars }, () =>
				Math.random().toString(36).substr(2, 9),
			),
		[fullStars],
	);

	return (
		<Card>
			<div className="rounded-md overflow-hidden">
				<img src={image} alt={title} className="w-full h-80 object-cover" />
			</div>
			<CardHeader>
				<Typography variant="large" className="text-emerald-600 font-bold">
					{title}
				</Typography>
				<Typography variant="large" className="text-emerald-600 font-semibold">
					Rp. {price}
				</Typography>
			</CardHeader>
			<CardContent>
				<div className="flex mb-5">
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
					<span className="font-bold ml-2 text-green-600">{rating} / 5</span>
				</div>
				<CardDescription>
					<Typography variant="p" type="description">
						{description}
					</Typography>
				</CardDescription>
			</CardContent>
			<CardFooter>
				<Button variant="outline" className="px-4 py-2">
					Beli Sekarang
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Product;
