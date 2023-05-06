import { Members, SummaryQuestionType } from "@eden/package-graphql/generated";
import { Avatar } from "@eden/package-ui";
import React from "react";

type Props = {
  member: Members;
  percentage: number | null;
  summaryQuestions: SummaryQuestionType[];
};

export const ScoresTab: React.FC<Props> = ({
  member,
  percentage,
  summaryQuestions,
}) => {
  return (
    <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
            <Avatar src={member?.discordAvatar!} alt={member?.discordName!} />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="mb-4 text-2xl font-medium leading-6 text-black">
              {member?.discordName}
            </h3>
            <div className="mt-2">
              <p className="inline-block rounded-lg px-4 py-2 text-4xl font-bold text-indigo-600 shadow-lg">
                {percentage ? percentage : null}
                <span className="tooltip">
                  <svg
                    className="h-6 w-6 text-gray-400 hover:text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19V12M12 8V8M12 4L12.01 4M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                    ></path>
                  </svg>
                  {/* <span className="tooltiptext">
                    {selectedUser?.reason}
                  </span> */}
                </span>
              </p>
              {summaryQuestions &&
                summaryQuestions?.map((question: any, index: number) => (
                  <div key={index}>
                    <p className="mb-2 mt-4 text-2xl font-medium leading-6 text-black">
                      {question?.questionContent}
                    </p>
                    <p className="mb-2 text-sm text-gray-500">
                      Answer: {question?.answerContent}
                    </p>
                    {question?.score && (
                      <p className="inline-block rounded-lg px-4 py-2 text-lg font-bold text-indigo-400 shadow-xl">
                        Score: {question?.score}
                      </p>
                    )}
                    {/* {question.reason && (
                      <p className="text-sm text-gray-500">
                        Reason: {question.reason}
                      </p>
                    )} */}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
