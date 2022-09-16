import { Avatar } from "ui";

/* eslint-disable @next/next/no-img-element */
export interface MatchAvatarProps {
  src: string;
  percentage: string;
}

export const MatchAvatar = ({ src, percentage }: MatchAvatarProps) => {
  return (
    <div className="relative h-20 w-20">
      <Avatar src={src} size="lg" />
      <div className="absolute bottom-1 -right-6 rounded-full bg-white py-1 px-1">
        <p className="font-poppins text-2xl font-semibold text-[#9B67FF]">
          {percentage}%
        </p>
      </div>
    </div>
  );
};
