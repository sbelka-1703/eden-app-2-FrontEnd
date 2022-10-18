/* eslint-disable camelcase */
import {
  MatchMembersToSkillOutput,
  Maybe,
  Members,
  SkillRoleType,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  Button,
  Card,
  MatchAvatar,
  SkillList,
  SkillMatchModal,
  SocialMediaComp,
  TextHeading2,
} from "@eden/package-ui";
import { useState } from "react";

export interface MemberMatchCardProps {
  percentage?: string;
  member: Members;
  requiredSkills?: Maybe<SkillType_Member>[] | Maybe<Maybe<SkillRoleType>[]>;
  onClick?: () => void;
  matchedMember?: MatchMembersToSkillOutput;
}

export const MemberMatchCard = ({
  percentage,
  member,
  requiredSkills,
  onClick,
  matchedMember,
}: MemberMatchCardProps) => {
  const mySkills: Maybe<SkillType_Member>[] | undefined = [];
  const [showSkillMatchModel, setSkillMatchModel] = useState(false);

  member?.skills?.forEach((skill) => {
    mySkills.push(skill);
  });
  const isSameSkills = (a: Maybe<SkillRoleType>, b: Maybe<SkillType_Member>) =>
    a?.skillData?.name === b?.skillInfo?.name;

  const matchedSkills = (left: any, right: any, compareFunction: any) =>
    left
      .filter((leftValue: any) =>
        right.some((rightValue: any) => compareFunction(leftValue, rightValue))
      )
      .map((skill: any) => ({ skillInfo: skill.skillData }));
  const missingSkills = (left: any, right: any, compareFunction: any) =>
    left
      .filter(
        (leftValue: any) =>
          !right.some((rightValue: any) =>
            compareFunction(leftValue, rightValue)
          )
      )
      .map((skill: any) => ({ skillInfo: skill.skillData }));
  const onOpenModal = () => {
    setSkillMatchModel(!showSkillMatchModel);
  };
  const onCloseModal = () => {
    setSkillMatchModel(false);
  };
  const getRandomColor = () => {
    const colors = [
      "120, 238, 203, 0.5",
      "255, 146, 205, 0.4",
      "255, 242, 104, 0.5",
      "155, 103, 255, 0.44",
      "136, 169, 255, 0.5",
      "83, 212, 240, 0.4",
      "168, 253, 82, 0.4",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <SkillMatchModal
        onCloseModal={onCloseModal}
        isModalOpen={showSkillMatchModel}
        budget={Number(matchedMember?.matchPercentage?.budgetPercentage)}
        avaiability={Number(matchedMember?.matchPercentage?.hoursPercentage)}
        projectCost={100}
        yourCost={Number(matchedMember?.matchPercentage?.budgetPercentage)}
        projectHr={40}
        yourHr={Number(matchedMember?.matchPercentage?.hoursPercentage) * 40}
        matchingPercentage={Number(percentage)}
        chartData={matchedMember?.skillsPercentage}
      />
      <Card
        border
        className="relative flex w-full flex-col items-center justify-center bg-white p-5"
      >
        <Button
          className="absolute top-2 left-2"
          onClick={() => onOpenModal()}
          variant="primary"
          size="sm"
        >
          Percentage
        </Button>
        <MatchAvatar src={member?.discordAvatar!} percentage={percentage} />
        <TextHeading2 className="font-poppins text-darkGreen font-medium">
          {member?.discordName}{" "}
          {member?.discriminator && (
            <span className="text-soilGray font-Inter text-xs font-semibold">
              #{member?.discriminator}
            </span>
          )}
        </TextHeading2>
        <p className="text-soilLabel font-Inter mb-2 font-semibold uppercase">
          {member?.memberRole?.title}
        </p>
        <SocialMediaComp links={member?.links} size="20px" title="" />
        {requiredSkills && (
          <div className="mt-3 w-full self-start">
            <p className="text-soilGray text-soilLabel font-Inter font-semibold">
              MATCHING SKILLS
            </p>
            <div className="flex w-full flex-wrap">
              <SkillList
                skills={matchedSkills(requiredSkills, mySkills, isSameSkills)}
                colorRGB={getRandomColor()}
              />
            </div>
            <p className="text-soilGray text-soilLabel font-Inter mt-3 font-semibold">
              MISSING SKILLS
            </p>
            <div className="flex w-full flex-wrap">
              <SkillList
                skills={missingSkills(requiredSkills, mySkills, isSameSkills)}
                colorRGB={"170, 170, 170, 0.12"}
              />
            </div>
          </div>
        )}
        <Button className="absolute top-2 right-2" onClick={onClick} size="sm">
          More
        </Button>
      </Card>
    </>
  );
};
