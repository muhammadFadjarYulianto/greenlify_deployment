import React, {useState, useEffect} from "react";
import {Typography} from "@/components/ui/Typography";
import {Card, CardContent} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Pencil, Trash2, Eye, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
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
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";

import {
    getProductsManagement,
    createProductManagement,
    updateProductManagement,
    deleteProductManagement
} from "@/services/productManagement.js";
import {getCategoriesManagement} from "@/services/categoryManagement.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import { 
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

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
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5);

  const { toast } = useToast();

  const fetchProducts = async (page: number = 1) => {
    try {
      setLoading(true);
      // Hitung start berdasarkan halaman
      const start = (page - 1) * itemsPerPage + 1;
      
      const response = await getProductsManagement(start, itemsPerPage) as PaginationResponse;
      console.log('Fetched products:', response);

      if (response.success) {
        setProducts(response.results);
        setTotalPages(response.total_page);
        setCurrentPage(page);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (err) {
      console.error("Gagal mengambil produk:", err);
      const errorMessage = err instanceof Error ? err.message : "Gagal mengambil produk";
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
    fetchProducts(currentPage);
}, [currentPage]);

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

    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (selectedCategoryId) {
            formData.append('category_id', selectedCategoryId.toString());
            formData.delete('category_name');
        }

        const createdBy = localStorage.getItem('id');
        if (createdBy) {
            formData.append('created_by', createdBy);
        }

        try {
            await createProductManagement(formData);
            fetchProducts();
            setIsAddModalOpen(false);
            toast({
                title: "Produk Berhasil Ditambahkan",
                description: "Produk baru telah berhasil ditambahkan.",
            });
        } catch (error) {
            toast({
                title: "Gagal Menambahkan Produk",
                description: "Terjadi kesalahan saat menambahkan produk.",
                variant: "destructive",
            });
        }
    };

    const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentProduct) return;
        const formData = new FormData(e.currentTarget);

        if (selectedCategoryId) {
            formData.append('category_id', selectedCategoryId.toString());
            formData.delete('category_name');
        }

        const createdBy = localStorage.getItem('id');
        if (createdBy) {
            formData.append('created_by', createdBy);
        }

        try {
            await updateProductManagement(currentProduct.id, formData);
            fetchProducts();
            setIsEditModalOpen(false);
            toast({
                title: "Produk Berhasil Diperbarui",
                description: "Produk telah berhasil diperbarui.",
            });
        } catch (error) {
            toast({
                title: "Gagal Memperbarui Produk",
                description: "Terjadi kesalahan saat memperbarui produk.",
                variant: "destructive",
            });
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProductManagement(productId);
            fetchProducts();
            toast({
                title: "Produk Berhasil Dihapus",
                description: "Produk telah berhasil dihapus.",
            });
        } catch (error) {
            toast({
                title: "Gagal Menghapus Produk",
                description: "Terjadi kesalahan saat menghapus produk.",
                variant: "destructive",
            });
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        const day = days[date.getDay()];
        const dateNum = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}, ${dateNum} ${month} ${year}`;
    };

    const openEditModal = (product: Product) => {
        setCurrentProduct(product);
        setIsEditModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Typography variant="p-regular">Memuat produk...</Typography>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-full text-red-500">
                <Typography variant="p-regular">{error}</Typography>
            </div>
        );
    }

    const renderPagination = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
              <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`mx-1 px-3 py-1 rounded ${
                      currentPage === i 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-black'
                  }`}
              >
                  {i}
              </button>
          );
      }

      return (
          <div className="flex justify-center items-center mt-4">
              <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mx-2 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                  Previous
              </button>
              {pageNumbers}
              <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="mx-2 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                  Next
              </button>
          </div>
      );
  };

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
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
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="/Dashboard"
                                    className="text-[16px] font-normal leading-[28px]"
                                >
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-[16px] font-normal leading-[28px]">
                                    Produk
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
                    <Button
                        variant="primary"
                        className="text-white"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus className="w-6 h-6 mr-2"/>
                        Tambah Produk
                    </Button>
                </div>
                <div className="grid gap-4 grid-cols-1">
                    <Card>
                        <CardContent className="p-0 md:p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xl">Gambar</TableHead>
                                        <TableHead className="text-xl">Nama Produk</TableHead>
                                        <TableHead className="text-xl">Harga</TableHead>
                                        <TableHead className="text-xl">Kategori</TableHead>
                                        <TableHead className="text-xl text-center">Tanggal Dibuat</TableHead>
                                        <TableHead className="text-xl text-center">Tanggal Edit</TableHead>
                                        <TableHead className="text-xl text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <img
                                                    src={product.img_file}
                                                    alt={product.product_name}
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                            </TableCell>
                                            <TableCell>{product.product_name}</TableCell>
                                            <TableCell>
                                                Rp {product.price.toLocaleString("id-ID")}
                                            </TableCell>
                                            <TableCell>{product.category_name}</TableCell>
                                            <TableCell
                                                className="text-center">{formatDate(product.created_at)}</TableCell>
                                            <TableCell
                                                className="text-center">{formatDate(product.updated_at)}</TableCell>
                                            <TableCell className="text-[16px] font-normal leading-[28px]">
                                                <TooltipProvider>
                                                    <div className="flex justify-end gap-2">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button variant="outline" size="icon">
                                                                    <Eye className="w-4 h-4"/>
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Lihat Detail</p>
                                                            </TooltipContent>
                                                        </Tooltip>

                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() => openEditModal(product)}
                                                                >
                                                                    <Pencil className="w-4 h-4"/>
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Edit Produk</p>
                                                            </TooltipContent>
                                                        </Tooltip>

                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="text-red-500 hover:text-red-600"
                                                                    onClick={() => handleDeleteProduct(product.id)}
                                                                >
                                                                    <Trash2 className="w-4 h-4"/>
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Hapus Produk</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                </TooltipProvider>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center text-[20px] font-bold leading-[28px]">Tambah Produk
                            Baru</DialogTitle>
                        <Typography variant="p-regular" className="text-center text-slate-700">
                            Tambahkan produk baru ke dalam daftar produk yang tersedia
                        </Typography>
                    </DialogHeader>
                    <form onSubmit={handleAddProduct}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="product_name" className="text-[16px] font-normal leading-[28px]">
                                    Nama Produk
                                </Label>
                                <Input
                                    id="product_name"
                                    name="product_name"
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
                                    placeholder="Masukkan nama produk"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-[16px] font-normal leading-[28px]">
                                    Harga
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="Rp. 0"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="img_file" className="text-[16px] font-normal leading-[28px]">
                                    Gambar
                                </Label>
                                <Input
                                    id="img_file"
                                    name="img_file"
                                    type="text"
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
                                    placeholder="Url"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-[16px] font-normal leading-[28px] ">
                                    Kategori
                                </Label>
                                <Select
                                    onValueChange={(value) => setSelectedCategoryId(Number(value))}
                                    required
                                >
                                    <SelectTrigger
                                        className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600">
                                        <SelectValue placeholder="Pilih Kategori"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-emerald-600 text-white">
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {category.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact" className="text-[16px] font-normal leading-[28px]">
                                    Hubungi
                                </Label>
                                <Input
                                    id="contact"
                                    name="contact"
                                    type="text"
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
                                    placeholder="Masukkan url"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-[16px] font-normal leading-[28px]">
                                    Deskripsi Produk
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
                                    placeholder="Masukkan deskripsi produk"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center text-[20px] font-bold leading-[28px]">
                            Edit Produk
                        </DialogTitle>
                        <Typography variant="p-regular" className="text-center text-slate-700">
                            Ubah detail produk yang ada di daftar produk
                        </Typography>
                    </DialogHeader>
                    <form onSubmit={handleEditProduct}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="product_name" className="text-[16px] font-normal leading-[28px]">
                                    Nama Produk
                                </Label>
                                <Input
                                    id="product_name"
                                    name="product_name"
                                    defaultValue={currentProduct?.product_name}
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
                                    placeholder="Masukkan nama produk"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-[16px] font-normal leading-[28px]">
                                    Harga
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    defaultValue={currentProduct?.price}
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="Rp. 0"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="img_file" className="text-[16px] font-normal leading-[28px]">
                                    Gambar
                                </Label>
                                <Input
                                    id="img_file"
                                    name="img_file"
                                    type="text"
                                    defaultValue={currentProduct?.img_file}
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
                                    placeholder="Url"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-[16px] font-normal leading-[28px]">
                                    Kategori
                                </Label>
                                <Select
                                    onValueChange={(value) => setSelectedCategoryId(Number(value))}
                                    value={
                                        selectedCategoryId?.toString() ||
                                        currentProduct?.category_id?.toString()
                                    }
                                    required
                                >
                                    <SelectTrigger
                                        className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600">
                                        <SelectValue placeholder="Pilih Kategori"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-emerald-600 text-white">
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact" className="text-[16px] font-normal leading-[28px]">
                                    Hubungi
                                </Label>
                                <Input
                                    id="contact"
                                    name="contact"
                                    type="text"
                                    defaultValue={currentProduct?.contact}
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
                                    placeholder="Masukkan url"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-[16px] font-normal leading-[28px]">
                                    Deskripsi Produk
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={currentProduct?.description}
                                    className="col-span-3 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
                                    placeholder="Masukkan deskripsi produk"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button type="submit">Simpan Perubahan</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
        ;
}