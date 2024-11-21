import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronDownIcon } from "lucide-react";
import { ChevronsUpDownIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Chart from "react-apexcharts";

const yearData = {
  "Tahun 2023": [
    { province: "Aceh", amount: 6500000 },
    { province: "Sumatera Utara", amount: 3750000 },
    { province: "Sumatera Barat", amount: 4500000 },
    { province: "Riau", amount: 4500000 },
    { province: "Jambi", amount: 6500000 },
    { province: "Sumatera Selatan", amount: 3750000 },
    { province: "Lampung", amount: 4500000 },
    { province: "Kepulauan Riau", amount: 4500000 },
    { province: "DKI Jakarta", amount: 6500000 },
    { province: "Jawa Barat", amount: 3750000 },
    { province: "Jawa Tengah", amount: 4500000 },
    { province: "D.I. Yogyakarta", amount: 4500000 },
    { province: "Jawa Timur", amount: 6500000 },
    { province: "Banten", amount: 3750000 },
    { province: "Bali", amount: 4500000 },
    { province: "Nusa Tenggara Barat", amount: 7000000 },
    { province: "Nusa Tenggara Timur", amount: 3750000 },
    { province: "Kalimantan Barat", amount: 4500000 },
    { province: "Kalimantan Tengah", amount: 4500000 },
    { province: "Kalimantan Selatan", amount: 6500000 },
    { province: "Kalimantan Timur", amount: 3750000 },
    { province: "Kalimantan Utara", amount: 4500000 },
    { province: "Sulawesi Utara", amount: 4500000 },
    { province: "Sulawesi Tengah", amount: 6500000 },
    { province: "Sulawesi Selatan", amount: 3750000 },
    { province: "Sulawesi Tenggara", amount: 4500000 },
    { province: "Sulawesi Barat", amount: 6500000 },
    { province: "Gorontalo", amount: 3750000 },
    { province: "Maluku", amount: 4500000 },
    { province: "Maluku Utara", amount: 4500000 },
    { province: "Papua Barat", amount: 4500000 },
    { province: "Sulawesi Barat", amount: 4500000 },
    { province: "Papua", amount: 6500000 },
  ],
};

const pieChartDataByYear = {
  2023: {
    series: [7.07, 2.47, 2.53, 2.9, 3.23, 19.19, 10.8, 12.03, 39.78],
    options: {
      chart: {
        type: "pie",
        toolbar: {
          show: false,
        },
      },
      labels: [
        "Lainnya",
        "Kaca",
        "Karet/Kulit",
        "Kain",
        "Logam",
        "Plastik",
        "Kertas/Karton",
        "Kayu/Ranting",
        "Sisa Makanan",
      ],
      colors: [
        "var(--emerald-700)",
        "var(--emerald-600)",
        "var(--emerald-500)",
        "var(--emerald-400)",
        "var(--emerald-300)",
        "var(--emerald-200)",
        "var(--emerald-100)",
      ],
      legend: {
        position: "bottom",
        labels: {
          colors: "#333", // Warna teks legend
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(2)}%`,
      },
    },
  },
};

const data = {
  "Tahun 2023": [
    {
      province: "Aceh",
      kabupaten: "Kab. Aceh Selatan",
      data: {
        sisaMakanan: 30.08,
        kayuRanting: 12.29,
        kertasKarton: 13.1,
        plastik: 16.33,
        logam: 6.4,
        lainnya: 7.6,
      },
    },
    {
      province: "Aceh",
      kabupaten: "Kab. Aceh Tenggara",
      data: {
        sisaMakanan: 50.0,
        kayuRanting: 5.0,
        kertasKarton: 10.0,
        plastik: 22.0,
        logam: 7.0,
        lainnya: "-",
      },
    },
    {
      province: "Aceh",
      kabupaten: "Kab. Aceh Timur",
      data: {
        sisaMakanan: 37.0,
        kayuRanting: 14.0,
        kertasKarton: 5.0,
        plastik: 26.0,
        logam: 5.0,
        lainnya: 4.0,
      },
    },
    {
      province: "Aceh",
      kabupaten: "Kab. Aceh Tengah",
      data: {
        sisaMakanan: 22.0,
        kayuRanting: 18.0,
        kertasKarton: 7.0,
        plastik: 26.0,
        logam: 3.0,
        lainnya: "-",
      },
    },
    {
      province: "Aceh",
      kabupaten: "Kab. Aceh Barat",
      data: {
        sisaMakanan: 48.0,
        kayuRanting: 10.0,
        kertasKarton: 7.0,
        plastik: 22.0,
        logam: 4.0,
        lainnya: 2.0,
      },
    },
    {
      province: "Aceh",
      kabupaten: "Kab. Aceh Besar",
      data: {
        sisaMakanan: 25.5,
        kayuRanting: 25.5,
        kertasKarton: 9.5,
        plastik: 21.6,
        logam: 5.1,
        lainnya: 2.5,
      },
    },
  ],
};

const Statistic = () => {
  const [selectedYear, setSelectedYear] = useState("Tahun 2023");
  const year = ["Tahun 2023", "Tahun 2022", "Tahun 2021", "Tahun 2020"];

  const [selectedOption, setSelectedOption] = useState("10");
  const options = ["10", "25", "50", "100", "All"];

  const numericYear = parseInt(selectedYear.replace("Tahun ", ""), 10);
  const pieChartData = pieChartDataByYear[numericYear] || {
    series: [],
    options: {},
  };

  return (
    <main>
      <Header />
      <div className="w-full mt-[66px] h-auto flex flex-col items-center gap-[33px]">
        <div className="max-w-3x1 text-center lg:text-center">
          <Typography variant="title">
            <strong className="text-emerald-700">Statistik</strong> Sampah
          </Typography>
        </div>
        <div className="max-w-4xl text-center lg:text-center">
          <Typography variant="p">
            Tahukah Anda bahwa setiap harinya, jutaan ton sampah dihasilkan dan
            sebagian besar berakhir mencemari alam? Di sini, kami menampilkan
            data nyata tentang dampak sampah terhadap lingkungan, dari jumlah
            limbah plastik yang mengotori lautan hingga tingkat daur ulang yang
            masih jauh dari optimal. Melalui statistik ini, kami mengajak Anda
            untuk lebih peduli, mengambil langkah kecil, dan bersama-sama
            menciptakan perubahan besar.
          </Typography>
        </div>
      </div>

      {/* H2 */}
      <div className="w-full mt-[66px] h-auto flex flex-col items-center">
        <div className="flex justify-center items-center max-w-4xl px-4">
          <Typography variant="h2">
            <strong className="text-emerald-700">Data Timbul Sampah</strong>
          </Typography>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className="w-full h-auto p-6">
        <div className="flex justify-start items-center max-w-4xl px-16">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="primary"
                size="md"
                className="flex items-center gap-2"
              >
                {selectedYear}
                <ChevronDownIcon className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-slate-50 shadow-md rounded-md z-10"
              sideOffset={5}
            >
              {year.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => setSelectedYear(item)}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedYear === item ? "font-bold text-emerald-600" : ""
                  }`}
                >
                  {selectedYear === item && "✔"} {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-auto px-16 py-5 flex flex-col items-center">
        <ResponsiveContainer width="100%" height={600}>
          {selectedYear && (
            <BarChart data={yearData[selectedYear]}>
              <CartesianGrid strokeDasharray="0 0" />
              <XAxis
                dataKey="province"
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 12 }}
                height={150}
              />
              <YAxis width={65} />
              <Tooltip />
              <Bar dataKey="amount" fill="var(--emerald-400)" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="w-full mt-10 px-16 items-center text-center">
        <Table>
          <TableHeader className="bg-emerald-700 text-white">
            <TableRow>
              <TableHead className="text-center">Tahun</TableHead>
              <TableHead className="text-center">Provinsi</TableHead>
              <TableHead className="text-center">
                Timbulan Sampah Tahunan
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {yearData[selectedYear]?.slice(0, 5).map((row, index) => (
              <TableRow
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-emerald-700 bg-opacity-0"
                    : "bg-emerald-700 bg-opacity-10"
                }
              >
                <TableCell>{selectedYear}</TableCell>
                <TableCell>{row.province}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* H2 */}
      <div className="w-full mt-[66px] h-auto flex flex-col items-center">
        <div className="flex justify-center items-center max-w-4xl px-4 text-center">
          <Typography variant="h2">
            <strong className="text-emerald-700">
              Komposisi Sampah Berdasarkan Jenis Sampah
            </strong>
          </Typography>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className="w-full h-auto p-6">
        <div className="flex justify-start items-center max-w-4xl px-16">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="primary"
                size="md"
                className="flex items-center gap-2"
              >
                {selectedYear}
                <ChevronDownIcon className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-slate-50 shadow-md rounded-md z-10"
              sideOffset={5}
            >
              {year.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => setSelectedYear(item)}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedYear === item ? "font-bold text-emerald-600" : ""
                  }`}
                >
                  {selectedYear === item && "✔"} {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Pie Chart */}
      <div className="w-full h-auto px-16 py-5 flex flex-col items-center">
        {pieChartData.series.length > 0 ? (
          <div className="w-full max-w-lg">
            <Chart
              options={pieChartData.options}
              series={pieChartData.series}
              type="pie"
              width="100%"
            />
          </div>
        ) : (
          <p>Data tidak tersedia untuk {selectedYear}</p>
        )}
      </div>

      {/* Dropdown Menu & Table */}
      <div className="w-full h-auto p-6">
        <div className="flex justify-end items-center px-16">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="md"
                className="flex items-center gap-2"
              >
                <span>Show: {selectedOption}</span>
                <ChevronsUpDownIcon className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white shadow-lg w-32 rounded-md p-1 border border-gray-200 z-10"
              sideOffset={5}
            >
              {options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`cursor-pointer px-4 py-2 text-sm rounded-md ${
                    selectedOption === option
                      ? "bg-emerald-100 text-emerald-700 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {selectedOption === option && "✔"} {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full mt-5 px-16 items-center text-center">
          <Table>
            <TableHeader className="bg-emerald-700 text-white">
              <TableRow>
                <TableHead className="text-center">Tahun</TableHead>
                <TableHead className="text-center">Provinsi</TableHead>
                <TableHead className="text-center">Kabupaten/Kota</TableHead>
                <TableHead className="text-center">Sisa Makanan(%)</TableHead>
                <TableHead className="text-center">Kayu/Ranting(%)</TableHead>
                <TableHead className="text-center">Kertas/Karton(%)</TableHead>
                <TableHead className="text-center">Plastik(%)</TableHead>
                <TableHead className="text-center">Logam(%)</TableHead>
                <TableHead className="text-center">Lainnya(%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data[selectedYear]
                ?.slice(0, selectedOption)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-emerald-700 bg-opacity-0"
                        : "bg-emerald-700 bg-opacity-10"
                    }
                  >
                    <TableCell>{selectedYear}</TableCell>
                    <TableCell>{row.province}</TableCell>
                    <TableCell>{row.kabupaten}</TableCell>
                    <TableCell>{row.data.sisaMakanan}</TableCell>
                    <TableCell>{row.data.kayuRanting}</TableCell>
                    <TableCell>{row.data.kertasKarton}</TableCell>
                    <TableCell>{row.data.plastik}</TableCell>
                    <TableCell>{row.data.logam}</TableCell>
                    <TableCell>{row.data.lainnya}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Statistic;
