import { Members } from "@eden/package-graphql/generated";
import { UserWithDescription } from "@eden/package-ui";
import { Tab } from "@headlessui/react";
import { useState } from "react";

import { InfoTab } from "./tabs/InfoTab";
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
      Content: () => (
        <ScoresTab
          member={member}
          percentage={percentage}
          summaryQuestions={summaryQuestions}
        />
      ),
    },
    {
      tab: "GRAPH",
      Content: () => <InfoTab member={member} loading={loading} />,
    },
    {
      tab: "EDEN AI CHAT",
      Content: () => <InfoTab member={member} loading={true} />,
    },
  ];

  return (
    <div>
      <UserWithDescription
        member={member}
        percentage={percentage ? percentage : undefined}
      />
      <Tab.Group
        defaultIndex={index}
        onChange={(index: number) => {
          console.log("Changed selected tab to:", index);
          setIndex(index);
        }}
      >
        <Tab.List className="w-full content-between space-x-16 text-xl">
          {tabs.map(({ tab }, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  selected ? "text-gray-900" : "font-avenir-roman text-gray-400"
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
  );
};
