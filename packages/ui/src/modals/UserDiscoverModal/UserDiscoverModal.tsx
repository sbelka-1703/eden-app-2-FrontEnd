import { Members } from "@eden/package-graphql/generated";
import {
  AvailabilityComp,
  Badge,
  Button,
  Card,
  EndorsementList,
  Modal,
  SocialMediaComp,
  TabsSelector,
  TextHeading3,
  UserWithDescription,
} from "@eden/package-ui";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";

import { ArrowsCollapseIcon } from "./icons/ArrowCollapseIcon";
import { ArrowsExpandIcon } from "./icons/ArrowExpandIcon";

export interface IUserDiscoverModalProps {
  member?: Members;
  resultPopUpFlag?: any;
  open?: boolean;
  onClose?: () => void;
}

const DEFAULT_COLOR = "#CAE8FF";

export const UserDiscoverModal = ({
  member,
  open,
  onClose,
}: IUserDiscoverModalProps) => {
  if (!member) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <div className="flex w-full justify-center">
          <div className={`my-auto mr-4`}>
            <Button variant="default" className="bg-soilYellow">
              Skip
            </Button>
          </div>

          <div>
            <UserWithDescription member={member} />
          </div>
          <div className={`my-auto ml-4`}>
            <Button variant="primary" className="">
              <CheckCircleIcon width={20} className="mr-1" />
              Join
            </Button>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-5">
          <div className="col-span-3 flex flex-col items-start justify-center">
            <TextHeading3
              style={{ fontWeight: 700 }}
              className="mb-2 text-sm uppercase text-gray-500"
            >
              🪪 Short bio
            </TextHeading3>
            <p className="text-soilBody font-Inter font-normal">
              {member?.bio}
            </p>
          </div>
          {/* <div className="flex justify-center">
            {item.percentage && (
              <div>
                <h1 className="text-soilHeading3 font-poppins text-soilGray -ml-2 font-medium">
                  ⚡️Match
                </h1>
                <p className="text-soilPurple font-poppins text-4xl font-semibold">
                  {item.percentage}
                </p>
              </div>
            )}
          </div> */}
          <div>
            <AvailabilityComp timePerWeek={member.hoursPerWeek || 0} />
            <SocialMediaComp title="" links={member?.links} size="1.8rem" />
          </div>
        </div>

        {/* {item.background && (
          <UserBackground
            background={item.background}
            initialEndorsements={item.endorsements}
          />
        )} */}
      </div>
    </Modal>
  );
};

const UserBackground = ({
  background,
  initialEndorsements,
}: {
  background: any[];
  initialEndorsements: any[];
}) => {
  const endorsements = initialEndorsements?.map((endorsement: any) => ({
    member: {
      discordName: endorsement.name,
      discordAvatar: endorsement.avatar,
    },
    text: endorsement.endorsement,
    level: endorsement.level.name,
  }));

  const [expand, setExpand] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = background.map((item) => `${item.title} ${item.emoji}`);
  const item = background.reduce((prev, curr) => {
    const item = { [`${curr.title} ${curr.emoji}`]: curr };

    return { ...prev, ...item };
  }, {});

  const activeItem = item[tabs[activeTab]];

  const onExpend = (item: string) => {
    const itemIndex = tabs.findIndex((tab) => tab === item);

    setActiveTab(itemIndex);
    setExpand(true);
  };

  return (
    <div>
      <div className="mb-4 flex">
        <TextHeading3
          style={{ fontWeight: 700 }}
          className=" text-sm uppercase text-gray-500"
        >
          🎡 Background
        </TextHeading3>
        {expand && (
          <Button style={{ border: "none" }} onClick={() => setExpand(false)}>
            <ArrowsCollapseIcon />
          </Button>
        )}
      </div>
      {expand ? (
        <UserExpandedBackground
          tabs={tabs}
          activeTab={activeTab}
          activeItem={activeItem}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          <UserCardBackground onExpand={onExpend} background={background} />
          {endorsements?.length > 0 && (
            <div className="mt-3">
              <EndorsementList endorsements={endorsements} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const UserCardBackground = ({
  onExpand,
  background,
}: {
  background: any[];
  // eslint-disable-next-line no-unused-vars
  onExpand: (item: string) => void;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {background.map((item, index) => (
        <Card
          key={index}
          border
          className="hover:shadow-focusShadow hover:border-accentColor cursor-pointer p-2"
        >
          <Button
            className="w-full"
            style={{ border: "none", display: "block" }}
            onClick={() => onExpand(`${item.title} ${item.emoji}`)}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <TextHeading3 className="text-center text-base">
                  {item.emoji} {item.title}
                </TextHeading3>
                <div className="absolute right-2 top-3.5">
                  <ArrowsExpandIcon />
                </div>

                {item.content.map((content: any) => (
                  <TextHeading3
                    key={content.title}
                    className="font-Inter my-3 overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl px-2 py-1 text-base"
                    style={{ backgroundColor: item?.color || DEFAULT_COLOR }}
                  >
                    {content.title}
                  </TextHeading3>
                ))}
              </div>
              <p className="text-gray-400">Total: 4 years 6 month</p>
            </div>
          </Button>
        </Card>
      ))}
    </div>
  );
};

const UserExpandedBackground = ({
  tabs,
  activeTab,
  activeItem,
  setActiveTab,
}: {
  tabs: string[];
  activeItem: any;
  activeTab: number;
  // eslint-disable-next-line no-unused-vars
  setActiveTab: (activeTab: number) => void;
}) => (
  <>
    <TabsSelector
      tabs={tabs}
      selectedTab={activeTab}
      onSelect={(val) => {
        setActiveTab(val);
      }}
    />
    <div className="border-accentColor scrollbar-hide relative overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4 pt-6">
      {activeItem?.content.map((item: any, index: number) => (
        <div
          key={item.title}
          className="mb-2 grid grid-cols-2 border-b border-b-gray-300 pb-2"
          style={
            index === activeItem?.content.length - 1
              ? { borderBottom: "none" }
              : {}
          }
        >
          <div>
            <TextHeading3
              className="mb-3 rounded-2xl px-2 py-1"
              style={{ backgroundColor: activeItem?.color || DEFAULT_COLOR }}
            >
              {item.title}
            </TextHeading3>
            <p>{item.content}</p>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              <TextHeading3
                style={{ fontWeight: 700 }}
                className="mb-2 text-sm uppercase text-gray-500"
              >
                🚀 Skills
              </TextHeading3>
              <div className="inline-block">
                {item?.skills?.map((skill: string, index: number) => (
                  <Badge
                    text={skill}
                    key={index}
                    cutText={15}
                    colorRGB="255, 111, 137, 0.49"
                    className={`py-px text-xs`}
                  />
                ))}
              </div>
            </div>
            <TextHeading3 className="mb-2 text-gray-500">
              {`${item.date.start} - ${item.date.end}`}
            </TextHeading3>
          </div>
        </div>
      ))}
    </div>
  </>
);
