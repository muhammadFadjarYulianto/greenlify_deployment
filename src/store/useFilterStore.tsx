// import { create } from "zustand";
//
// export enum ProductMaterial {
// 	PLASTIK = "Plastik",
// 	KAYU = "Kayu / Bambu",
// 	LOGAM = "Logam",
// 	KAIN = "Kain",
// 	LAINNYA = "Lainnya",
// }
//
// export enum PriceRange {
// 	DIBAWAH_100K = "Di bawah 100.000",
// 	_100K_500K = "100.000 - 500.000",
// 	_500K_1JT = "500.000 - 1.000.000",
// 	DIATAS_1JT = "Di atas 1.000.000",
// }
//
// interface ProductFilterState {
// 	selectedPriceRanges: PriceRange[];
// 	setPriceRanges: (ranges: PriceRange[]) => void;
//
// 	selectedMaterials: ProductMaterial[];
// 	setMaterials: (materials: ProductMaterial[]) => void;
// }
//
// const useProductFilterStore = create<ProductFilterState>((set) => ({
// 	selectedPriceRanges: [],
// 	setPriceRanges: (ranges) => set({ selectedPriceRanges: ranges }),
//
// 	selectedMaterials: [],
// 	setMaterials: (materials) => set({ selectedMaterials: materials }),
// }));
//
// export default useProductFilterStore;

import { create } from "zustand";

export const PriceRange = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
};

export const useProductFilterStore = create((set) => ({
    selectedPriceRanges: [],
    selectedMaterials: [],
    setPriceRanges: (priceRanges) =>
        set((state) => ({ selectedPriceRanges: priceRanges })),
    setMaterials: (materials) =>
        set((state) => ({ selectedMaterials: materials })),
    resetFilters: () => set({ selectedPriceRanges: [], selectedMaterials: [] }),
}));
