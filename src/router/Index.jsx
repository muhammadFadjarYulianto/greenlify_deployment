import {lazy} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
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
const Members = lazy(() => import("@/pages/Members"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/TermConditions"));
const Errors = lazy(() => import("@/pages/Errors"));
const Login = lazy(() => import("@/pages/Aunt/Login"));
const DashboardHome = lazy(() => import("@/pages/Dashboard/DashboardHome"));
const DashboardCategory = lazy(() => import("@/pages/Dashboard/DashboardCategory"));
const DashboardProduct = lazy(() => import("@/pages/Dashboard/DashboardProduct"));
const DashboardBlog = lazy(() => import("@/pages/Dashboard/DashboardBlog"));
// const DashboardComment = lazy(() => import("@/pages/Dashboard/DashboardComment"));
const DashboardMembers = lazy(() => import("@/pages/Dashboard/DashboardKeanggotaan"));


export default function Index() {
    return (
        <Router>
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
                    <Route path="/anggotakami" element={lazyWrap(Members)()}/>
                    <Route path="/privacy+policy" element={lazyWrap(PrivacyPolicy)()}/>
                    <Route path="/terms+conditions" element={lazyWrap(TermsConditions)()}/>
                </Route>
                <Route path="/dashboard" element={<LayoutSidebarDashboard/>}>
                    <Route index element={lazyWrap(DashboardHome)()}/>
                    <Route path="category" element={lazyWrap(DashboardCategory)()}/>
                    <Route path="member" element={lazyWrap(DashboardMembers)()}/>
                    <Route path="produk" element={lazyWrap(DashboardProduct)()}/>
                    <Route path="blog" element={lazyWrap(DashboardBlog)()}/>
                    {/*<Route path="/dashboard/comment" element={lazyWrap(DashboardComment)()}/>*/}
                </Route>
                <Route path="/login" element={lazyWrap(Login)()}/>
                <Route path={"*"} element={lazyWrap(Errors)()}/>
            </Routes>
        </Router>
    );
}