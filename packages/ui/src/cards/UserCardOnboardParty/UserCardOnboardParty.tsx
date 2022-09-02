import { Members } from "@graphql/eden/generated";
import { Avatar, Badge, Card } from "ui";

export interface UserCardOnboardPartyProps {
  member: Members;
}

export const UserCardOnboardParty = ({ member }: UserCardOnboardPartyProps) => {
  const displayBadges = member.skills?.map((skill, index) => (
    <Badge
      key={index}
      colorRGB="209,247,196"
      text={skill?.skillInfo?.name || "no_name"}
      cutText={13}
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
      {displayBadges}
    </Card>
  );
};
