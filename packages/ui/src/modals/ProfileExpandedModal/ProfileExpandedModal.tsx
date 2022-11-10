import {
  AvailabilityComp,
  Badge,
  Button,
  Modal,
  SocialMediaComp,
  TabsSelector,
  TextHeading3,
  UserWithDescription,
} from "@eden/package-ui";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";

export interface IProfileExpandedModalProps {
  item?: any;
  resultPopUpFlag?: any;
  open?: boolean;
  onClose?: () => void;
}

export const ProfileExpandedModal = ({
  item,
  open,
  onClose,
  resultPopUpFlag = { type: "User" },
}: IProfileExpandedModalProps) => {
  if (!item) return null;
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
            <UserWithDescription
              member={{
                discordName: item?.name,
                discordAvatar: item?.picture,
                discriminator: item?.Descrimator,
                memberRole: {
                  title: item?.nameDescription,
                },
              }}
            />
          </div>
          <div className={`my-auto ml-4`}>
            <Button variant="primary" className="">
              <CheckCircleIcon width={20} className="mr-1" />
              Join
            </Button>
          </div>
        </div>
        {resultPopUpFlag?.type === "Bounty" && (
          <TextHeading3 className="text-accentColor w-full text-center">
            ⚡️ 500 CODE ⚡️
          </TextHeading3>
        )}
        <div className="mb-4 grid grid-cols-5">
          <div className="col-span-3 flex flex-col items-start justify-center">
            <TextHeading3
              style={{ fontWeight: 700 }}
              className="mb-2 text-sm uppercase text-gray-500"
            >
              🪪 Short bio
            </TextHeading3>
            <p className="text-soilBody font-Inter font-normal">
              {item?.description}
            </p>
          </div>
          <div className="flex justify-center">
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
          </div>
          <div>
            <AvailabilityComp timePerWeek={item.availability || 0} />
            {!!item.socials?.length && (
              <SocialMediaComp
                title=""
                links={item.socials.map((link: any) => ({
                  name: link.name.toLowerCase(),
                  url: link.link,
                }))}
                size="1.8rem"
              />
            )}
          </div>
        </div>

        {item.background && <UserBackground background={item.background} />}
      </div>
    </Modal>
  );
};

const UserBackground = ({ background }: { background: any[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = background.map((item) => `${item.title} ${item.emoji}`);
  const item = background.reduce((prev, curr) => {
    const item = { [`${curr.title} ${curr.emoji}`]: curr };

    return { ...prev, ...item };
  }, {});

  const activeItem = item[tabs[activeTab]];

  return (
    <div>
      <TextHeading3
        style={{ fontWeight: 700 }}
        className="mb-2 text-sm uppercase text-gray-500"
      >
        🎡 Background
      </TextHeading3>
      <TabsSelector
        tabs={tabs}
        onSelect={(val) => {
          setActiveTab(val);
        }}
      />
      <div className="border-accentColor scrollbar-hide overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4 pt-6">
        {activeItem?.content.map((item: any) => (
          <div
            className="mb-2 grid grid-cols-2 border-b border-b-gray-300 pb-2 last:border-b-0"
            key={item.title}
          >
            <div>
              <TextHeading3
                className="mb-3 rounded-2xl px-2 py-1"
                style={{ backgroundColor: activeItem?.color }}
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
                      className={`bg-soilPurple/20 py-px text-xs`}
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
    </div>
  );
};
