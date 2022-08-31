import React from "react";
import { Avatar, AvatarProps } from "ui";

export interface AvatarListProps {
  avatars: AvatarProps[];
}
export const AvatarList: React.FC<AvatarListProps> = ({ avatars }) => {
  return (
    <div className="flex w-full flex-nowrap">
      {avatars?.map((avatar: AvatarProps, index: number) => (
        <div key={index} className="-mx-3">
          <Avatar
            size={avatar?.size}
            src={avatar?.src}
            alt={avatar?.alt ?? "avatar"}
          />
        </div>
      ))}
    </div>
  );
};
