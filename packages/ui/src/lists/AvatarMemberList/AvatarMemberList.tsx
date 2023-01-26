import { Members } from "@eden/package-graphql/generated";
import { Avatar, AvatarProps } from "@eden/package-ui";

export interface IAvatarMemberListProps {
  members: Members[];
  className?: string;
  size?: AvatarProps["size"];
}
export const AvatarMemberList: React.FC<IAvatarMemberListProps> = ({
  members,
  className,
  size = "md",
}) => {
  return (
    <div className={`flex w-full flex-nowrap justify-center ${className}`}>
      {members?.map((member: Members, index: number) => (
        <div
          key={index}
          className={`${size === "xs" ? "-mr-3" : ""} ${
            size === "sm" ? "-mr-4" : ""
          } ${size === "md" ? "-mr-6" : ""}`}
        >
          <Avatar
            size={size}
            src={member?.discordAvatar || ""}
            alt={member?.discordName ?? "avatar"}
          />
        </div>
      ))}
    </div>
  );
};
