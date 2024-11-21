import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import Home from "@/pages/Home.jsx";
import Statistic from "@/pages/Statistic";
import Prediction from "@/pages/Prediction";
import Product from "@/pages/Product";
import About from "@/pages/About";
import Errors from "@/pages/Errors";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/beranda" element={<Navigate to="/" />} />
				<Route path="/statistik" element={<Statistic />} />
				<Route path="/prediksi" element={<Prediction />} />
				<Route path="/produk" element={<Product />} />
				<Route path="/tentangkami" element={<About />} />
				<Route path={"*"} element={<Errors />} />
			</Route>
		</Routes>
	);
}
