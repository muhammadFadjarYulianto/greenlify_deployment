import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				primary: "bg-emerald-500 text-white hover:bg-emerald-600",
				secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
				destructive: "bg-red-500 text-white hover:bg-red-600",
				outline:
					"border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-600 hover:text-white",
				subtle: "bg-gray-200 text-gray-700 hover:bg-gray-300",
				ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
				link: "text-blue-500 underline hover:text-blue-600",
			},
			size: {
				sm: "h-8 px-3 text-xs",
				md: "h-10 px-4 text-sm",
				lg: "h-12 px-6 text-lg",
				icon: "h-10 w-10 p-2",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
