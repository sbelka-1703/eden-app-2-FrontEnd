import { Members } from "@eden/package-graphql/generated";
import {
  BackgroundMatchChart,
  TextHeading2,
  TextLabel1,
} from "@eden/package-ui";
import React from "react";

type Props = {
  member: Members;
  summaryQuestions: any;
};

export const MatchTab: React.FC<Props> = ({ member, summaryQuestions }) => {
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
  const dataRow1 = [
    {
      title: "STRONGEST SKILLS",
      percentage: 87,
    },
    {
      title: "COMPLIMENTARY SKILLS",
      percentage: 63,
    },
    {
      title: "RELEVANT EXPERIENCE",
      percentage: 30,
    },
    {
      title: "CAREER GOALS",
      percentage: 73,
    },
  ];

  const dataRow2 = [
    {
      title: "LEADERSHIP",
      shortAnswer: "6 years in leadership position",
    },
    {
      title: "CORPO VS STARTUP",
      shortAnswer: "Startup",
    },
    {
      title: "INTRINSIC MOTIVATION",
      shortAnswer: "Growth & connections",
    },
  ];

  console.log({ summaryQuestions });
  return (
    <>
      <div className="mb-4 mt-4">
        <BackgroundMatchChart
          memberName={member.discordName ?? ""}
          backgroundMatchData={exampleData}
        />
      </div>
      <p className="text-soilHeading3 font-poppins mb-2 mt-6 text-center font-black text-gray-400">
        EXPERTISE
      </p>
      <div className={`mx-auto my-4 grid grid-cols-${dataRow1.length} gap-4`}>
        {dataRow1.map((item, index) => (
          <div key={index}>
            <div className="mx-auto flex h-16 w-32 items-center justify-center">
              <p className="text-center">
                <TextLabel1 className="text-black">{item.title}</TextLabel1>
              </p>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-center">
                <div className="text-3xl font-black">
                  <TextHeading2
                    className={`${
                      index % 2
                        ? "text-soilPurple"
                        : index % 3
                        ? "text-soilOrange"
                        : "text-soilTurquoise"
                    }`}
                  >
                    {item.percentage}%
                  </TextHeading2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-soilHeading3 font-poppins mb-6 text-center font-black text-gray-400">
        CULTURE FIT
      </p>
      <div className={`mx-auto grid grid-cols-${dataRow2.length} gap-4`}>
        {dataRow2.map((item) => (
          <div key={item.title}>
            <div className="mx-auto flex h-16 w-32 items-center justify-center">
              <p className="text-center">
                <TextLabel1 className="text-black">{item.title}</TextLabel1>
              </p>
            </div>
            <div
              className="mx-auto flex h-16 w-32 items-center justify-center"
              key={item.title}
            >
              <p className="text-center">
                <TextLabel1 className="text-soilPurple">
                  {item.shortAnswer}
                </TextLabel1>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
