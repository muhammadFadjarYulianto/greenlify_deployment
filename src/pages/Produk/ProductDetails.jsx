import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductDetailsStore from "@/store/useProductDetailsStore";
import ProductDetail from "@/components/product/ProductDetail";
import NoProduct from "@/pages/Produk/NoProduct";
import { getProductById } from "@/services/product";
import {Typography} from "@/components/ui/Typography";

function ProductDetails() {
    const { id } = useParams();
    const { setSelectedProduct, resetSelectedProduct } = useProductDetailsStore();
    const [selectedProduct, setSelectedProductState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);
                setSelectedProductState(product);
                setSelectedProduct(product);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        return () => {
            resetSelectedProduct();
        };
    }, [id, setSelectedProduct, resetSelectedProduct]);

    if (loading) {
        return <Typography variant="h2">Loading...</Typography>;
    }

    if (error) {
        return <NoProduct />;
    }

    if (!selectedProduct) {
        return <NoProduct />;
    }

    return <ProductDetail product={selectedProduct} />;
}

export default ProductDetails;