import React from "react";
import { Typography } from "@/components/ui/Typography";

export default function DashboardHome() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<Typography variant="h1" className="text-slate-900">
				Dashboard
			</Typography>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-slate-300" />
				<div className="aspect-video rounded-xl bg-slate-300" />
				<div className="aspect-video rounded-xl bg-slate-300" />
			</div>
			<div className="min-h-[100vh] flex-1 rounded-xl bg-slate-300 md:min-h-min" />
		</div>
	);
}
