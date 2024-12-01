// import React, {useEffect, useState} from "react";
// import {getProductByCategory, productPagination, getProductByPrice, getProductBySearch, getProducts} from "@/services/product";
// import {Typography} from "@/components/ui/Typography";
// import {Button} from "@/components/ui/button";
// import {Input} from "@/components/ui/input";
// import Product from "@/components/product/Product.jsx";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination";
// import {Link} from "react-router-dom";
// import {LazyLoadImage} from 'react-lazy-load-image-component';
//
// export default function Products() {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedPriceRanges, setPriceRanges] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 const data = await getProducts();
//                 setProducts(data);
//                 const uniqueCategories = [...new Set(data.map((product) => product.category_name))];
//                 setCategories(uniqueCategories);
//                 setFilteredProducts(data);
//             } catch (err) {
//                 setError(err.message);
//             }
//         }
//
//         fetchProducts();
//     }, []);
//
//     const handleFilter = async () => {
//         try {
//             let result = products;
//
//             if (searchQuery) {
//                 result = await getProductBySearch(searchQuery);
//             }
//
//             if (selectedCategory) {
//                 result = await getProductByCategory(selectedCategory);
//             }
//
//             if (selectedPriceRanges.length) {
//                 const [minPrice, maxPrice] = selectedPriceRanges;
//                 result = await getProductByPrice(minPrice, maxPrice);
//             }
//
//             setFilteredProducts(result);
//         } catch (err) {
//             setError(err.message);
//         }
//     };
//
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };
//
//     const handleCategoryChange = (category) => {
//         setSelectedCategory(category);
//     };
//
//     const handlePriceRangeChange = (range) => {
//         setPriceRanges(range);
//     };
//
//     if (error) return <p>Error: {error}</p>;
//     if (!products.length) return <p>Loading...</p>;
//
//     return (
//         <div>
//             <div className="w-full mt-[66px] h-auto flex flex-col items-center gap-[33px]">
//                 <div className="relative w-10/12 mx-auto">
//                     <LazyLoadImage
//                         src="https://images.pexels.com/photos/3737672/pexels-photo-3737672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//                         alt="Home"
//                         className="w-full h-[481px] object-cover rounded-[20px]"
//                     />
//                     <div className="absolute inset-0 bg-black opacity-40 rounded-[20px]"/>
//                     <div className="absolute inset-0 z-10 flex items-center justify-center">
//                         <Typography
//                             variant="h1"
//                             className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center"
//                         >
//                             Produk Ramah Lingkungan
//                         </Typography>
//                     </div>
//                 </div>
//                 <div className="w-full h-auto flex flex-col items-center">
//                     <div className="text-center max-w-6xl px-4">
//                         <Typography
//                             variant="lead"
//                             className="mt-7 text-[16px] leading-[24px] md:text-[20px] font-normal md:leading-[28px]"
//                             type="description"
//                         >
//                             Produk inovatif kami dirancang untuk mendukung keberlanjutan dan
//                             menciptakan masa depan yang lebih hijau, dengan solusi ramah
//                             lingkungan yang membantu mengurangi dampak negatif terhadap bumi.
//                         </Typography>
//                     </div>
//                 </div>
//                 <div className="w-full h-auto mt-[66px] flex flex-col items-center">
//                     <div className="w-11/12 md:w-10/12 flex flex-col md:flex-row justify-between items-center">
//                         <div className="flex w-full md:w-full max-w-2xl items-center space-x-2">
//
//                             <Select onValueChange={handlePriceRangeChange}>
//                                 <SelectTrigger className="w-full md:w-[180px] h-10 bg-emerald-500 text-white">
//                                     <SelectValue
//                                         placeholder="Rentang Harga"
//                                         className="text-white"
//                                     />
//                                 </SelectTrigger>
//                                 <SelectContent className="bg-emerald-500 text-white">
//                                     <SelectItem value={[0, 100]} className="text-white">
//                                         Di Bawah 100
//                                     </SelectItem>
//                                     <SelectItem value={[100, 500]} className="text-white">
//                                         100 - 500
//                                     </SelectItem>
//                                     <SelectItem value={[500, Infinity]} className="text-white">
//                                         Di Atas 500
//                                     </SelectItem>
//                                 </SelectContent>
//                             </Select>
//
//                             <Select onValueChange={handleCategoryChange}>
//                                 <SelectTrigger className="w-full md:w-[180px] h-10 bg-emerald-500 text-white">
//                                     <SelectValue placeholder="Kategori" className="text-white"/>
//                                 </SelectTrigger>
//                                 <SelectContent className="bg-emerald-500 text-white">
//                                     {categories.map((category) => (
//                                         <SelectItem
//                                             key={category}
//                                             value={category}
//                                             className="text-white hover:bg-emerald-700"
//                                         >
//                                             {category}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//
//                         </div>
//                         <div className="flex w-full md:w-full max-w-2xl items-center space-x-2 mt-4 md:mt-0">
//                             <Input
//                                 type="text"
//                                 placeholder="Cari produk..."
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                                 className="h-10 text-emerald-600 border-2 border-emerald-500 w-full"
//                             />
//                             <Button variant="primary" onClick={handleFilter}>
//                                 Cari
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//                 <div
//                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-10/12 mt-[33px] justify-center items-stretch">
//                     {filteredProducts.map((product) => (
//                         <Link to={`/produk/${product.id}`} key={product.id}>
//                             <Product
//                                 img_file={product.img_file}
//                                 price={product.price}
//                                 title={product.product_name}
//                                 description={product.description}
//                                 contact={product.contact}
//                                 category_name={product.category_name}
//                             />
//                         </Link>
//                     ))}
//                 </div>
//                 <div className="w-10/12 mt-8 sm:mt-[33px]">
//                     <Pagination className="gap-5 flex flex-wrap justify-center">
//                         <PaginationPrevious className="order-1 sm:order-none">
//                             <PaginationLink>Previous</PaginationLink>
//                         </PaginationPrevious>
//                         <PaginationContent className="order-3 sm:order-none hidden sm:flex">
//                             <PaginationItem className="sm:mx-1">
//                                 <PaginationLink isActive>1</PaginationLink>
//                             </PaginationItem>
//                             <PaginationItem className="sm:mx-1">
//                                 <PaginationLink>2</PaginationLink>
//                             </PaginationItem>
//                             <PaginationItem className="sm:mx-1">
//                                 <PaginationLink>3</PaginationLink>
//                             </PaginationItem>
//                             <PaginationItem className="sm:mx-1">
//                                 <PaginationLink>4</PaginationLink>
//                             </PaginationItem>
//                             <PaginationItem className="sm:mx-1">
//                                 <PaginationLink>5</PaginationLink>
//                             </PaginationItem>
//                         </PaginationContent>
//                         <PaginationNext className="order-2 sm:order-none">
//                             <PaginationLink>Next</PaginationLink>
//                         </PaginationNext>
//                     </Pagination>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { getProductByCategory, productPagination, getProductByPrice, getProductBySearch } from "@/services/product";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Product from "@/components/product/Product.jsx";
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
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPriceRanges, setPriceRanges] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchProducts() {
            console.log("Fetching products for page:", currentPage);
            try {
                const data = await productPagination(currentPage);
                console.log("Fetched Data:", data); // Log data yang diterima

                // Ambil data dari `results`
                const productsData = data.results || [];
                setProducts(productsData);
                setFilteredProducts(productsData); // Set filteredProducts dengan data yang sama
                setTotalPages(data.total_page); // Set totalPages dengan data dari API
            } catch (err) {
                console.error("Error fetching products:", err.message);
                setError(err.message);
            }
        }

        fetchProducts();
    }, [currentPage]);

    const handleFilter = async () => {
        try {
            let result = products;

            if (searchQuery) {
                result = await getProductBySearch(searchQuery);
            }

            if (selectedCategory) {
                result = await getProductByCategory(selectedCategory);
            }

            if (selectedPriceRanges.length) {
                const [minPrice, maxPrice] = selectedPriceRanges;
                result = await getProductByPrice(minPrice, maxPrice);
            }

            setFilteredProducts(result);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handlePriceRangeChange = (range) => {
        setPriceRanges(range);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (error) return <p>Error: {error}</p>;
    if (!filteredProducts.length) return <p>Loading...</p>;

    return (
        <div>
            <div className="w-full mt-[66px] h-auto flex flex-col items-center gap-[33px]">
                <div className="relative w-10/12 mx-auto">
                    <LazyLoadImage
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
                <div className="w-full h-auto mt-[66px] flex flex-col items-center">
                    <div className="w-11/12 md:w-10/12 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex w-full md:w-full max-w-2xl items-center space-x-2">
                            <Select onValueChange={handlePriceRangeChange}>
                                <SelectTrigger className="w-full md:w-[180px] h-10 bg-emerald-500 text-white">
                                    <SelectValue
                                        placeholder="Rentang Harga"
                                        className="text-white"
                                    />
                                </SelectTrigger>
                                <SelectContent className="bg-emerald-500 text-white">
                                    <SelectItem value={[0, 100]} className="text-white">
                                        Di Bawah 100
                                    </SelectItem>
                                    <SelectItem value={[100, 500]} className="text-white">
                                        100 - 500
                                    </SelectItem>
                                    <SelectItem value={[500, Infinity]} className="text-white">
                                        Di Atas 500
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={handleCategoryChange}>
                                <SelectTrigger className="w-full md:w-[180px] h-10 bg-emerald-500 text-white">
                                    <SelectValue placeholder="Kategori" className="text-white" />
                                </SelectTrigger>
                                <SelectContent className="bg-emerald-500 text-white">
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category}
                                            value={category}
                                            className="text-white hover:bg-emerald-700"
                                        >
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-full md:w-full max-w-2xl items-center space-x-2 mt-4 md:mt-0">
                            <Input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="h-10 text-emerald-600 border-2 border-emerald-500 w-full"
                            />
                            <Button variant="primary" onClick={handleFilter}>
                                Cari
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-10/12 mt-[33px] justify-center items-stretch">
                    {filteredProducts.map((product) => (
                        <Link to={`/produk/${product.id}`} key={product.id}>
                            <Product
                                img_file={product.img_file}
                                price={product.price}
                                title={product.product_name}
                                description={product.description}
                                contact={product.contact}
                                category_name={product.category_name}
                            />
                        </Link>
                    ))}
                </div>
                <div className="w-10/12 mt-8 sm:mt-[33px]">
                    <Pagination className="gap-5 flex flex-wrap justify-center">
                        <PaginationPrevious className="order-1 sm:order-none" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <PaginationLink>Previous</PaginationLink>
                        </PaginationPrevious>
                        <PaginationContent className="order-3 sm:order-none hidden sm:flex">
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index} className="sm:mx-1">
                                    <PaginationLink onClick={() => handlePageChange(index + 1)} isActive={currentPage === index + 1}>
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                        <PaginationNext className="order-2 sm:order-none" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <PaginationLink>Next</PaginationLink>
                        </PaginationNext>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}