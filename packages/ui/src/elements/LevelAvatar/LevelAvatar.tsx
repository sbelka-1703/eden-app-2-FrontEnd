import { Avatar, Badge } from "@eden/package-ui";
import clsx from "clsx";

export interface LevelAvatarProps {
  src: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  level?: number;
}

export const LevelAvatar = ({ src, level, size = "lg" }: LevelAvatarProps) => {
  const percentageCls = clsx("absolute rounded-full whitespace-nowrap", {
    "-bottom-1 left-5 text-xs": size === "xs",
    "-bottom-0 left-8 text-sm": size === "sm",
    "bottom-0 left-10 text-lg": size === "md",
    "bottom-1 left-14 text-xl": size === "lg",
    "bottom-1 left-16 text-2xl": size === "xl",
  });

  return (
    <div className="relative w-20">
      <Avatar src={src} size={size} />
      <div className={`${percentageCls}`}>
        {level && (
          <Badge
            text={`${level} $TRST`}
            className="font-poppins bg-[#9B67FF] pt-1 font-medium text-white"
            cutText={100}
          />
        )}
      </div>
    </div>
  );
};
