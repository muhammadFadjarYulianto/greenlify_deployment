import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type React from "react";
import { forwardRef } from "react";

const typographyVariants = cva("", {
	variants: {
		variant: {
			title: "text-[64px] font-bold leading-[64px]",
			h1: "text-[48px] font-bold leading-[48px]",
			h2: "text-[30px] font-bold leading-[36px]",
			h3: "text-[24px] font-bold leading-[32px]",
			h4: "text-[20px] font-bold leading-[28px]",
			"p-semibold": "text-[16px] font-semibold leading-[28px]",
			"p-regular": "text-[16px] font-normal leading-[28px]",
			blockquote: "text-[16px] italic leading-[24px]",
			lead: "text-[20px] font-normal leading-[28px]",
			large: "text-[18px] font-normal leading-[28px]",
			small: "text-[14px] font-normal leading-[14px]",
			subtle: "text-[14px] font-normal leading-[20px]",
		},
		type: {
			description: "text-slate-700",
			title: "text-primary-600 dark:text-primary-500",
			secondary: "text-secondary-800 dark:text-secondary-100",
			default: "text-slate-900 dark:text-slate-50",
			"small-description": "text-muted-foreground text-sm leading-tight",
			underline:
				"cursor-pointer underline decoration-2 decoration-current underline-offset-2",
			quote: "italic",
		},
	},
	defaultVariants: {
		variant: "p-regular",
		type: "default",
	},
});

export type TypographyAlias =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "p"
	| "span";

export type DefaultTypography = Record<
	TypographyAlias,
	VariantProps<typeof typographyVariants>["variant"]
>;

export interface TypographyProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof typographyVariants> {
	as?: TypographyAlias;
	asChild?: boolean;
}

const defaultTypography: DefaultTypography = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h4",
	h6: "h4",
	p: "p-regular",
	span: "p-regular",
};

const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
	(
		{ variant, type, className, as = "p", children, asChild, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : as;

		return (
			<Comp
				className={cn(
					typographyVariants({
						variant: variant ?? defaultTypography[as],
						type,
						className,
					}),
				)}
				ref={ref}
				{...props}
			>
				{children}
			</Comp>
		);
	},
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
