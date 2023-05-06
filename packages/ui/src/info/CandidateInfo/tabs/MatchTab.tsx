import { Members, SummaryQuestionType } from "@eden/package-graphql/generated";
import {
  BackgroundMatchChart,
  TextHeading2,
  TextInputLabel,
  TextLabel1,
} from "@eden/package-ui";
import { FC } from "react";

type Props = {
  member?: Members;
  summaryQuestions?: SummaryQuestionType[];
};

export const MatchTab: FC<Props> = ({ member, summaryQuestions }) => {
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
      <div className="mb-4 mt-4">
        <BackgroundMatchChart
          memberName={member?.discordName ?? ""}
          backgroundMatchData={exampleData}
        />
      </div>
      <p className="text-soilHeading3 font-poppins mb-2 mt-6 text-center font-black text-gray-400">
        EXPERTISE
      </p>
      <div
        className={`mx-auto my-4 grid grid-cols-${
          summaryQuestions?.length || 4
        } gap-4`}
      >
        {summaryQuestions
          ? summaryQuestions.map((item, index) => (
              <div key={index} className="hover:bg-blue-200">
                <div className="mx-auto flex h-16 w-auto items-center justify-center">
                  <p className="text-center">
                    <TextLabel1 className="text-black">
                      {item.questionContent}
                    </TextLabel1>
                  </p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-center">
                    {item.score ? (
                      <div className="font-black">
                        <TextHeading2
                          className={`${
                            index % 2
                              ? "text-soilPurple"
                              : index % 3
                              ? "text-soilOrange"
                              : "text-soilTurquoise"
                          }`}
                        >
                          {item.score}%
                        </TextHeading2>
                      </div>
                    ) : (
                      <TextInputLabel className="text-xs text-black">
                        {item.answerContent}
                      </TextInputLabel>
                    )}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <p className="text-soilHeading3 font-poppins mb-6 text-center font-black text-gray-400">
        CULTURE FIT
      </p>
      <div
        className={`mx-auto grid grid-cols-${
          summaryQuestions?.length || 4
        } gap-4`}
      >
        {summaryQuestions
          ? summaryQuestions?.map((item, index) => (
              <div key={index} className="hover:bg-blue-200">
                <div className="mx-auto flex h-16 w-auto items-center justify-center">
                  <p className="text-center">
                    <TextLabel1 className="text-black">
                      {item.questionContent}
                    </TextLabel1>
                  </p>
                </div>
                <div className="mx-auto flex items-center justify-center">
                  <p className="text-center">
                    <TextLabel1 className="text-soilPurple">
                      {item.answerContent}
                    </TextLabel1>
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};
