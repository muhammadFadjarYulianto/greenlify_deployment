import {lazy} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LayoutSidebarDashboard from "@/components/layout/LayoutSidebarDashboard";
import lazyWrap from "@/router/lazyWrap";

const Home = lazy(() => import("@/pages/Home"));
const Statistic = lazy(() => import("@/pages/Statistic"));
const Blog = lazy(() => import("@/pages/Blog/Blog"));
const BlogDetail = lazy(() => import("@/pages/Blog/BlogDetail"));
const Stepper = lazy(() => import("@/pages/Prediksi/Stepper"));
const Products = lazy(() => import("@/pages/Produk/Products"));
const ProductDetails = lazy(() => import("@/pages/Produk/ProductDetails"));
const About = lazy(() => import("@/pages/About"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/TermConditions"));
const Errors = lazy(() => import("@/pages/Errors"));
const Login = lazy(() => import("@/pages/Aunt/Login"));
const DashboardHome = lazy(() => import("@/pages/Dashboard/DashboardHome"));
const DashboardCategory = lazy(() => import("@/pages/Dashboard/DashboardCategory"));
const DashboardProduct = lazy(() => import("@/pages/Dashboard/DashboardProduct"));
const DashboardBlog = lazy(() => import("@/pages/Dashboard/DashboardBlog"));
const DashboardComment = lazy(() => import("@/pages/Dashboard/DashboardComment"));


export default function Index() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={lazyWrap(Home)()}/>
                <Route path="/beranda" element={<Navigate to="/"/>}/>
                <Route path="/blog" element={lazyWrap(Blog)()}/>
                <Route path="/blog/:id" element={lazyWrap(BlogDetail)()}/>
                <Route path="/statistik" element={lazyWrap(Statistic)()}/>
                <Route path="/prediksi" element={lazyWrap(Stepper)()}/>
                <Route path="/produk" element={lazyWrap(Products)()}/>
                <Route path="/produk/:id" element={lazyWrap(ProductDetails)()}/>
                <Route path="/tentangkami" element={lazyWrap(About)()}/>
                <Route path="/privacy+policy" element={lazyWrap(PrivacyPolicy)()}/>
                <Route path="/terms+conditions" element={lazyWrap(TermsConditions)()}/>
            </Route>
            <Route path="/dashboard" element={<LayoutSidebarDashboard/>}>
                <Route path="/dashboard" element={lazyWrap(DashboardHome)()}/>
                <Route path="/dashboard/category" element={lazyWrap(DashboardCategory)()}/>
                <Route path="/dashboard/produk" element={lazyWrap(DashboardProduct)()}/>
                <Route path="/dashboard/blog" element={lazyWrap(DashboardBlog)()}/>
                <Route path="/dashboard/comment" element={lazyWrap(DashboardComment)()}/>
            </Route>
            <Route path="/login" element={lazyWrap(Login)()}/>
            <Route path={"*"} element={lazyWrap(Errors)()}/>
        </Routes>
    );
}