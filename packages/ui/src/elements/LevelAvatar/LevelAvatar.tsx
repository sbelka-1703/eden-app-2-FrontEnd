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
            text={`${level} $TRST`}
            className="font-poppins bg-[#9B67FF] pt-1 text-sm font-medium text-white"
            cutText={100}
          />
        )}
      </div>
    </div>
  );
};
