import { Members } from "@eden/package-graphql/generated";
import { BackgroundMatchChart } from "@eden/package-ui";
import React from "react";

type Props = {
  member: Members;
};

export const MatchTab: React.FC<Props> = ({ member }) => {
  console.log({ member });

  const exampleData = [
    {
      questionID: "1242",
      questionContent: "Experience",
      userPercentage: 75,
      averagePercentage: 55,
    },
    {
      questionID: "9521",
      questionContent: "Work from Home or Office",
      userPercentage: 35,
      averagePercentage: 45,
    },
    {
      questionID: "2222",
      questionContent: "Skill",
      userPercentage: 85,
      averagePercentage: 75,
    },
    {
      questionID: "1211",
      questionContent: "Industry experience",
      userPercentage: 90,
      averagePercentage: 40,
    },
  ];

  return (
    <>
      <div className="mb-4 mt-4 ">
        MatchTab
        <BackgroundMatchChart
          memberName={member.discordName ?? ""}
          backgroundMatchData={exampleData}
        />
      </div>
    </>
  );
};
