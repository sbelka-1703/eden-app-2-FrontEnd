import { Maybe, Members } from "@eden/package-graphql/generated";
import { Avatar, TextHeading3, TextLabel } from "@eden/package-ui";

export interface IUserWithDescriptionProps {
  member?: Maybe<Members>;
}

export const UserWithDescription = ({ member }: IUserWithDescriptionProps) => {
  if (!member) return null;
  return (
    <div className={`desc font-Inter flex-col content-center text-center`}>
      <Avatar src={member?.discordAvatar as string} />
      <div className="flex justify-center">
        <TextHeading3>@{member?.discordName}</TextHeading3>
        {member?.discriminator && (
          <TextLabel className="mt-2 pl-1">#{member?.discriminator}</TextLabel>
        )}
      </div>
      <TextHeading3 className="text-gray-400">
        {member?.memberRole?.title}
      </TextHeading3>
    </div>
  );
};
