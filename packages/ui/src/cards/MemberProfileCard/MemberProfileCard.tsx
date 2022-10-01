import { Members } from "@eden/package-graphql/generated";
import {
  AvailabilityComp,
  Avatar,
  Button,
  Card,
  SkillList,
  SocialMediaComp,
} from "@eden/package-ui";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";

export interface MemberProfileCardProps {
  member: Members;
  percentage: number | null | undefined;
  // onClickNotNow?: () => void;
  onClickBack?: () => void;
  onClickAddToList?: () => void;
}

export const MemberProfileCard = ({
  percentage,
  member,
  // onClickNotNow,
  onClickBack,
  onClickAddToList,
}: MemberProfileCardProps) => {
  return (
    <Card
      border
      className="scrollbar-hide !border-accentColor h-full w-full overflow-y-scroll border-[2px] bg-white p-10"
    >
      <span
        onClick={onClickBack}
        className="text-soilGray group absolute left-4 top-4 cursor-pointer"
      >
        <ChevronLeftIcon className="mr-1 -mt-1 inline" width={20} />
        <span className="group-hover:underline">Grid view</span>
      </span>
      <div className="flex w-full justify-center">
        {/* <Button
          variant="default"
          onClick={onClickNotNow}
          className="bg-soilYellow"
        >
          Not now
        </Button> */}
        <div className="relative">
          <Avatar size="lg" src={member.discordAvatar!} />
          <Button
            variant="primary"
            onClick={onClickAddToList}
            className="absolute -right-36 top-5 flex w-32 items-center justify-center !px-2 !pl-1"
          >
            <CheckCircleIcon width={20} className="mr-1" />
            Add to list
          </Button>
        </div>
      </div>
      <div className="mb-4 flex flex-col items-center">
        <h1 className="font-poppins text-darkGreen text-soilHeading2 font-medium">
          {member.discordName}
          {member.discriminator && (
            <span className="text-soilGray font-Inter text-xs font-semibold">
              #{member.discriminator}
            </span>
          )}
        </h1>
        <p className="text-soilLabel text-soilGray font-poppins font-medium uppercase">
          {member.memberRole?.title}
        </p>
      </div>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-soilHeading3 font-poppins font-medium">
            Short Bio
          </h1>
          <p className="text-soilBody font-Inter w-8/12 font-normal">
            {member.bio}
          </p>
        </div>
        {percentage && (
          <div className="mr-12">
            <h1 className="text-soilHeading3 font-poppins text-soilGray -ml-2 font-medium">
              ⚡️Match
            </h1>
            <p className="text-soilPurple font-poppins text-4xl font-semibold">
              {Math.round(percentage)}%
            </p>
          </div>
        )}
      </div>
      <div className="flex w-full items-start justify-between gap-6">
        <div className="w-3/4">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            Top skills
          </p>
          <SkillList skills={member.skills!} colorRGB={"155, 103, 255, 0.44"} />
        </div>
        {!!member.links?.length && (
          <SocialMediaComp title="Socials" links={member.links} size="1.8rem" />
        )}
        {member.hoursPerWeek && (
          <AvailabilityComp seed="1700" timePerWeek={member.hoursPerWeek!} />
        )}
      </div>
    </Card>
  );
};
