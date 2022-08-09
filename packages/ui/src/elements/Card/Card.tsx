import clsx from "clsx";

export interface CardProps {
  children?: React.ReactNode;
  shadow?: boolean;
  background?: boolean;
  focused?: boolean;
}

export const Card = ({
  children,
  shadow = false,
  background = false,
  focused = false,
}: CardProps) => {
  const cardCls = clsx("rounded-2xl p-6", {
    "shadow-cardShadow": shadow === true,
    "bg-soilGreen-600/30": background === true,
    "shadow-focusShadow": focused === true,
    // "border-soilGreen-600 border-2": focused === true,
  });

  return <div className={cardCls}>{children}</div>;
};
