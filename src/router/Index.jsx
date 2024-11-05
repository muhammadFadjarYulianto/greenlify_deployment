import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "@/view/Home";
import About from "@/view/About";
import Contact from "@/view/Contact";
import Errors from "@/view/Errors";

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
