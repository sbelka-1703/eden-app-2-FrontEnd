/* eslint-disable camelcase */
import { Maybe, Members, SkillType_Member } from "@graphql/eden/generated";
import { Avatar, Badge, Card, TextLabel } from "ui";

export interface UserCardOnboardPartyProps {
  member: Members;
}

export const UserCardOnboardParty = ({ member }: UserCardOnboardPartyProps) => {
  const learningBadges = member?.skills
    ?.filter((skill: Maybe<SkillType_Member>) => skill?.level === "learning")
    .map((skill, index) => (
      <Badge
        key={index}
        text={skill?.skillInfo?.name || ""}
        colorRGB="209,247,196"
        className={`font-Inter text-sm`}
      />
    ));
  const skilledBadges = member?.skills
    ?.filter((skill: Maybe<SkillType_Member>) => skill?.level !== "learning")
    .map((skill, index) => (
      <Badge
        key={index}
        text={skill?.skillInfo?.name || ""}
        className={`bg-soilPurple/20 font-Inter text-sm`}
      />
    ));

  return (
    <Card border className="col-span-1 bg-white p-3">
      <span
        className={`absolute right-2 rounded-full py-1 px-2 text-xs font-medium`}
        style={{ background: `rgba(255, 103, 103, 0.15)` }}
      >
        TOTAL SKILLS: {`${member.skills?.length || 0}`}
      </span>

      <div className="mb-4 flex flex-col">
        {member.discordAvatar && (
          <Avatar src={member.discordAvatar} size="sm" />
        )}
        <span className="mt-2">{member.discordName}</span>
      </div>
      <TextLabel>LEARNING</TextLabel>
      <div>{learningBadges}</div>
      <TextLabel>SKILLED</TextLabel>
      <div>{skilledBadges}</div>
    </Card>
  );
};
