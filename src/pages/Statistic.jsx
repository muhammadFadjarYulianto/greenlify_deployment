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
import BarChartComponent from "../components/layout/BarChartComponent ";
import PieChartComponent from "../components/layout/PieChartComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import pieChartDataByYear from "../../public/data/pieChartData.js";
import compositionData from "../../public/data/CompositionData.js";
import rubbishData from "../../public/data/rubbishData.js";
import barChartDataByYear from "../../public/data/barChartData.js";

const Statistic = () => {
  const [selectedYear, setSelectedYear] = useState("Tahun 2023");
  const year = ["Tahun 2023", "Tahun 2022", "Tahun 2021", "Tahun 2020"];

  const barChartData = barChartDataByYear[selectedYear]?.series[0]?.data || [];
  const categories = barChartDataByYear[selectedYear]?.categories || [];

  const formattedData = barChartData.map((value, index) => ({
    province: categories[index],
    "Timbulan Sampah (Ton)": value,
  }));

  const [selectedOption, setSelectedOption] = useState("10");
  const options = ["10", "25", "50", "100"];

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
        {/* Header */}
        <div className="flex justify-center items-center max-w-4xl px-4">
          <Typography variant="h2" className="text-center">
            <strong className="text-emerald-700">Data Timbulan Sampah</strong>
          </Typography>
        </div>

        {/* Dropdown Menu */}
        <div className="w-full h-auto p-4 md:p-6">
          <div className="flex justify-center md:justify-start items-center max-w-4xl px-4 md:px-16">
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
        <div className="w-full h-auto px-4 md:px-16 py-5 flex flex-col items-center">
          <BarChartComponent data={formattedData} />
        </div>

        {/* Table */}
        <div className="w-full px-4 md:px-16 items-center text-center">
          <div className="overflow-x-auto">
            <Table className="table-no-hover w-full">
              <TableHeader className="bg-emerald-700 text-white">
                <TableRow>
                  <TableHead className="text-center">Tahun</TableHead>
                  <TableHead className="text-center">Provinsi</TableHead>
                  <TableHead className="text-center">Kabupaten/Kota</TableHead>
                  <TableHead className="text-center">
                    Timbulan Sampah Harian (Ton)
                  </TableHead>
                  <TableHead className="text-center">
                    Timbulan Sampah Tahunan (Ton)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rubbishData[selectedYear]?.slice(0, 5).map((row, index) => (
                  <TableRow
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-emerald-700 bg-opacity-0"
                        : "bg-emerald-700 bg-opacity-10"
                    }`}
                  >
                    <TableCell>{selectedYear}</TableCell>
                    <TableCell>{row.province}</TableCell>
                    <TableCell>{row.kabupaten}</TableCell>
                    <TableCell>
                      {row.data["Timbulan Sampah Harian (Ton)"]}
                    </TableCell>
                    <TableCell>
                      {row.data["Timbulan Sampah Tahunan (Ton)"]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="w-full mt-[66px] h-auto flex flex-col items-center">
        {/* Header */}
        <div className="flex justify-center items-center max-w-4xl px-4 text-center">
          <Typography variant="h2">
            <strong className="text-emerald-700">
              Komposisi Sampah Berdasarkan Jenis Sampah
            </strong>
          </Typography>
        </div>

        {/* Pie Chart */}
        <div className="w-full h-auto px-4 md:px-16 py-5 flex flex-col items-center">
          <PieChartComponent pieChartData={pieChartData} />
        </div>

        {/* Dropdown Menu */}
        <div className="w-full h-auto px-4 md:px-6 py-5">
          {/* Dropdown Menu */}
          <div className="flex justify-end items-center px-16 ">
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

          {/* Table */}
          <div className="w-full mt-4 px-4 md:px-6 lg:px-16">
            <div className="overflow-x-auto">
              <Table className="table-auto w-full border-collapse border border-gray-200">
                {/* Table Header */}
                <TableHeader className="bg-emerald-700 text-white">
                  <TableRow>
                    <TableHead className="text-center px-2 py-3 border border-gray-300">
                      Tahun
                    </TableHead>
                    <TableHead className="text-center px-2 py-3 border border-gray-300">
                      Provinsi
                    </TableHead>
                    <TableHead className="text-center px-2 py-3 border border-gray-300">
                      Kabupaten/Kota
                    </TableHead>
                    <TableHead className="text-center px-2 py-3 border border-gray-300">
                      Sisa Makanan (%)
                    </TableHead>
                    <TableHead className="text-center px-2 py-3 border border-gray-300">
                      Kayu/Ranting (%)
                    </TableHead>
                    <TableHead className="text-center px-2 py-3 border border-gray-300">
                      Kertas/Karton (%)
                    </TableHead>
                    <TableHead className="text-center px-2 py-3 border border-gray-300">
                      Plastik (%)
                    </TableHead>
                    <TableHead className="text-center px-2 py-3 border border-gray-300">
                      Logam (%)
                    </TableHead>
                    <TableHead className="text-center px-2 py-3 border border-gray-300">
                      Lainnya (%)
                    </TableHead>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                  {compositionData[selectedYear]
                    ?.slice(0, selectedOption)
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        className={`${
                          index % 2 === 0
                            ? "bg-emerald-700 bg-opacity-0"
                            : "bg-emerald-700 bg-opacity-10"
                        }`}
                      >
                        <TableCell className="text-center px-2 py-3 border border-gray-300">
                          {selectedYear}
                        </TableCell>
                        <TableCell className="text-center px-2 py-3 border border-gray-300">
                          {row.province}
                        </TableCell>
                        <TableCell className="text-center px-2 py-3 border border-gray-300">
                          {row.kabupaten}
                        </TableCell>
                        <TableCell className="text-center px-2 py-3 border border-gray-300">
                          {row.data.sisaMakanan}
                        </TableCell>
                        <TableCell className="text-center px-2 py-3 border border-gray-300">
                          {row.data.kayuRanting}
                        </TableCell>
                        <TableCell className="text-center px-2 py-3 border border-gray-300">
                          {row.data.kertasKarton}
                        </TableCell>
                        <TableCell className="text-center px-2 py-3 border border-gray-300">
                          {row.data.plastik}
                        </TableCell>
                        <TableCell className="text-center px-2 py-3 border border-gray-300">
                          {row.data.logam}
                        </TableCell>
                        <TableCell className="text-center px-2 py-3 border border-gray-300">
                          {row.data.lainnya}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Statistic;
