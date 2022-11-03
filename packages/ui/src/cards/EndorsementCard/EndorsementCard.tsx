import { Members } from "@eden/package-graphql/generated";
import { Card, LevelAvatar, TextBody, TextHeading2 } from "@eden/package-ui";

export interface EndorsementsProps {
  member: Members;
  text?: string;
  level?: number;
}

export const EndorsementCard: React.FC<EndorsementsProps> = ({
  member,
  text,
  level,
}) => {
  return (
    <Card border className="mt-8 p-6">
      <div className="-mt-14 flex w-full flex-col items-center">
        {<LevelAvatar src={member?.discordAvatar || ""} level={level} />}
        <TextHeading2 className="text-soilGray">
          @{member?.discordName}
        </TextHeading2>
      </div>
      {text && (
        <section>
          <TextBody>{text}</TextBody>
        </section>
      )}
    </Card>
  );
};
