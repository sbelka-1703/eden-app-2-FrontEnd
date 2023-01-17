import clsx from "clsx";
import { ButtonHTMLAttributes, CSSProperties } from "react";

type ButtonProps = {
  variant?: "default" | "primary" | "secondary" | "tertiary";
  radius?: "default" | "rounded" | "pill";
  size?: "lg" | "md" | "sm";
  className?: string;
  disabled?: boolean;
  // loading?: boolean;
  style?: CSSProperties;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "default",
  radius = "default",
  size = "lg",
  className,
  disabled,
  // loading,
  onClick,
  style,
}: ButtonProps) => {
  const btnCls = clsx(
    {
      "text-xs px-2": size === "sm",
      "px-3": size === "md",
      "px-6": size === "lg",
    },
    className,
    "py-1 font-Inter text-darkGreen flex font-medium",
    {
      "bg-accentColor text-soilGreen border-2 border-accentColor hover:border-darkGreen hover:bg-darkGreen hover:text-white":
        variant === "primary",
      "text-darkGreen hover:text-white border-2 border-darkGreen hover:bg-darkGreen":
        variant === "secondary",
      "bg-soilGray text-darkGreen hover:text-white hover:bg-darkGreen":
        variant === "tertiary",
      "border-2": variant === "default",
      "rounded-full": radius === "pill",
      "rounded-lg": radius === "rounded",
      "rounded-md": radius === "default",
    }
  );

  if (disabled) {
    return (
      <button
        style={style}
        disabled={disabled}
        className={`${btnCls} bg-transparent`}
      >
        {children}
      </button>
    );
  }

  // if (loading) {
  //   <button></button>;
  // }

  return (
    <button style={style} className={btnCls} onClick={onClick}>
      {children}
    </button>
  );
};
