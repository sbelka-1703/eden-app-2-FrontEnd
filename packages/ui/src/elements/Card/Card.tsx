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
  className = "p-6",
}: CardProps) => {
  const cardCls = clsx(`relative rounded-2xl ${className}`, {
    "shadow-cardShadow": shadow === true,
    "shadow-focusShadow border-0": focused === true,
    "border border-zinc-400": border === true && focused !== true,
  });

  return <div className={cardCls}>{children}</div>;
};
