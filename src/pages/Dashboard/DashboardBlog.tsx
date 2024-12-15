import React, { useState, useEffect } from "react";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Eye, Plus, Search } from "lucide-react";
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
  getBlogManagement,
  createBlogManagement,
  updateBlogManagement,
  deleteBlogManagement,
    getBlogByIdManagement,
} from "@/services/blogManagement.js";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Editor } from "@/components/ui/editor";
import useDateStore from "@/store/useDateStore";

interface Blog {
  id: number;
  title: string;
  content: string;
  views: number;
  author: string;
  created_at: string;
  updated_at: string;
  img_file: string;
  created_by: string;
  total_comment: number;
}

interface BlogTableProps {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  formatDate: (date: string) => string;
  openEditModal: (Blog: Blog) => void;
  setCurrentBlog: (Blog: Blog) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

export default function DashboardBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  // @ts-ignore
  const {formatDate} = useDateStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    keyword: "",
    page: 1,
    limit: 5,
  });

  const [totalData, setTotalData] = useState<number>(0);
  const { toast } = useToast();

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== "" && value !== null
        )
      );

      const { blogs, pagination } = await getBlogManagement(cleanFilters);

      setBlogs(blogs);
      setTotalData(pagination.total_data);
      setTotalPages(Math.ceil(pagination.total_data / filters.limit));
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? "Blog tidak ditemukan saat ini" : "Gagal mengambil blog";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    console.log("Changing to page:", page);

    if (page < 1 || page > totalPages) {
      console.log("Invalid page number");
      return;
    }

    setFilters((prev) => {
      console.log("Updating filters from:", prev, "to page:", page); // Debug log
      return {
        ...prev,
        page: page,
      };
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [key]: value || "",
        page: 1,
      };

      Object.keys(newFilters).forEach((k) => {
        if (newFilters[k] === "" || newFilters[k] === null) {
          delete newFilters[k];
        }
      });

      return newFilters;
    });
  };

  const handleAddBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await createBlogManagement(formData);
      fetchBlogs();
      setIsAddModalOpen(false);
      toast({
        title: "Blog Berhasil Ditambahkan",
        description: "Blog baru telah berhasil ditambahkan.",
      });
    } catch (error) {
      toast({
        title: "Gagal Menambahkan Blog",
        description: "Terjadi kesalahan saat menambahkan Blog.",
        variant: "destructive",
      });
    }
  };

  const handleBlogDetails = async (blogId: number) => {
      try {
          const response = await getBlogByIdManagement(blogId);
          window.location.href = `/blog/${response}`;
      } catch (error) {
          toast({
              title: "Gagal Mengambil Detail Produk",
              description: "Terjadi kesalahan saat mengambil detail produk.",
              variant: "destructive",
          });
      }
  }

  const handleEditBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentBlog) return;
    const formData = new FormData(e.currentTarget);

    try {
      await updateBlogManagement(currentBlog.id, formData);
      fetchBlogs();
      setIsEditModalOpen(false);
      toast({
        title: "Blog Berhasil Diperbarui",
        description: "Blog telah berhasil diperbarui.",
      });
    } catch (error) {
      toast({
        title: "Gagal Memperbarui Blog",
        description: "Terjadi kesalahan saat memperbarui blog.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBlog = async (blogId: number) => {
    try {
      await deleteBlogManagement(blogId);
      setIsDeleteModalOpen(false);
      fetchBlogs();
      toast({
        title: "Blog Berhasil Dihapus",
        description: "Blog telah berhasil dihapus.",
      });
    } catch (error) {
      toast({
        title: "Gagal Menghapus Blog",
        description: "Terjadi kesalahan saat menghapus Blog.",
        variant: "destructive",
      });
    }
  };

  const openEditModal = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditModalOpen(true);
  };

  const BlogTable: React.FC<BlogTableProps> = ({
    blogs,
    loading,
    error,
    formatDate,
    openEditModal,
    setCurrentBlog,
    setIsDeleteModalOpen,
  }) => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-4">
            <Typography variant="p-regular">Loading...</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-4 text-red-500">
            <Typography variant="p-regular">{error}</Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (blogs.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-4 text-slate-700">
            <Typography variant="p-semibold">Tidak ada blog</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <>
        {blogs.map((blog) => (
          <TableRow key={blog.id}>
            <TableCell>
              <img
                src={blog.img_file}
                alt={blog.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </TableCell>
            {/*<TableCell>{blog.author}</TableCell>*/}
            <TableCell className="max-w-20">{blog.title}</TableCell>
            <TableCell className="text-center">
              {blog.views.toLocaleString("id-ID")}
            </TableCell>
            <TableCell className="text-center">
              {blog.total_comment.toLocaleString("id-ID")}
            </TableCell>{" "}
            <TableCell className="text-center">
              {formatDate(blog.created_at)}
            </TableCell>
            <TableCell>
              <TooltipProvider>
                <div className="flex justify-end gap-2">
                  <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon" onClick={
                                                () => handleBlogDetails(blog.id)
                                            }>
                                                <Eye className="w-4 h-4"/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-emerald-600">
                                            <p className="text-background">Lihat Detail</p>
                                        </TooltipContent>
                                    </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditModal(blog)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-emerald-600">
                      <p className="text-background">Edit Blog</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setCurrentBlog(blog);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-emerald-600">
                      <p className="text-background">Hapus Blog</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };

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
                  Blog
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
              Manajemen Blog
            </Typography>
            <Typography variant="p-regular" className="text-slate-700 mt-4">
              Manajemen Blog memungkinkan Anda untuk mengelola blog yang akan
              ditampilkan di halaman blog.
            </Typography>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 items-stretch sm:items-center">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Cari blog berdasarkan judul blog"
                value={filters.keyword}
                onChange={(e) => handleFilterChange("keyword", e.target.value)}
                className="h-11 pl-10 text-emerald-600 border-2 border-emerald-500 w-full focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <Button
              variant="primary"
              className="h-11 px-4 text-white shadow-lg flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors whitespace-nowrap"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="w-5 h-5" />
              Tambah Blog
            </Button>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1">
          <Card>
            <CardContent className="p-0 md:p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xl">Gambar</TableHead>
                    {/*<TableHead className="text-xl">Penulis</TableHead>*/}
                    <TableHead className="text-xl">Nama Blog</TableHead>
                    <TableHead className="text-xl text-center">
                      Di Baca
                    </TableHead>
                    <TableHead className="text-xl text-center">
                      Komentar
                    </TableHead>
                    <TableHead className="text-xl text-center">
                      Tanggal Dibuat
                    </TableHead>
                    <TableHead className="text-xl text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <BlogTable
                    blogs={blogs}
                    loading={loading}
                    error={error}
                    formatDate={formatDate}
                    openEditModal={openEditModal}
                    setCurrentBlog={setCurrentBlog}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                  />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {totalData > totalPages && (
          <div className="mb-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(filters.page - 1)}
                    className={
                      filters.page <= 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        className="cursor-pointer"
                        onClick={() => handlePageChange(page)}
                        isActive={filters.page === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(filters.page + 1)}
                    className={
                      filters.page >= totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-[30px] font-bold leading-[36px]">
              Tambah Blog Baru
            </DialogTitle>
            <Typography
              variant="p-regular"
              className="text-left text-slate-500"
            >
              Tambahkan blog baru ke dalam daftar blog yang tersedia. blog akan
              langsung tampil di halaman blog. blog yang ditambahkan dapat
              diubah atau dihapus kembali.
            </Typography>
          </DialogHeader>
          <form onSubmit={handleAddBlog}>
            <div className="flex flex-col gap-6">
              <div className="items-center justify-center rounded-lg gap-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="title"
                      className="text-[16px] font-bold text-emerald-600"
                    >
                      Judul
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                      placeholder="Masukkan judul blog"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="img_file"
                      className="text-[16px] font-bold text-emerald-600"
                    >
                      Gambar
                    </Label>
                    <Input
                      id="img_file"
                      name="img_file"
                      type="file"
                      className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                      placeholder="Url"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="space-y-4">
                  <Label
                    htmlFor="content"
                    className="text-[16px] font-bold text-emerald-600"
                  >
                    Konten Blog
                  </Label>
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <Editor
                      value=""
                      onChange={(content) => {
                        const textareaElement = document.getElementById(
                          "content"
                        ) as HTMLTextAreaElement;
                        if (textareaElement) {
                          textareaElement.value = content;
                        }
                      }}
                    />
                  </div>
                  <Textarea
                    id="content"
                    name="content"
                    className="col-span-3 min-h-[90px] text-justify text-slate-900 border border-slate-50 focus:border-slate-100"
                    placeholder="Masukkan konten blog"
                    rows={15}
                    style={{ display: "none" }}
                    required
                  />
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="destructive">
                      Batal
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="mb-3 md:mb-0">
                    Simpan
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-[30px] font-bold leading-[36px]">
              Edit Blog
            </DialogTitle>
            <Typography
              variant="p-regular"
              className="text-left text-slate-500"
            >
              Ubah detail blog yang ada di daftar blog yang tersedia.
            </Typography>
          </DialogHeader>
          <form onSubmit={handleEditBlog}>
            <div className="flex flex-col gap-6">
              <div className="items-center justify-center rounded-lg gap-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="title"
                      className="text-[16px] font-bold text-emerald-600"
                    >
                      Judul
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={currentBlog?.title}
                      className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                      placeholder="Masukkan judul blog"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="img_file"
                      className="text-[16px] font-bold text-emerald-600"
                    >
                      Gambar
                    </Label>
                    <Input
                      id="img_file"
                      name="img_file"
                      type="file"
                      className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="space-y-6">
                  <div className="editor-container">
                    <Label
                      htmlFor="content"
                      className="text-[16px] font-bold text-emerald-600 mb-2 block"
                    >
                      Konten Blog
                    </Label>

                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                      <Editor
                        value={currentBlog?.content || ""}
                        onChange={(content) => {
                          const textareaElement = document.getElementById(
                            "content"
                          ) as HTMLTextAreaElement;
                          if (textareaElement) {
                            textareaElement.value = content;
                          }
                        }}
                      />
                    </div>

                    <Textarea
                      id="content"
                      name="content"
                      defaultValue={currentBlog?.content}
                      style={{ display: "none" }}
                      required
                    />
                  </div>
                </div>

                <DialogFooter className="mt-8 flex justify-end gap-4">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      className="px-6 hover:opacity-90 transition-opacity"
                    >
                      Batal
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="px-6 bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  >
                    Simpan
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-left text-[30px] font-bold leading-[36px]">
              Hapus Blog
            </DialogTitle>
            <Typography
              variant="p-regular"
              className="text-left max-w-lg text-slate-500"
            >
              Apakah Anda yakin ingin menghapus blog ini? Blog yang dihapus
              tidak dapat dikembalikan.
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
                handleDeleteBlog(currentBlog.id);
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
