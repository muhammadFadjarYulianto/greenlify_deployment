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
import {Pencil, Trash2, Plus} from "lucide-react";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";

import {
    getCategoriesManagement,
    addCategory,
    updateCategory,
    deleteCategory
} from "@/services/categoryManagement";

export default function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const {toast} = useToast();

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const fetchedCategories = await getCategoriesManagement();
            setCategories(fetchedCategories);
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCategory = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newCategory = {
            category_name: formData.get('categoryName'),
            status: 'Aktif'
        };

        try {
            await addCategory(newCategory);
            toast({
                title: "Berhasil",
                description: "Kategori baru telah ditambahkan",
            });
            setIsAddModalOpen(false);
            await fetchCategories();
            event.target.reset();
        } catch (error) {
            toast({
                title: "Produk Gagal Ditambahkan",
                description: "Produk yang anda tambahkan sudah ada.",
                variant: "destructive",
            });
        }
    };

    const handleEditCategory = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedCategory = {
            category_name: formData.get('categoryName'),
            status: currentCategory.status
        };

        try {
            await updateCategory(currentCategory.id, updatedCategory);
            toast({
                title: "Berhasil",
                description: "Kategori telah diperbarui.",
            });
            setIsEditModalOpen(false);
            await fetchCategories();
        } catch (error) {
            toast({
                title: "Terjadi Kesalahan",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            setIsDeleteModalOpen(false);
            toast({
                title: "Berhasil",
                description: "Kategori telah dihapus",
            });
            await fetchCategories();
        } catch (error) {
            toast({
                title: "Terjadi Kesaahan",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

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
                                    Kategori
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
                            Manajemen Kategori
                        </Typography>
                        <Typography variant="p" className="text-slate-700 mt-4">
                            Kelola kategori produk untuk memudahkan pengorganisasian dan
                            pencarian produk di toko Anda.
                        </Typography>
                    </div>
                    <Button
                        variant="primary"
                        className="text-white shadow-lg"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus className="w-6 h-6 mr-2"/>
                        Tambah Kategori
                    </Button>
                </div>
                <div className="grid gap-4 grid-cols-1">
                    <Card>
                        <CardContent className="p-0 md:p-6">
                            {isLoading ? (
                                <div className="text-center py-4">Memuat data...</div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-xl text-center">Nama Kategori</TableHead>
                                            <TableHead className="text-xl text-center">Jumlah Produk</TableHead>
                                            <TableHead className="text-xl text-center">Tanggal Dibuat</TableHead>
                                            <TableHead className="text-xl text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {categories.map((category) => (
                                            <TableRow key={category.id}>
                                                <TableCell className="text-center">{category.category_name}</TableCell>
                                                <TableCell
                                                    className="text-center">{category.product_count} Produk</TableCell>
                                                <TableCell
                                                    className="text-center">{formatDate(category.created_at)}</TableCell>
                                                <TableCell className="text-right">
                                                    <TooltipProvider>
                                                        <div className="flex justify-end gap-2">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        onClick={() => {
                                                                            setCurrentCategory(category);
                                                                            setIsEditModalOpen(true);
                                                                        }}
                                                                    >
                                                                        <Pencil className="w-4 h-4"/>
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="bg-emerald-600">
                                                                    <Typography variant="p" className="text-background">Edit
                                                                        Kategori</Typography>
                                                                </TooltipContent>
                                                            </Tooltip>

                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="text-red-500 hover:text-red-600"
                                                                        onClick={() => {
                                                                            setCurrentCategory(category);
                                                                            setIsDeleteModalOpen(true);
                                                                        }}
                                                                    >
                                                                        <Trash2 className="w-4 h-4"/>
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="bg-emerald-600">
                                                                    <Typography variant="p" className="text-background">Hapus
                                                                        Kategori</Typography>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    </TooltipProvider>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent>
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-center text-[30px] font-bold leading-[36px]">Tambah
                            Kategori Baru</DialogTitle>
                        <Typography variant="p" className="text-left max-w-lg text-slate-500">
                            Tambahkan kategori baru untuk memudahkan pengorganisasian produk. Kategori baru akan
                            muncul di halaman produk.
                        </Typography>
                    </DialogHeader>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="categoryName" className="text-[18px] font-bold text-emerald-600">Nama
                                Kategori</Label>
                            <Input
                                id="categoryName"
                                name="categoryName"
                                required
                                placeholder="Masukkan nama kategori"
                                className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
                            />
                        </div>
                        <Button type="submit" className="w-full">Simpan</Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-center text-[30px] font-bold leading-[36px]">Edit
                            Kategori</DialogTitle>
                        <Typography variant="p" className="text-left max-w-lg text-slate-500">
                            Ubah nama kategori untuk memperbarui informasi kategori produk. Perubahan akan muncul di
                            halaman produk.
                        </Typography>
                    </DialogHeader>
                    <form onSubmit={handleEditCategory} className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="categoryName" className="text-[18px] font-bold text-emerald-600">Nama
                                Kategori</Label>
                            <Input
                                id="categoryName"
                                name="categoryName"
                                required
                                defaultValue={currentCategory?.category_name || ''}
                                placeholder="Masukkan nama kategori"
                                className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
                            />
                        </div>
                        <Button type="submit" className="w-full">Simpan Perubahan</Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-left text-[30px] font-bold leading-[36px]">Hapus
                            Kategori</DialogTitle>
                        <Typography variant="p" className="text-left max-w-lg text-slate-500">
                            Apakah Anda yakin ingin menghapus kategori ini? Kategori yang dihapus tidak dapat
                            dikembalikan.
                        </Typography>
                    </DialogHeader>
                    <div className="flex justify-end gap-4">
                        <Button
                            variant="secondary"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                handleDeleteCategory(currentCategory.id);
                            }}
                        >
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}