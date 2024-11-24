import { create } from "zustand";
// @ts-ignore
import productsData from "@/data/productdetails.json";

const useProductDetailsStore = create((set) => ({
	products: productsData,
	selectedProduct: null,

	setSelectedProduct: (id) => {
		const product = productsData.find(
			(item) => item.id === Number.parseInt(id),
		);
		set({ selectedProduct: product });
	},

	resetSelectedProduct: () => {
		set({ selectedProduct: null });
	},
}));

export default useProductDetailsStore;
