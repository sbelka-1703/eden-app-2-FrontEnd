import { useQuery } from "@apollo/client";
import { FIND_MEMBER } from "@eden/package-graphql";
import { Members, SummaryQuestionType } from "@eden/package-graphql/generated";
import { Avatar, Button, TextHeading3 } from "@eden/package-ui";
import { Tab } from "@headlessui/react";
import { useState } from "react";

import { GraphTab } from "./tabs/GraphTab";
import { InfoTab } from "./tabs/InfoTab";
import { MatchTab } from "./tabs/MatchTab";
import { ScoresTab } from "./tabs/ScoresTab";

export interface ICandidateInfoProps {
  memberId: string; // Members;
  percentage: number | null;
  loading?: boolean;
  summaryQuestions: SummaryQuestionType[];
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const CandidateInfo = ({
  memberId,
  percentage,
  // loading = false,
  summaryQuestions,
}: ICandidateInfoProps) => {
  console.log("CandidateInfoComponent");
  const [index, setIndex] = useState(0);

  const { data: findMemberData } = useQuery(FIND_MEMBER, {
    variables: {
      fields: {
        _id: memberId,
      },
    },
    skip: !Boolean(memberId),
    onCompleted: (data) => {
      console.log({ findMemberData: data });
    },
  });

  const tabs = [
    {
      tab: "INFO",
    },
    {
      tab: "MATCH %",
    },
    {
      tab: "GRAPH",
    },
    {
      tab: "EDEN AI CHAT",
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
              <Avatar
                src={findMemberData?.findMember?.discordAvatar}
                size={`lg`}
              />
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
            {findMemberData?.findMember?.discordName}
          </TextHeading3>
        </div>
        <TextHeading3 className="font-extrabold text-gray-500">
          {findMemberData?.findMember?.memberRole?.title}
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
                      ? "border-b-soilGreen-700 text-soilGreen-700 w-full border-b-4 outline-none"
                      : "font-avenir-roman w-full border-b-4 text-gray-400"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {({ selectedIndex }) => {
              if (selectedIndex === 0)
                return (
                  <Tab.Panel>
                    <div className="relative">
                      <InfoTab member={findMemberData?.findMember} />
                    </div>
                  </Tab.Panel>
                );
              if (selectedIndex === 1)
                return (
                  <Tab.Panel>
                    <div className="relative">
                      <MatchTab
                        member={findMemberData.findMember as Members}
                        summaryQuestions={summaryQuestions}
                      />
                    </div>
                  </Tab.Panel>
                );
              if (selectedIndex === 2)
                return (
                  <Tab.Panel>
                    <div className="relative">
                      <GraphTab member={findMemberData?.findMember!} />
                    </div>
                  </Tab.Panel>
                );
              if (selectedIndex === 3)
                return (
                  <Tab.Panel>
                    <div className="relative">
                      <ScoresTab
                        member={findMemberData?.findMember}
                        percentage={percentage}
                        summaryQuestions={summaryQuestions}
                      />
                    </div>
                  </Tab.Panel>
                );

              return <>{selectedIndex}</>;
            }}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
