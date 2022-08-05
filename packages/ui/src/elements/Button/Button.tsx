import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "default" | "primary" | "secondary" | "warning";
  radius?: "default" | "rounded" | "pill";
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "default",
  radius = "default",
  onClick,
}: ButtonProps) => {
  const btnCls = clsx("py-1 px-6 font-semibold text-lg", {
    "bg-soilGreen-600/60 text-soilGreen-900 shadow-md shadow-soilGreen-800/30 hover:bg-soilGreen-500/60 hover:text-soilGreen-900 hover:shadow-sm":
      variant === "primary",
    "bg-soilBlue-600 text-white shadow-md shadow-soilBlue-800/30 hover:bg-soilBlue-500 hover:shadow-sm":
      variant === "secondary",
    "bg-soilOrange-600 text-white shadow-md shadow-soilOrange-800/30 hover:bg-soilOrange-500 hover:shadow-sm":
      variant === "warning",
    "border-2 shadow-md hover:shadow-sm": variant === "default",
    "rounded-full": radius === "pill",
    "rounded-lg": radius === "rounded",
    "rounded-md": radius === "default",
  });

  return (
    <button className={btnCls} onClick={onClick}>
      {children}
    </button>
  );
};
