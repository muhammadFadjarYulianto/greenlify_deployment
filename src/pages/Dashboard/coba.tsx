import React, { useState, useEffect } from "react";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/card";
// @ts-ignore
import Logo from "@/assets/logo/logo.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import {
  getProductsManagement,
  createProductManagement,
  updateProductManagement,
  deleteProductManagement,
} from "@/services/productManagement.js";
import { getCategoriesManagement } from "@/services/categoryManagement.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getProducts } from "@/services/product.js";

interface Product {
  id: number;
  product_name: string;
  price: number;
  img_file: string;
  category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
  contact: string;
  description: string;
}

interface Category {
  id: number;
  category_name: string;
}

interface PaginationResponse {
  success: boolean;
  results: Product[];
  total_page: number;
  start_page: number;
  per_page: number;
  total_data: number;
  next: string;
  previous: string;
}

export default function DashboardProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5);

  const [filters, setFilters] = useState({
    category_name: "",
    min_price: "",
    max_price: "",
    keyword: "",
    page: 1,
    limit: 4,
  });

  const [pagination, setPagination] = useState<PaginationResponse>({
    success: true,
    results: [],
    total_page: 1,
    start_page: 1,
    per_page: 5,
    total_data: 0,
    next: null,
    previous: null,
  });

  const { toast } = useToast();

  const fetchProducts = async (page: number = 1) => {
    try {
      setLoading(true);
      const start = (page - 1) * itemsPerPage + 1;

      const response = (await getProductsManagement(
        start,
        itemsPerPage
      )) as PaginationResponse;

      if (response.success) {
        setProducts(response.results);
        setTotalPages(response.total_page);
        setCurrentPage(page);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (err) {
      console.error("Gagal mengambil produk:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Gagal mengambil produk";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Ambil data produk saat komponen dimuat
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProducts(filters);
        if (response.success) {
          setProducts(response.products);
          setCategories(response.categories);
          setPagination({
            success: response.success,
            results: response.products,
            total_page: response.pagination.total_page,
            start_page: response.pagination.start_page,
            per_page: response.pagination.per_page,
            total_data: response.pagination.total_data,
            next: response.pagination.next,
            previous: response.pagination.previous,
          });
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Gagal mengambil produk:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Gagal mengambil produk";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await getCategoriesManagement();
        setCategories(responseData);
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
        toast({
          title: "Gagal Memuat Kategori",
          description: "Terjadi kesalahan saat mengambil daftar kategori.",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, []);


  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/"
                  className="text-[16px] font-normal leading-[28px]"
                >
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/Dashboard"
                  className="text-[16px] font-normal leading-[28px]"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[16px] font-normal leading-[28px]">
                  Produk
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 pb-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mr-0 md:mr-6">
          <div>
            <Typography variant="h1" className="text-4xl lg:text-5xl">
              Manajemen Produk
            </Typography>
            <Typography variant="p-regular" className="text-slate-700 mt-4">
              Manajemen produk memungkinkan Anda untuk mengelola produk yang
              akan ditampilkan di halaman produk.
            </Typography>
          </div>

          <div className="filter-form">
            <select
              name="category_name"
              value={filters.category_name}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option
                  key={category.id || category.category_name}
                  value={category.category_name}
                >
                  {category.category_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="min_price"
              placeholder="Min Price"
              value={filters.min_price}
              onChange={handleFilterChange}
            />

            <input
              type="number"
              name="max_price"
              placeholder="Max Price"
              value={filters.max_price}
              onChange={handleFilterChange}
            />

            <input
              type="text"
              name="keyword"
              placeholder="Search"
              value={filters.keyword}
              onChange={handleFilterChange}
            />

            <button
              onClick={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  page: 1, // Reset to page 1 when filter applied
                }))
              }
            >
              Apply Filters
            </button>
          </div>

          {/* Products List */}
          <div className="products-list">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="product-item">
                  <h2>{product.product_name}</h2>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={!pagination.previous}
              onClick={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  page: prevFilters.page - 1,
                }))
              }
            >
              Previous
            </button>
            <span>
              {pagination.start_page} - {pagination.total_data}
            </span>
            <button
              disabled={!pagination.next}
              onClick={() =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  page: prevFilters.page + 1,
                }))
              }
            >
              Next
            </button>
          </div>
          <Button
            variant="primary"
            className="text-white shadow-lg"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-6 h-6 mr-2" />
            Tambah Produk
          </Button>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50 " : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem className="cursor-pointer">
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
