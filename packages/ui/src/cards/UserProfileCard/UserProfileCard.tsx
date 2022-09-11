/* eslint-disable camelcase */
import { UserContext } from "@context/eden";
import { Maybe, SkillType_Member } from "@graphql/eden/generated";
import { useContext } from "react";
import { Avatar, NumberCircle, SkillList, TextLabel } from "ui";

export interface IUserProfileCardProps {
  role?: string | null;
}

export const UserProfileCard = ({ role }: IUserProfileCardProps) => {
  const { currentUser } = useContext(UserContext);

  const learningSkills: Maybe<SkillType_Member>[] | undefined =
    currentUser?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level === "learning"
    );

  const skilledSkills: Maybe<SkillType_Member>[] | undefined =
    currentUser?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level !== "learning"
    );

  return (
    <div className={`text-darkGreen rounded-2xl bg-white py-6`}>
      <div className={`px-6`}>
        <div className={` font-poppins text-xl font-medium`}>Your Profile</div>
        <div className={`my-3 flex`}>
          <div>
            <Avatar src={currentUser?.discordAvatar || ""} size="md" />
          </div>
          <div className={`font-poppins pl-4 text-2xl font-medium`}>
            <div>
              @{currentUser?.discordName}
              <TextLabel> #{currentUser?.discriminator}</TextLabel>
            </div>
            <div className={`font-Inter text-zinc-500`}>{role}</div>
          </div>
        </div>
      </div>

      <div className={`h-6/10 scrollbar-hide overflow-y-scroll px-6`}>
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
    </div>
  );
};
