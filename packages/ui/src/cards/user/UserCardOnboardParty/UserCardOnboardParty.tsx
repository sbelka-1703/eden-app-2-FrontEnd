/* eslint-disable camelcase */
import {
  Maybe,
  Members,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  Card,
  NumberCircle,
  ProgressBarGeneric,
  SkillList,
  TextHeading3,
  TextLabel,
} from "ui";

import { getUserProgress } from "../../../../utils/user-progress";

export interface UserCardOnboardPartyProps {
  member: Members;
}

export const UserCardOnboardParty = ({ member }: UserCardOnboardPartyProps) => {
  const learningSkills: Maybe<SkillType_Member>[] | undefined =
    member?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level === "learning"
    );
  const skilledSkills: Maybe<SkillType_Member>[] | undefined =
    member?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level !== "learning"
    );

  const progress = getUserProgress(member);

  return (
    <Card border className="border-soilGray col-span-1 bg-white p-3">
      <div className="flex items-center">
        {member.discordAvatar && (
          <div className="mr-3">
            <Avatar src={member.discordAvatar} size="md" />
          </div>
        )}
        <div>
          <TextHeading3 className="-mt-3">{member.discordName}</TextHeading3>
          {member.memberRole && (
            <p className="text-xs font-medium leading-none">
              <span className="mr-1">💼</span>
              {member.memberRole.title?.toUpperCase()}
            </p>
          )}
          {/* <SocialMediaComp links={member.links} title="" size="18px" /> */}
        </div>
      </div>
      <div className="mb-2">
        <div className="mb-1 flex items-baseline">
          <TextLabel>PROFILE PROGRESS</TextLabel>
          <span className="ml-auto">{progress}%</span>
        </div>
        <ProgressBarGeneric progress={progress} />
      </div>
      <div className="flex items-center space-x-2">
        <TextLabel>LEARNING</TextLabel>
        {learningSkills && <NumberCircle value={learningSkills?.length} />}
      </div>
      {learningSkills && (
        <SkillList skills={learningSkills} colorRGB="209,247,196" />
      )}
      <div className="flex items-center space-x-2">
        <TextLabel>SKILLED</TextLabel>
        {skilledSkills && <NumberCircle value={skilledSkills?.length} />}
      </div>
      {skilledSkills && (
        <SkillList skills={skilledSkills} colorRGB="235,225,255" />
      )}
      <TextLabel>ABOUT ME</TextLabel>
      <div>{member.bio}</div>
    </Card>
  );
};
