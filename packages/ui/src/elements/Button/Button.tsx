import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "default" | "primary" | "secondary" | "warning";
  radius?: "default" | "rounded" | "pill";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "default",
  radius = "default",
}: ButtonProps) => {
  const btnCls = clsx("py-1 px-6 font-semibold text-lg", {
    "bg-soilBlue-600 text-soilBlue-900 shadow-md shadow-soilBlue-800/50 hover:bg-soilBlue-500 hover:text-soilBlue-900 hover:shadow-sm":
      variant === "primary",
    "bg-soilGreen-600 text-soilGreen-900 shadow-md shadow-soilGreen-800/50 hover:bg-soilGreen-500 hover:text-soilGreen-900 hover:shadow-sm":
      variant === "secondary",
    "bg-soilOrange-600 text-soilOrange-900 shadow-md shadow-soilOrange-800/50 hover:bg-soilOrange-500 hover:text-soilOrange-900 hover:shadow-sm":
      variant === "warning",
    "border-2 shadow-md hover:shadow-sm": variant === "default",
    "rounded-full": radius === "pill",
    "rounded-xl": radius === "rounded",
    "rounded-md": radius === "default",
  });

  return <button className={btnCls}>{children}</button>;
};
