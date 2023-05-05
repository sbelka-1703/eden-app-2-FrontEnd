import { Members } from "@eden/package-graphql/generated";
import { Avatar, Button, TextHeading3 } from "@eden/package-ui";
import { Tab } from "@headlessui/react";
import { useState } from "react";

import { InfoTab } from "./tabs/InfoTab";
import { MatchTab } from "./tabs/MatchTab";
import { ScoresTab } from "./tabs/ScoresTab";

export interface ICandidateInfoProps {
  member: Members;
  percentage: number | null;
  loading?: boolean;
  summaryQuestions: any;
  handleCloseModal: () => void;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const CandidateInfo = ({
  member,
  percentage,
  loading = false,
  summaryQuestions,
  handleCloseModal,
}: ICandidateInfoProps) => {
  const [index, setIndex] = useState(0);

  if (!member) return null;

  const tabs = [
    {
      tab: "INFO",
      Content: () => <InfoTab member={member} loading={loading} />,
    },
    {
      tab: "MATCH %",
      Content: () => <MatchTab member={member} />,
    },
    {
      tab: "GRAPH",
      Content: () => <InfoTab member={member} loading={loading} />,
    },
    {
      tab: "EDEN AI CHAT",
      Content: () => (
        <ScoresTab
          member={member}
          percentage={percentage}
          summaryQuestions={summaryQuestions}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="font-Inter mb-4 flex-col text-center">
        <div className="grid grid-cols-3">
          <div className="col-1 mt-5 w-full p-2 text-center">
            <div className="flex w-full justify-end">
              <Button className="bg-red-400 font-bold text-white" radius="pill">
                REJECT
              </Button>
            </div>
          </div>
          <div className="col-2 p-2">
            <div className="flex w-full justify-center">
              <Avatar src={member?.discordAvatar!} size={`lg`} />
            </div>
          </div>
          <div className="col-3 mt-5 w-full p-2 text-center">
            <div className="flex w-full justify-start">
              <Button
                variant="primary"
                radius="pill"
                className="font-bold text-white"
              >
                APPROVE
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <TextHeading3 className="font-extrabold">
            {member?.discordName}
          </TextHeading3>
        </div>
        <TextHeading3 className="font-extrabold text-gray-500">
          {member?.memberRole?.title}
        </TextHeading3>
      </div>
      <div className="w-full">
        <Tab.Group
          defaultIndex={index}
          onChange={(index: number) => {
            console.log("Changed selected tab to:", index);
            setIndex(index);
          }}
        >
          <Tab.List className="flex justify-between px-6 text-xl">
            {tabs.map(({ tab }, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "border-b-soilGreen-700 text-soilGreen-700 w-full border-b-4"
                      : "font-avenir-roman w-full border-b-4 text-gray-400"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map(({ Content }, index) => (
              <Tab.Panel key={index}>
                <>
                  <Content />
                  <div className="px4 bg-gray-50 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        handleCloseModal();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};