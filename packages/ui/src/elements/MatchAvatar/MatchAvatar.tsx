import { Avatar } from "ui";

/* eslint-disable @next/next/no-img-element */
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
  return (
    <div className="relative w-20">
      <Avatar src={src} size={size} />
      <div className="absolute bottom-1 -right-4 rounded-full bg-white py-1 px-1">
        {percentage && (
          <p className="font-poppins text-lg font-semibold text-[#9B67FF]">
            {percentage}%
          </p>
        )}
      </div>
    </div>
  );
};
