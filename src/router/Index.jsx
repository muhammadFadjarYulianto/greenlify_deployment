import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Errors from "@/pages/Errors";

export default function Index() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Navigate to="/" />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<Contact />} />
			<Route path={"*"} element={<Errors />} />
		</Routes>
	);
}
