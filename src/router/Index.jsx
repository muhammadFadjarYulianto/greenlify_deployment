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
import LayoutSidebarDashboard from "@/components/layout/LayoutSidebarDashboard.jsx";
import DashboardHome from "@/pages/Dashboard/DashboardHome";
import DashboardProduct from "@/pages/Dashboard/DashboardProduct";

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
			</Route>
			<Route path="/dashboard" element={<LayoutSidebarDashboard />}>
				<Route path="/dashboard" element={<DashboardHome />} />
				<Route path="/dashboard/produk" element={<DashboardProduct />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path={"*"} element={<Errors />} />
		</Routes>
	);
}
