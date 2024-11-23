import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Statistic from "@/pages/Statistic";
import Prediction from "@/pages/Prediction";
import Products from "@/pages/Produk/Products";
import ProductDetails from "@/pages/Produk/ProductDetails";
import About from "@/pages/About";
import Errors from "@/pages/Errors";
import Login from "@/pages/Aunt/Login";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import DashboardHome from "@/pages/Dashboard/DashboardHome";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/beranda" element={<Navigate to="/" />} />
				<Route path="/statistik" element={<Statistic />} />
				<Route path="/prediksi" element={<Prediction />} />
				<Route path="/produk" element={<Products />} />
				<Route path="/produk/:id" element={<ProductDetails />} />
				<Route path="/tentangkami" element={<About />} />
				<Route path={"*"} element={<Errors />} />
			</Route>
			<Route path="/dashboard" element={<LayoutDashboard />}>
				<Route path="/dashboard" element={<DashboardHome />} />
			</Route>
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}
