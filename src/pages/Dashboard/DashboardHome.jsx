import React from "react";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Brain, ScanLine, Store } from "lucide-react";
import { LineChart, Line } from "recharts";
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

const data = [
	{ value: 400 },
	{ value: 300 },
	{ value: 500 },
	{ value: 450 },
	{ value: 470 },
	{ value: 480 },
	{ value: 600 },
];

export default function DashboardHome() {
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
								<BreadcrumbPage className="text-[16px] font-normal leading-[28px]">
									Dashboard
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<Typography variant="h1" className="text-4xl lg:text-5xl">
					Dashboard
				</Typography>
				<Typography variant="p" className="text-slate-700">
					Berikut adalah data tentang penggunaan aplikasi dan performa AI yang
					dapat membantu Anda dalam mengambil keputusan.
				</Typography>
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-xl">Total Scan Hari Ini</CardTitle>
							<ScanLine className="h-6 w-6" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">1,234</div>
							<p className="text-xs text-muted-foreground">
								+12.5% dari kemarin
							</p>
							<div className="h-16 mt-4">
								<LineChart width={160} height={60} data={data}>
									<Line
										type="monotone"
										dataKey="value"
										stroke="#000"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-xl">Total Merchant Aktif</CardTitle>
							<Store className="h-6 w-6" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">48</div>
							<p className="text-xs text-muted-foreground">+2 merchant baru</p>
							<div className="h-16 mt-4">
								<LineChart width={160} height={60} data={data}>
									<Line
										type="monotone"
										dataKey="value"
										stroke="#000"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-xl">Akurasi Model AI</CardTitle>
							<Brain className="h-6 w-6" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">95.8%</div>
							<p className="text-xs text-muted-foreground">
								-0.5% dari rata-rata
							</p>
							<div className="h-16 mt-4">
								<LineChart width={160} height={60} data={data}>
									<Line
										type="monotone"
										dataKey="value"
										stroke="#000"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="grid gap-4 grid-cols-1">
					<Card>
						<CardHeader className="p-0 mb-4">
							<CardTitle className="text-3xl">Riwayat Scan Terakhir</CardTitle>
							<Typography variant="p" className="text-emerald-700">
								Riwayat scan terakhir yang dilakukan oleh pengguna beserta
								rekomendasi dan akurasi AI.
							</Typography>
						</CardHeader>
						<CardContent className="p-0 md:p-6">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Waktu</TableHead>
										<TableHead>Jenis Sampah</TableHead>
										<TableHead>Rekomendasi</TableHead>
										<TableHead>Akurasi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>10:45</TableCell>
										<TableCell>Botol Plastik</TableCell>
										<TableCell>Daur Ulang</TableCell>
										<TableCell>
											<Badge>98%</Badge>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>10:30</TableCell>
										<TableCell>Kardus</TableCell>
										<TableCell>Kompos</TableCell>
										<TableCell>
											<Badge>96%</Badge>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>10:15</TableCell>
										<TableCell>Kaleng</TableCell>
										<TableCell>Daur Ulang</TableCell>
										<TableCell>
											<Badge>97%</Badge>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>10:00</TableCell>
										<TableCell>Sampah Organik</TableCell>
										<TableCell>Kompos</TableCell>
										<TableCell>
											<Badge>95%</Badge>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
