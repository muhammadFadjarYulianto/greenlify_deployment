import ProductSkeleton from "@/components/product/ProductSkeleton";
import React from "react";

export default function ProductSkeletonList({count}) {
    return (
        <>
            {Array.from({length: count}).map((_, index) => (
                <ProductSkeleton key={index}/>
            ))}
        </>
    );
}