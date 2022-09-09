/* eslint-disable camelcase */
import { Maybe, Members, SkillType_Member } from "@graphql/eden/generated";
import { Avatar, NumberCircle, SkillList, TextLabel } from "ui";

export interface IUserProfileCardProps {
  member?: Members;
  role?: string;
}

export const UserProfileCard = ({ member, role }: IUserProfileCardProps) => {
  const learningSkills: Maybe<SkillType_Member>[] | undefined =
    member?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level === "learning"
    );

  const skilledSkills: Maybe<SkillType_Member>[] | undefined =
    member?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level !== "learning"
    );

  return (
    <div className={`text-darkGreen  rounded-2xl bg-white px-8 py-6`}>
      <div className={` font-poppins text-xl font-medium`}>Your Profile</div>
      <div className={`my-3 flex`}>
        <div>
          <Avatar src={member?.discordAvatar || ""} size="md" />
        </div>
        <div className={`font-poppins pl-4 text-2xl font-medium`}>
          <div>
            @{member?.discordName}
            <TextLabel> #{member?.discriminator}</TextLabel>
          </div>
          <div className={`font-Inter text-zinc-500`}>{role}</div>
        </div>
      </div>

      <div className="my-2 flex items-center space-x-2">
        <TextLabel>LEARNING</TextLabel>
        {learningSkills && <NumberCircle value={learningSkills?.length} />}
      </div>
      {learningSkills && (
        <SkillList skills={learningSkills} colorRGB="209,247,196" />
      )}
      <div className="my-2 flex items-center space-x-2">
        <TextLabel>SKILLED</TextLabel>
        {skilledSkills && <NumberCircle value={skilledSkills?.length} />}
      </div>
      {skilledSkills && (
        <SkillList skills={skilledSkills} colorRGB="235,225,255" />
      )}
    </div>
  );
};
