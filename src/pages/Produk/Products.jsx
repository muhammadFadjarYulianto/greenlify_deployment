import React, {useCallback, useEffect, useState, useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getProducts, getProductByMultipleFilter} from "@/services/product";
import {Typography} from "@/components/ui/Typography";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Product from "@/components/product/Product.jsx";
import {FilterX} from "lucide-react";
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
import {Link} from "react-router-dom";
import debounce from 'lodash/debounce';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {gsap} from 'gsap';
import ProductSkeleton from "@/components/product/ProductSkeleton";
import ProductSkeletonList from "@/components/product/ProductSkeletonList.jsx";

export default function Products() {
    const productContainerRef = useRef(null);
    const noProductsRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("keyword") || "");
    const [searchPending, setSearchPending] = useState(searchParams.get("keyword") || "");
    const [selectedPriceRange, setSelectedPriceRange] = useState(
        searchParams.get("min_price") ? [searchParams.get("min_price"), searchParams.get("max_price")] : null
    );
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category_name") || "");
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [itemsPerPage] = useState(4);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                setError(null);
                const allData = await getProducts();
                const allCategoriesData = [
                    ...new Set(allData.map((product) => product.category_name)),
                ];
                setAllCategories(allCategoriesData);
                const filters = {
                    keyword: searchQuery || null,
                    category_name: selectedCategory || null,
                    min_price: selectedPriceRange ? selectedPriceRange[0] : null,
                    max_price: selectedPriceRange ? selectedPriceRange[1] : null,
                };

                let filteredData = allData;
                if (Object.values(filters).some((value) => value !== null)) {
                    filteredData = await getProductByMultipleFilter(filters);
                }

                if (filteredData.length === 0) {
                    setError("Produk Tidak Ditemukan");
                    setFilteredProducts([]);
                } else {
                    const productsData = filteredData.map((product) => ({
                        id: product.id,
                        product_name: product.product_name,
                        description: product.description,
                        price: product.price,
                        img_file: product.img_file,
                        contact: product.contact,
                        category_name: product.category_name,
                    }));
                    setProducts(productsData);
                    setFilteredProducts(productsData);
                }

                setCategories(allCategoriesData);
                setTotalPages(filteredData.total_page || 1);
            } catch (err) {
                const errorMsg = err.response ? err.response.data.message : err.message;
                setError(errorMsg);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, [searchQuery, selectedCategory, selectedPriceRange, currentPage]);

    useEffect(() => {
        if (productContainerRef.current) {
            gsap.fromTo(
                productContainerRef.current.children,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.5,
                }
            );
        }
        if (noProductsRef.current) {
            gsap.fromTo(noProductsRef.current, {
                opacity: 0,
                y: 20,
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
            });
        }

    }, [filteredProducts, error]);

    const updateURLParams = (params) => {
        const updatedParams = new URLSearchParams(location.search);
        Object.keys(params).forEach((key) => {
            if (params[key]) updatedParams.set(key, params[key]);
            else updatedParams.delete(key);
        });
        navigate({search: updatedParams.toString()});
    };

    const debouncedSearch = useCallback(
        debounce((query) => {
            const params = query ? {
                keyword: query,
                category_name: selectedCategory ? selectedCategory : null,
                min_price: selectedPriceRange ? selectedPriceRange[0] : null,
                max_price: selectedPriceRange ? selectedPriceRange[1] : null
            } : {
                keyword: null,
                category_name: null,
                min_price: null,
                max_price: null
            };

            setSearchQuery(query || "");
            updateURLParams(params);
        }, 500),
        [selectedCategory, selectedPriceRange]
    );

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchPending(query);
        debouncedSearch(query);
    };

    const handleCategoryChange = (category) => {
        const params = {
            category_name: category,
            keyword: searchQuery ? searchQuery : null,
            min_price: selectedPriceRange ? selectedPriceRange[0] : null,
            max_price: selectedPriceRange ? selectedPriceRange[1] : null
        };

        setSelectedCategory(category);
        updateURLParams(params);
    };

    const handlePriceRangeChange = (range) => {
        const parsedRange = range.split(",").map(Number);

        const params = {
            min_price: parsedRange[0],
            max_price: parsedRange[1],
            category_name: selectedCategory ? selectedCategory : null,
            keyword: searchQuery ? searchQuery : null
        };

        setSelectedPriceRange(parsedRange);
        updateURLParams(params);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    function deleteFilter() {
        const params = {
            category_name: null,
            keyword: null,
            min_price: null,
            max_price: null
        };

        setSelectedCategory("");
        setSearchQuery("");
        setSearchPending("");
        setSelectedPriceRange(null);
        updateURLParams(params);
    }

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
    }, [filteredProducts, itemsPerPage]);

    const renderProductContent = () => {
        if (isLoading) {
            return (
                <div className="col-span-full flex flex-col items-center justify-center w-full p-8" ref={noProductsRef}>
                    <Typography
                        variant="h2"
                        className="text-emerald-600 text-center mb-4"
                    >
                        Memuat Produk...
                    </Typography>
                </div>
            );
        }

        if (error) {
            return (<>
                    <ProductSkeletonList count={4}/>
                </>
            );
        }
        if (!isLoading && paginatedProducts.length === 0) {
            return (
                <div className="col-span-full flex flex-col items-center justify-center w-full p-8" ref={noProductsRef}>
                    <Typography
                        variant="h2"
                        className="text-emerald-600 text-center mb-4"
                    >
                        Produk Tidak Ditemukan
                    </Typography>
                    <Typography
                        variant="large"
                        className="text-slate-500 text-center mb-6"
                    >
                        Tidak ada produk yang sesuai dengan filter atau pencarian Anda.
                    </Typography>
                    <Button onClick={deleteFilter} variant="primary">
                        Hapus Filter
                    </Button>
                </div>
            );
        }
        return paginatedProducts.map((product) => (
            <div ref={productContainerRef} key={product.id}>
                <Link to={`/produk/${product.id}`}>
                    <Product
                        img_file={product.img_file}
                        price={product.price}
                        title={product.product_name}
                        description={product.description}
                        contact={product.contact}
                        category_name={product.category_name}
                    />
                </Link>
            </div>
        ));
    };

    return (
        <div>
            <div className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px]">
                <div className="relative w-10/12 mx-4 md:mx-0">
                    <LazyLoadImage
                        src="https://images.pexels.com/photos/3737672/pexels-photo-3737672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Home"
                        className="w-full h-[481px] object-cover rounded-[20px] shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black opacity-40 rounded-[20px]"/>
                    <div className="absolute inset-0 z-10 flex flex-col gap-6 items-center justify-center">
                        <Typography
                            variant="title"
                            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center"
                        >
                            Produk Ramah Lingkungan
                        </Typography>
                    </div>
                </div>
                <div className="w-full mt-[33px] h-auto flex flex-col items-center">
                    <div className="text-center px-4">
                        <Typography variant="h1">
                            Produk <strong className="text-emerald-600">Inovatif</strong>
                        </Typography>
                        <Typography
                            variant="p"
                            className="mt-7 max-w-6xl"
                            type="description"
                        >
                            Produk inovatif kami dirancang untuk mendukung keberlanjutan dan
                            menciptakan masa depan yang lebih hijau, dengan solusi ramah
                            lingkungan yang membantu mengurangi dampak negatif terhadap bumi.
                            Produk kami terbuat dari bahan-bahan yang ramah lingkungan dan dapat di
                            daur ulang.
                        </Typography>
                    </div>
                </div>
                <div className="w-full h-auto mt-[33px] flex flex-col items-center">
                    <div className="w-11/12 md:w-10/12 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex w-full md:w-full max-w-2xl items-center space-x-2">
                            <Select
                                value={selectedPriceRange ? selectedPriceRange.join(',') : ""}
                                onValueChange={handlePriceRangeChange}
                            >
                                <SelectTrigger className="w-full md:w-[180px] h-11 bg-emerald-500 text-white">
                                    <SelectValue
                                        placeholder="Rentang Harga"
                                        className="text-white"
                                    />
                                </SelectTrigger>
                                <SelectContent className="bg-emerald-500 text-white">
                                    <SelectItem value="0,10000" className="text-white">
                                        Di Bawah 10000
                                    </SelectItem>
                                    <SelectItem value="10000,50000" className="text-white">
                                        10000 - 50000
                                    </SelectItem>
                                    <SelectItem value="50000,1000000" className="text-white">
                                        Di Atas 50000
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={selectedCategory}
                                onValueChange={handleCategoryChange}
                            >
                                <SelectTrigger className="w-full md:w-[180px] h-11 bg-emerald-500 text-white">
                                    <SelectValue placeholder="Kategori" className="text-white"/>
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

                            <Button onClick={deleteFilter} variant="icon"
                                    className="bg-emerald-500 hover:bg-emerald-600 text-background">
                                <FilterX/>
                            </Button>
                        </div>
                        <div className="flex w-full md:w-full max-w-2xl items-center space-x-2 mt-4 md:mt-0">
                            <Input
                                type="text"
                                placeholder="Cari produk..."
                                value={searchPending}
                                onChange={handleSearchChange}
                                className="h-10 text-emerald-600 border-2 border-emerald-500 w-full"
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-10/12 mt-[33px] justify-center items-stretch"
                >
                    {renderProductContent()}
                </div>

                {filteredProducts.length > 0 && (
                    <div className="w-10/12 mt-8 sm:mt-[33px]">
                        <Pagination className="gap-5 flex flex-wrap justify-center ">
                            <PaginationPrevious
                                className="order-1 sm:order-none cursor-pointer"
                                onClick={() => handlePageChange(currentPage - 1)}
                                aria-disabled={currentPage === 1}
                            >
                                <PaginationLink>Previous</PaginationLink>
                            </PaginationPrevious>
                            <PaginationContent className="order-3 sm:order-none hidden sm:flex cursor-pointer">
                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem key={index} className="sm:mx-1">
                                        <PaginationLink
                                            onClick={() => handlePageChange(index + 1)}
                                            isActive={currentPage === index + 1}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                            </PaginationContent>
                            <PaginationNext
                                className="order-2 sm:order-none cursor-pointer"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <PaginationLink>Next</PaginationLink>
                            </PaginationNext>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    );
}