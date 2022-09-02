import { Members } from "@graphql/eden/generated";
import { Avatar, Badge, Card, TextHeading3 } from "ui";

export interface OnboardPartyContainerProps {
  members: Members[];
}

export const OnboardPartyContainer = ({
  members = [],
}: OnboardPartyContainerProps) => {
  return (
    <Card
      shadow
      className="h-8/10 scrollbar-hide overflow-y-scroll bg-white p-3"
    >
      <TextHeading3 className="mb-2">See Other Profiles</TextHeading3>
      <section className="grid grid-cols-2 gap-3">
        {[...members]
          .sort(
            (a: Members, b: Members) =>
              (b.skills?.length || 0) - (a.skills?.length || 0)
          )
          .map((member: Members, index: number) => (
            <Card key={index} border className="col-span-1 bg-white p-3">
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
              {member.skills?.map((skill, index) => (
                <Badge
                  key={index}
                  colorRGB="209,247,196"
                  text={skill?.skillInfo?.name || "no_name"}
                  cutText={13}
                />
              ))}
            </Card>
          ))}
      </section>
    </Card>
  );
};
