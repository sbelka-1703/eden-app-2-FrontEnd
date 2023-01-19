import { Avatar } from "@eden/package-ui";
import clsx from "clsx";

export interface MatchAvatarProps {
  src: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  percentage?: number | string;
}

export const MatchAvatar = ({
  src,
  percentage,
  size = "lg",
}: MatchAvatarProps) => {
  const percentageCls = clsx(
    "absolute rounded-full bg-white py-0.5 px-2",
    {
      "-bottom-3 left-5 text-xs": size === "xs",
      "-bottom-1 -right-1 text-sm": size === "sm",
      "bottom-0 -right-4 text-lg": size === "md",
      "bottom-0 -right-7 text-xl": size === "lg",
      "bottom-1 -right-10 text-2xl": size === "xl",
    },
    {
      shadow: percentage,
    }
  );

  return (
    <div className="relative w-20">
      <Avatar src={src} size={size} />
      <div className={`${percentageCls}`}>
        {percentage && (
          <p className="font-poppins font-semibold text-[#9B67FF]">
            {typeof percentage === "number"
              ? Math.round(percentage)
              : percentage}
            %
          </p>
        )}
      </div>
    </div>
  );
};
