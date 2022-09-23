import { Members } from "@graphql/eden/generated";
import {
  AvailabilityComp,
  Avatar,
  Button,
  Card,
  SkillList,
  SocialMediaComp,
} from "ui";

export interface MemberProfileCardProps {
  member: Members;
  percentage: number | null | undefined;
  onClickNotNow?: () => void;
  onClickAddToList?: () => void;
}

export const MemberProfileCard = ({
  percentage,
  member,
  onClickNotNow,
  onClickAddToList,
}: MemberProfileCardProps) => {
  return (
    <Card
      border
      className="!border-accentColor flex w-full flex-col items-center justify-center gap-5 border-[2px] bg-white p-10"
    >
      <div className="flex items-center justify-center gap-5">
        <Button
          variant="default"
          onClick={onClickNotNow}
          className="bg-soilYellow"
        >
          Not now
        </Button>
        <Avatar size="lg" src={member.discordAvatar!} />
        <Button variant="primary" onClick={onClickAddToList}>
          Add to list
        </Button>
      </div>
      <h1 className="font-poppins text-darkGreen text-soilHeading2 font-medium">
        {member.discordName}
        <span className="text-soilGray font-Inter text-xs font-semibold">
          {" "}
          #{member.discriminator}
        </span>
      </h1>
      <p className="text-soilLabel text-soilGray font-poppins -mt-5 mb-2 font-medium uppercase">
        {member.memberRole?.title}
      </p>
      <div className="flex items-start justify-center ">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-soilHeading3 font-poppins font-medium">
            Short Bio
          </h1>
          <p className="text-soilBody font-Inter w-8/12 font-normal">
            {member.bio}
          </p>
        </div>
        {percentage && (
          <div>
            <h1 className="text-soilHeading3 font-poppins text-soilGray font-medium">
              Match
            </h1>
            <p className="text-soilPurple font-poppins text-4xl font-semibold">
              {Math.round(percentage)}%
            </p>
          </div>
        )}
      </div>
      <div className="flex w-full items-start justify-between gap-10">
        <div>
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            Top skills
          </p>
          <SkillList skills={member.skills!} colorRGB={"155, 103, 255, 0.44"} />
        </div>
        <SocialMediaComp title="Socials" links={member.links} />
        <AvailabilityComp seed="1700" timePerWeek={member.hoursPerWeek!} />
      </div>
    </Card>
  );
};
