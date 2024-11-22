import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "@/store/productStore";
import ProductDetail from "@/components/layout/ProductDetail";
import Errors from "@/pages/Errors.jsx";

function ProductDetails() {
	const { id } = useParams();
	const { selectedProduct, setSelectedProduct, resetSelectedProduct } =
		useProductStore();

	useEffect(() => {
		setSelectedProduct(id);
		return () => {
			resetSelectedProduct();
		};
	}, [id, setSelectedProduct, resetSelectedProduct]);

	if (!selectedProduct) {
		return <Errors />;
	}

	return <ProductDetail product={selectedProduct} />;
}

export default ProductDetails;
