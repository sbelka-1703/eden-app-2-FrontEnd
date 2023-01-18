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
      "-bottom-3 left-5 text-xs w-8 h-8": size === "xs",
      "-bottom-1 -right-1 text-sm w-9 h-9": size === "sm",
      "bottom-0 -right-4 text-base w-8 h-8": size === "md",
      "bottom-0 -right-7 text-xl w-10 h-10": size === "lg",
      "bottom-1 -right-10 text-2xl w-10 h-10": size === "xl",
    },
    {
      shadow: percentage,
    }
  );

  return (
    <div className="relative w-20 ">
      <Avatar src={src} size={"sm"} />
      <div className={`${percentageCls}`}>
        {percentage && (
          <p className="font-poppins -ml-1 pt-1 text-sm font-medium text-[#9B67FF]">
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
