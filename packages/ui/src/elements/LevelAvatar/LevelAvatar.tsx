import { Avatar, Badge } from "@eden/package-ui";

/* eslint-disable @next/next/no-img-element */
export interface LevelAvatarProps {
  src: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  level?: number;
}

export const LevelAvatar = ({ src, level, size = "lg" }: LevelAvatarProps) => {
  return (
    <div className="relative w-20">
      <Avatar src={src} size={size} />
      <div className="absolute bottom-1 left-12 whitespace-nowrap rounded-full">
        {level && (
          <Badge
            text={`Level ${level}`}
            className="font-poppins text-md bg-[#9B67FF] font-medium text-white"
          />
        )}
      </div>
    </div>
  );
};
