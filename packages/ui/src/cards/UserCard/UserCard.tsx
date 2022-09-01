import { Maybe, Members } from "@graphql/eden/generated";
import { Avatar, Card } from "ui";

export interface UserCardProps {
  member?: Maybe<Members>;
  percentage?: number;
  endorsements?: number;
  focused?: boolean;
}

export const UserCard = ({
  member,
  percentage,
  endorsements,
  focused,
}: UserCardProps) => {
  return (
    <Card shadow focused={focused} className={`bg-white p-6`}>
      <div className={`flex justify-between`}>
        <div>
          <Avatar src={member?.discordAvatar || ""} size={`sm`} />
        </div>
        <div className={`w-full pl-6`}>
          <div className="flex justify-between">
            <div className={`-mt-2`}>
              <div className={`text-xl`}>@{member?.discordName}</div>
              <div className={`text-sm text-zinc-400`}>
                {endorsements} endorsements
              </div>
            </div>
            <div className={`text-soilPurple my-auto text-3xl font-semibold`}>
              {percentage}%
            </div>
          </div>
          <div className={`mt-2 flex`}>
            {member?.skills?.map((skill, index) => (
              <span
                key={index}
                className={`bg-soilPurple/20 mr-2 rounded-full px-2 py-1 text-xs`}
              >
                {skill?.skillInfo?.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
