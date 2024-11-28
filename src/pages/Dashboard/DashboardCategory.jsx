import React from "react";
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
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
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


export default function CategoryManagement() {
	const limitedCategories = categories.slice(0, 5);

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
					<Button variant="primary" className="text-white">
						<Plus className="w-6 h-6 mr-2" />
						Tambah Kategori
					</Button>
				</div>
				<div className="grid gap-4 grid-cols-1">
					<Card>
						<CardContent className="p-0 md:p-6">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="text-xl">Nama Kategori</TableHead>
										<TableHead className="text-xl">Jumlah Produk</TableHead>
										<TableHead className="text-xl">Status</TableHead>
										<TableHead className="text-xl">Tanggal Dibuat</TableHead>
										<TableHead className="text-xl text-right">Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{limitedCategories.map((category) => (
										<TableRow key={category.id}>
											<TableCell>{category.name}</TableCell>
											<TableCell>{category.productCount} Produk</TableCell>
											<TableCell>
												<Badge
													variant="outline"
													className="bg-green-50 text-green-700"
												>
													{category.status}
												</Badge>
											</TableCell>
											<TableCell>{category.createdAt}</TableCell>
											<TableCell className="text-right">
												<TooltipProvider>
													<div className="flex justify-end gap-2">
														<Tooltip>
															<TooltipTrigger asChild>
																<Button variant="outline" size="icon">
																	<Pencil className="w-4 h-4" />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>Edit Kategori</p>
															</TooltipContent>
														</Tooltip>

														<Tooltip>
															<TooltipTrigger asChild>
																<Button
																	variant="outline"
																	size="icon"
																	className="text-red-500 hover:text-red-600"
																>
																	<Trash2 className="w-4 h-4" />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>Hapus Kategori</p>
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
		</>
	);
}
