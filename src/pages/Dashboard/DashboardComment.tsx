import React, {useState, useEffect, useCallback} from "react";
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
import {Checkbox} from "@/components/ui/checkbox";
import {Eye, Check, X, Trash2, Search} from "lucide-react";
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
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";
import {
    getCommentManagement,
    getDetailsCommentManagement,
    updateCommentManagement,
    deleteCommentManagement,
} from "@/services/commentManagement.js";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";

interface Comment {
    id: number;
    username: string;
    email: string;
    comment: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    is_approved: boolean;
    created_at: string;
    updated_at: string;
}

interface CommentTableProps {
    comments: Comment[];
    loading: boolean;
    error: string | null;
    formatDate: (date: string) => string;
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
    onViewDetail: (comment: Comment) => void;
}

export default function DashboardComment() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalData, setTotalData] = useState<number>(0);
    const [selectedComments, setSelectedComments] = useState<number[]>([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [filters, setFilters] = useState({
        keyword: "",
        page: 1,
        limit: 10,
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [currentComment, setCurrentComment] = useState<Comment | null>(null);
    const [isApprovedComment, setIsApprovedComment] = useState(false);
    const [isRejectedComment, setIsRejectedComment] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        limit: 10,
    });

    const {toast} = useToast();

    const fetchComments = async () => {
        try {
            setLoading(true);
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(
                    ([_, value]) => value !== "" && value !== null
                )
            );

            const {comments, pagination} = await getCommentManagement(cleanFilters);

            setComments(comments);
            setTotalData(pagination.total_data);
            setTotalPages(Math.ceil(pagination.total_data / filters.limit));
            setCurrentPage(filters.page);
            setError(null);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err instanceof Error ? "Tidak ada komentar yang sesuai" : "Gagal mengambil komentar");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = async (page) => {
        try {
            setLoading(true);
            setFilters((prev) => ({
                ...prev,
                page: page,
            }));

            console.log("Changing to page:", page);
            await fetchComments();
        } catch (error) {
            console.error("Page change error:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleFilterChange = (key: string, value: any) => {
        setFilters((prev) => {
            const newFilters = {
                ...prev,
                [key]: value || "",
                page: 1,
            };

            // Clean empty filters
            Object.keys(newFilters).forEach((k) => {
                if (newFilters[k] === "" || newFilters[k] === null) {
                    delete newFilters[k];
                }
            });

            return newFilters;
        });
    };

    useEffect(() => {
        fetchComments();
    }, [filters]);

    const handleApproveClick = (id) => {
        console.log("Approve clicked for:", id);
        const comment = comments.find((c) => c.id === id);
        if (comment) {
            setCurrentComment(comment);
            setIsApprovedComment(true);
        }
    };

    const handleRejectClick = (id: number) => {
        console.log("Reject clicked for:", id);
        const comment = comments.find((c) => c.id === id);
        if (comment) {
            setCurrentComment(comment);
            setIsRejectedComment(true);
        }
    };

    const handleModalClose = () => {
        setIsApprovedComment(false);
        setIsRejectedComment(false);
        setIsDeleteModalOpen(false);
        setCurrentComment(null);
    };

    const handleApprove = async (commentId) => {
        try {
            setLoading(true);
            console.log("Approving comment:", commentId);

            await updateCommentManagement(commentId, "approve");

            toast({
                title: "Berhasil",
                description: "Komentar berhasil disetujui",
            });

            await fetchComments();
            setIsApprovedComment(false);
            setCurrentComment(null);
        } catch (error) {
            console.error("Approve error:", error);
            toast({
                title: "Gagal",
                description: "Gagal menyetujui komentar",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (commentId) => {
        try {
            setLoading(true);
            console.log("Rejecting comment:", commentId);

            await updateCommentManagement(commentId, "reject");

            toast({
                title: "Berhasil",
                description: "Komentar berhasil ditolak",
                variant: "destructive",
            });

            await fetchComments();
            setIsRejectedComment(false);
            setCurrentComment(null);
        } catch (error) {
            console.error("Reject error:", error);
            toast({
                title: "Gagal",
                description: "Gagal menolak komentar",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = async (comment: Comment) => {
        try {
            setLoading(true);
            const detailData = await getDetailsCommentManagement(comment.id);
            setCurrentComment({
                ...detailData,
                status: detailData.status,
                created_at: detailData.created_at,
                updated_at: detailData.updated_at,
            });
            setIsDetailModalOpen(true);
        } catch (error) {
            toast({
                title: "Gagal",
                description: "Gagal memuat detail komentar",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteCommentManagement(commentId);
            fetchComments();
            toast({
                title: "Komentar Dihapus",
                description: "Komentar telah berhasil dihapus.",
            });
        } catch (error) {
            toast({
                title: "Gagal Menghapus Komentar",
                description: "Terjadi kesalahan saat menghapus komentar.",
                variant: "destructive",
            });
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        const day = days[date.getDay()];
        const dateNum = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}, ${dateNum} ${month} ${year}`;
    };

    const CommentTable: React.FC<CommentTableProps> = ({
                                                           comments,
                                                           loading,
                                                           error,
                                                           formatDate,
                                                           onApprove,
                                                           onReject,
                                                           onViewDetail,
                                                       }) => {
        if (loading) {
            return (
                <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                        <Typography variant="p-regular">Loading...</Typography>
                    </TableCell>
                </TableRow>
            );
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-red-500">
                        <Typography variant="p-regular">{error}</Typography>
                    </TableCell>
                </TableRow>
            );
        }

        if (comments.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                        <Typography variant="p-regular">Tidak ada komentar</Typography>
                    </TableCell>
                </TableRow>
            );
        }

        return (
            <>
                {comments.map((comment) => (
                    <TableRow key={comment.id}>
                        <TableCell>{comment.username}</TableCell>
                        <TableCell>{comment.email}</TableCell>
                        <TableCell>{formatDate(comment.created_at)}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    comment.status === "APPROVED" ? "success" : comment.status === "REJECTED" ? "destructive" : comment.status === "PENDING" ? "warning" : "secondary"
                                }
                            >
                                {comment.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <TooltipProvider>
                                <div className="flex gap-2 justify-center">
                                    {comment.status === "PENDING" ? (
                                        <>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => onApprove(comment.id)}
                                                    >
                                                        <Check className="w-4 h-4"/>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-emerald-600">
                                                    <p className="text-background">Setujui</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => onReject(comment.id)}
                                                    >
                                                        <X className="w-4 h-4"/>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-emerald-600">
                                                    <p className="text-background">Tolak</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <Typography variant="p-regular">
                                            {comment.status === "APPROVED" ? "Disetujui" : "Ditolak"}
                                        </Typography>
                                    )}
                                </div>
                            </TooltipProvider>
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-end gap-2">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => onViewDetail(comment)}
                                        >
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
                                            className="text-red-500 hover:text-red-600"
                                            onClick={() => {
                                                setCurrentComment(comment);
                                                setIsDeleteModalOpen(true);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4"/>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-emerald-600">
                                        <p className="text-background">Hapus Komentar</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
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
                                    Komentar
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
                            Manajemen Komentar
                        </Typography>
                        <Typography variant="p-regular" className="text-slate-700 mt-4">
                            Manajemen Komentar memungkinkan Anda untuk mengelola komentar yang
                            akan ditampilkan di halaman blog.
                        </Typography>
                    </div>
                    <div className="relative w-full sm:w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <Input
                            placeholder="Cari produk berdasarkan nama"
                            value={filters.keyword}
                            onChange={(e) => handleFilterChange("keyword", e.target.value)}
                            className="h-11 pl-10 text-emerald-600 border-2 border-emerald-500 w-full focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                </div>
                <div className="grid gap-4 grid-cols-1">
                    <Card>
                        <CardContent className="p-0 md:p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xl">Nama</TableHead>
                                        <TableHead className="text-xl">email</TableHead>
                                        <TableHead className="text-xl ">Tanggal Dibuat</TableHead>
                                        <TableHead className="text-xl">Status</TableHead>
                                        <TableHead className="text-xl text-center">Setujui</TableHead>
                                        <TableHead className="text-xl text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <CommentTable
                                        comments={comments}
                                        loading={loading}
                                        error={error}
                                        formatDate={formatDate}
                                        onApprove={handleApproveClick}
                                        onReject={handleRejectClick}
                                        onViewDetail={handleViewDetail}
                                    />
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {totalData > filters.limit && (
                    <div className="mt-4">
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

                                {Array.from({length: totalPages}, (_, i) => i + 1).map(
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

            <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-[30px] font-bold leading-[36px]">Detail
                            Komentar</DialogTitle>
                    </DialogHeader>
                    <Typography
                        variant="p-regular"
                        className="text-left text-slate-500 px-6"
                    >
                        Informasi detail komentar. Anda dapat melihat informasi lebih lanjut dan mengelola komentar ini.
                    </Typography>
                    {currentComment && (
                        <div className="grid gap-4">
                            {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                            {/*    <Label className="text-[16px] font-bold text-emerald-600">Status</Label>*/}
                            {/*    <div className="col-span-3">*/}
                            {/*        <Badge*/}
                            {/*            variant={*/}
                            {/*                currentComment.status === "APPROVED"*/}
                            {/*                    ? "success"*/}
                            {/*                    : currentComment.status === "REJECTED"*/}
                            {/*                        ? "destructive"*/}
                            {/*                        : "secondary"*/}
                            {/*            }*/}
                            {/*        >*/}
                            {/*            {currentComment.status}*/}
                            {/*        </Badge>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                            {/*    <Label className="text-[16px] font-bold text-emerald-600">Username</Label>*/}
                            {/*    <div className="col-span-3">{currentComment.username}</div>*/}
                            {/*</div>*/}
                            {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                            {/*    <Label className="text-[16px] font-bold text-emerald-600">Email</Label>*/}
                            {/*    <div className="col-span-3">{currentComment.email}</div>*/}
                            {/*</div>*/}
                            {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                            {/*    <Label className="text-[16px] font-bold text-emerald-600">Tanggal Dibuat</Label>*/}
                            {/*    <div className="col-span-3">*/}
                            {/*        {formatDate(currentComment.created_at)}*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="flex flex-col gap-2 px-6">
                                <Label className="text-[20px] font-bold text-emerald-600 mb-4">Komentar</Label>
                                <div className="col-span-3 text-justify whitespace-pre-wrap">
                                    {currentComment.comment}
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setIsDetailModalOpen(false)}
                        >
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isApprovedComment} onOpenChange={setIsApprovedComment}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Setujui Komentar</DialogTitle>
                    </DialogHeader>
                    <p>Apakah anda yakin ingin menyetujui komentar ini?</p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsApprovedComment(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={() => {
                                if (currentComment) {
                                    handleApprove(currentComment.id);
                                }
                            }}
                        >
                            Setuju
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isRejectedComment} onOpenChange={setIsRejectedComment}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tolak Komentar</DialogTitle>
                    </DialogHeader>
                    <p>Apakah anda yakin ingin menolak komentar ini?</p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsRejectedComment(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (currentComment) {
                                    handleReject(currentComment.id);
                                }
                            }}
                        >
                            Tolak
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus Komentar</DialogTitle>
                    </DialogHeader>
                    <p>Apakah anda yakin ingin menghapus komentar ini?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleModalClose}>
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (currentComment) {
                                    handleDeleteComment(currentComment.id);
                                    handleModalClose();
                                }
                            }}
                        >
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function bulkUpdateComments(pendingComments: number[], arg1: string) {
    throw new Error("Function not implemented.");
}
