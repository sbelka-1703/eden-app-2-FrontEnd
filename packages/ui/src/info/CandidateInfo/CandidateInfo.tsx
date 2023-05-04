import { Members } from "@eden/package-graphql/generated";
import { UserWithDescription } from "@eden/package-ui";
import { Tab } from "@headlessui/react";
import { useState } from "react";

import { InfoSection } from "./tabs/InfoSection";

export interface ICandidateInfoProps {
  member: Members;
  percentage: number | null;
  loading?: boolean;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const CandidateInfo = ({
  member,
  percentage,
  loading = false,
}: ICandidateInfoProps) => {
  const [index, setIndex] = useState(0);

  if (!member) return null;

  const tabs = [
    {
      tab: "INFO",
      Content: () => <InfoSection member={member} loading={loading} />,
    },
    {
      tab: "MATCH %",
      Content: () => <InfoSection member={member} loading={true} />,
    },
    {
      tab: "GRAPH",
      Content: () => <InfoSection member={member} loading={loading} />,
    },
    {
      tab: "EDEN AI CHATs",
      Content: () => <InfoSection member={member} loading={true} />,
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
        <Tab.List className="w-full space-x-9 text-xl">
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
              <Content />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
