import {lazy} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LayoutSidebarDashboard from "@/components/layout/LayoutSidebarDashboard";
import lazyWrap from "@/router/lazyWrap";

const Home = lazy(() => import("@/pages/Home"));
const Statistic = lazy(() => import("@/pages/Statistic"));
const Prediction = lazy(() => import("@/pages/Prediction"));
const Products = lazy(() => import("@/pages/Produk/Products"));
const ProductDetails = lazy(() => import("@/pages/Produk/ProductDetails"));
const About = lazy(() => import("@/pages/About"));
const Errors = lazy(() => import("@/pages/Errors"));
const Login = lazy(() => import("@/pages/Aunt/Login"));
const DashboardHome = lazy(() => import("@/pages/Dashboard/DashboardHome"));
const DashboardCategory = lazy(() => import("@/pages/Dashboard/DashboardCategory"));
const DashboardProduct = lazy(() => import("@/pages/Dashboard/DashboardProduct"));

export default function Index() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={lazyWrap(Home)()}/>
                <Route path="/beranda" element={<Navigate to="/"/>}/>
                <Route path="/statistik" element={lazyWrap(Statistic)()}/>
                <Route path="/prediksi" element={lazyWrap(Prediction)()}/>
                <Route path="/produk" element={lazyWrap(Products)()}/>
                <Route path="/produk/:id" element={lazyWrap(ProductDetails)()}/>
                <Route path="/tentangkami" element={lazyWrap(About)()}/>
            </Route>
            <Route path="/dashboard" element={<LayoutSidebarDashboard/>}>
                <Route path="/dashboard" element={lazyWrap(DashboardHome)()}/>
                <Route path="/dashboard/category" element={lazyWrap(DashboardCategory)()}/>
                <Route path="/dashboard/produk" element={lazyWrap(DashboardProduct)()}/>
            </Route>
            <Route path="/login" element={lazyWrap(Login)()}/>
            <Route path={"*"} element={lazyWrap(Errors)()}/>
        </Routes>
    );
}