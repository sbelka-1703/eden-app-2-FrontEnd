import { Members } from "@eden/package-graphql/generated";
import { Avatar } from "@eden/package-ui";

export interface IUserWithDescriptionProps {
  member?: Members;
}

export const UserWithDescription = ({ member }: IUserWithDescriptionProps) => {
  if (!member) return null;
  return (
    <div className={`desc font-Inter flex-col content-center text-center`}>
      <Avatar src={member?.discordAvatar as string} />
      <div className={`pt-2 uppercase`}>@{member?.discordName}</div>
      <div className={`font-sm text-neutral-500`}>
        {member?.memberRole?.title}
      </div>
    </div>
  );
};
