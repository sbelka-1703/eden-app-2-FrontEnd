import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  MatchAvatar,
  TextHeading2,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";

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
    <div className={` font-Inter flex w-full `}>
      <MatchAvatar
        src={member?.discordAvatar as string}
        percentage={percentage as number}
        size={`md`}
      />

      <div className="w-full pl-5 ">
        <div className="flex  justify-start text-start ">
          {member?.discordName && member?.discordName?.length < 11 ? (
            <TextHeading3>{member?.discordName}</TextHeading3>
          ) : (
            <span>{member?.discordName}</span>
          )}
          {member?.discriminator && (
            <TextLabel className="mt-2 pl-1">
              #{member?.discriminator}
            </TextLabel>
          )}
        </div>
        <TextHeading3 className=" text-base text-gray-400">
          {member?.memberRole?.title}
        </TextHeading3>
      </div>
    </div>
  );
};
