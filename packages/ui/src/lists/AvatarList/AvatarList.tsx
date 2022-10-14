import { Avatar, AvatarProps } from "@eden/package-ui";

export interface AvatarListProps {
  avatars: AvatarProps[];
}
export const AvatarList: React.FC<AvatarListProps> = ({ avatars }) => {
  return (
    <div className="flex w-full flex-nowrap">
      {avatars?.map((avatar: AvatarProps, index: number) => (
        <div
          key={index}
          className={`${avatar.size === "xs" ? "-mr-3" : ""} ${
            avatar.size === "sm" ? "-mr-4" : ""
          } ${avatar.size === "md" ? "-mr-6" : ""}`}
        >
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
