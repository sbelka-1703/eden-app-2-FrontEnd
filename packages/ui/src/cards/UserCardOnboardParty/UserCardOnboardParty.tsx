/* eslint-disable camelcase */
import { Maybe, Members, SkillType_Member } from "@graphql/eden/generated";
import { Avatar, Card, TextLabel } from "ui";

import { SkillList } from "../../components/SkillList";
import { NumberCircle } from "../../elements/NumberCircle";

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

  return (
    <Card border className="col-span-1 bg-white p-3">
      <div className="mb-4 flex items-center">
        {member.discordAvatar && (
          <div className="mr-3">
            <Avatar src={member.discordAvatar} size="md" />
          </div>
        )}
        <div>
          <span className="mt-2">{member.discordName}</span>
          {/* <SocialMediaComp links={member.links} title="" size="18px" /> */}
        </div>
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
