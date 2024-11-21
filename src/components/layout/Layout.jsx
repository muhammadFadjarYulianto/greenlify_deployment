import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";

export default function Layout() {
	return (
		<div>
			<main>
				<Header />
				<Outlet />
				<Footer />
			</main>
		</div>
	);
}
