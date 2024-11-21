import { create } from "zustand";

export enum ProductType {
	ALAT_MAKAN_RAMAH_LINGKUNGAN = "Alat Makan Ramah Lingkungan",
	WADAH_MAKANAN = "Wadah Makanan",
	TAS_REUSABLE = "Tas Reusable",
	PERALATAN_MINUM = "Peralatan Minum",
	AKSESORIS_BERKELANJUTAN = "Aksesoris Berkelanjutan",
	PRODUK_ZERO_WASTE = "Produk Zero Waste",
}

export enum ProductMaterial {
	PLASTIK = "Plastik",
	KAYU = "Kayu / Bambu",
	LOGAM = "Logam",
	KAIN = "Kain",
	LAINNYA = "Lainnya",
}

export enum PriceRange {
	DIBAWAH_100K = "Di bawah 100.000",
	_100K_500K = "100.000 - 500.000",
	_500K_1JT = "500.000 - 1.000.000",
	DIATAS_1JT = "Di atas 1.000.000",
}

interface ProductFilterState {
	selectedProductTypes: ProductType[];
	setProductTypes: (types: ProductType[]) => void;

	selectedPriceRanges: PriceRange[];
	setPriceRanges: (ranges: PriceRange[]) => void;

	selectedMaterials: ProductMaterial[];
	setMaterials: (materials: ProductMaterial[]) => void;
}

const useProductFilterStore = create<ProductFilterState>((set) => ({
	selectedProductTypes: [],
	setProductTypes: (types) => set({ selectedProductTypes: types }),

	selectedPriceRanges: [],
	setPriceRanges: (ranges) => set({ selectedPriceRanges: ranges }),

	selectedMaterials: [],
	setMaterials: (materials) => set({ selectedMaterials: materials }),
}));

export default useProductFilterStore;
