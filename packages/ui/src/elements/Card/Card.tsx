import clsx from "clsx";

export interface CardProps {
  children?: React.ReactNode;
  shadow?: boolean;
  focused?: boolean;
  border?: boolean;
  className?: string;
}

export const Card = ({
  children,
  shadow = false,
  focused = false,
  border = false,
  className = "",
}: CardProps) => {
  const cardCls = clsx(`rounded-2xl p-6 ${className}`, {
    "shadow-cardShadow": shadow === true,
    "shadow-focusShadow": focused === true,
    "border border-zinc-400": border === true,
  });

  return <div className={cardCls}>{children}</div>;
};
