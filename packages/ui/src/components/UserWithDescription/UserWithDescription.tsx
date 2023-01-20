import { Maybe, Members } from "@eden/package-graphql/generated";
import { MatchAvatar, TextHeading3, TextLabel } from "@eden/package-ui";

export interface IUserWithDescriptionProps {
  member?: Maybe<Members>;
  percentage?: number;
}

export const UserWithDescription = ({
  member,
  percentage,
}: IUserWithDescriptionProps) => {
  if (!member) return null;
  return (
    <div className={`desc font-Inter flex-col content-center text-center`}>
      <div className={`flex w-full justify-center`}>
        <MatchAvatar
          src={member?.discordAvatar as string}
          percentage={percentage as number}
          size={`md`}
        />
      </div>
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
