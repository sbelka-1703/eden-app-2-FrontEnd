import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "default" | "primary" | "secondary" | "tertiary";
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
  const btnCls = clsx("py-1 px-6 font-Inter text-soilBody flex", {
    "bg-accentColor text-soilGreen  hover:bg-darkGreen hover:text-white":
      variant === "primary",
    "text-darkGreen hover:text-white  border border-darkGreen hover:bg-darkGreen":
      variant === "secondary",
    "bg-soilGray text-darkGreen hover:text-white  hover:bg-darkGreen":
      variant === "tertiary",
    "border-2": variant === "default",
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
