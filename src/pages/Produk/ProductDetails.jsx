import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductDetailsStore from "@/store/useProductDetailsStore";
import ProductDetail from "@/components/layout/ProductDetail";
import NoProduct from "@/pages/Produk/NoProduct";

function ProductDetails() {
	const { id } = useParams();
	const { selectedProduct, setSelectedProduct, resetSelectedProduct } =
		useProductDetailsStore();

	useEffect(() => {
		setSelectedProduct(id);
		return () => {
			resetSelectedProduct();
		};
	}, [id, setSelectedProduct, resetSelectedProduct]);

	if (!selectedProduct) {
		return <NoProduct />;
	}

	return <ProductDetail product={selectedProduct} />;
}

export default ProductDetails;
