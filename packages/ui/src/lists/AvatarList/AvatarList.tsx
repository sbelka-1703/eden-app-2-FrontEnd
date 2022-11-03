import { Avatar, AvatarProps } from "@eden/package-ui";

export interface AvatarListProps {
  avatars: AvatarProps[];
  className?: string;
}
export const AvatarList: React.FC<AvatarListProps> = ({
  avatars,
  className,
}) => {
  return (
    <div className={`flex w-full flex-nowrap justify-center ${className}`}>
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
