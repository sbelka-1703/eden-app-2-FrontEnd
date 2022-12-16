import {
  Avatar,
  Badge,
  Button,
  EmojiSelector,
  Modal,
  OpenPositionCard,
  SocialMediaComp,
  TabsSelector,
  TextBody,
  TextHeading2,
  TextHeading3,
  TimelineStepper,
  UserMiniCard,
} from "@eden/package-ui";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { GiExpand } from "react-icons/gi";

// import { TextHeading1 } from "../../atoms";
import { ReviewCard } from "../../cards/ReviewCard";
import { EndorsementList } from "../../lists/EndorsementList";
export interface IStaticModalProps {
  item?: any;
  resultPopUpFlag?: any;
  open?: boolean;
  onClose?: () => void;
}

export const StaticModal = ({
  item,
  resultPopUpFlag,
  open,
  onClose,
}: IStaticModalProps) => {
  if (!item) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        {resultPopUpFlag?.type === "DAO" && <DaoFlagType item={item} />}
        {resultPopUpFlag?.type === "Project" && <ProjectFlagType item={item} />}
        {resultPopUpFlag?.type === "Bounty" && <BountyFlagType item={item} />}
        {resultPopUpFlag?.type === "Channel" && <ChannelFlagType item={item} />}
        {resultPopUpFlag?.type === "User" && <UserFlagType item={item} />}
      </div>
    </Modal>
  );
};

///////////////////////// DefaultHeader /////////////////////////

const DefaultHeader = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className={`my-auto mr-4`}>
          <Button variant="default" className="bg-soilYellow">
            Skip
          </Button>
        </div>

        <div>
          {item?.picture?.length <= 5 ? (
            <EmojiSelector isDisabled emoji={item?.picture} bgColor="#ABF0B3" />
          ) : (
            <Avatar size="lg" isProject src={item?.picture} />
          )}
        </div>
        <div className={`my-auto ml-4`}>
          <Button variant="primary" className="">
            <CheckCircleIcon width={20} className="mr-1" />
            Join
          </Button>
        </div>
      </div>
      <div className={`mt-2 text-center`}>
        <TextHeading3>{item?.name}</TextHeading3>
      </div>
    </>
  );
};

///////////////////////// DAO Flag Type /////////////////////////

const DaoFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <DefaultHeader item={item} />
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-col items-start justify-center">
          <>
            <h1 className="text-soilHeading3 font-poppins font-medium">
              💻 about the DAO
            </h1>
            <p className="text-soilBody font-Inter w-8/12 font-normal">
              {item?.description}
            </p>
          </>
        </div>
        {item.percentage && (
          <div className="mr-12">
            <h1 className="text-soilHeading3 font-poppins text-soilGray -ml-2 font-medium">
              ⚡️Match
            </h1>
            <p className="text-soilPurple font-poppins text-4xl font-semibold">
              {item.percentage}
            </p>
          </div>
        )}
      </div>
      <div className="flex w-full items-start justify-between gap-6">
        <div className="w-3/4">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🛠 Matching Skills
          </p>
          <div>
            {item?.matchingSkills?.map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
        <div className="w-3/4">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🛠 Missing Skills
          </p>
          <div>
            {item?.missingSkills?.map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface IStaticCardTypeProps {
  item?: any;
}

///////////////////////// Project Flag Type /////////////////////////

const ProjectFlagType = ({ item }: IStaticCardTypeProps) => {
  const endorsements = item?.endorsements?.map((endorsement: any) => ({
    member: {
      discordName: endorsement.name,
      discordAvatar: endorsement.avatar,
    },
    text: endorsement.endorsement,
    level: endorsement.level?.name || "",
  }));

  const steps = [
    {
      completed: false,
      date: "APR 21 - JAN 22",
      description: "Launch beta of the platform.",
    },
    {
      completed: false,
      date: "JAN 22 - MAR 22",
      description: "Launch alpha of the platform. Pre-seed: 1 Mil",
    },
    {
      completed: true,
      date: "MAR 22 - JAN 23",
      description: "Launch a native token Seed: 4 Mil",
    },
    {
      completed: false,
      date: "JAN 23 - JAN 24",
      description: "Onboard 5k new devs. Generate first revenue",
    },
  ];

  return (
    <>
      <div className={`mt-4 flex justify-between`}>
        <div className="flex flex-row">
          <div>
            <Avatar
              size="lg"
              isProject
              emoji={item?.picture}
              backColorEmoji={`#ABF0B3`}
            />
          </div>

          <div className={`mx-4`}>
            <TextHeading2>{item?.name}</TextHeading2>
            <div className="text-soilGray/100	font-normal	tracking-wide">
              {item?.description}
            </div>
            <div>
              {item?.roles?.map((role: any, index: number) => (
                <Badge
                  text={role?.name}
                  key={index}
                  className={`bg-soilPurple/20 py-px text-xs`}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className={`mt-6`}>
            <p className="text-soilPurple font-poppins text-4xl font-semibold">
              {item.percentage}
            </p>
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-3`}>
        <div className={`col-span-2`}>
          <div className={`mt-5 mb-2 flex uppercase`}>
            <p className="text-soilGray/100 font-medium tracking-wide">
              📃 Description of the project
            </p>
          </div>
          <div className="text-sm font-medium tracking-normal">
            {item?.description}
          </div>
        </div>
        <div className={`col-span-1`}>
          <div className={`my-4 flex uppercase`}>
            <p className="text-soilGray/100 font-medium tracking-wide">
              🏆 Champion
            </p>
          </div>
          <UserMiniCard item={item} />
        </div>
      </div>

      <div className={`w-full p-4`}>
        <TimelineStepper steps={steps} />
      </div>
      <OpenPosition item={item} />
      {endorsements?.length > 0 && (
        <div className={`my-4 flex`}>
          <p className="text-soilGray/100 font-medium uppercase tracking-wide">
            ⭐️ Reviews
          </p>
        </div>
      )}
      <div
        className={`grid grow grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3`}
      >
        {endorsements?.length > 0 && (
          <>
            {endorsements?.map((endorsement: any, index: number) => (
              <div key={index}>
                {index < 3 && <ReviewCard project={endorsement} />}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

const OpenPosition = ({ item }: { item: any }) => {
  const [expand, setExpand] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = item.roles.map((data: any) => `${data.name}`);
  const role = item.roles.reduce((prev: any, curr: any) => {
    const item = { [`${curr.name}`]: curr };

    return { ...prev, ...item };
  }, {});

  const activeRole = role[tabs[activeTab]];

  const onExpend = (role: string) => {
    console.log(role, "rolleeeee");
    const roleIndex = tabs.findIndex((tab: any) => tab === role);

    setActiveTab(roleIndex);
    setExpand(true);
  };

  return (
    <div>
      <div className={`my-4 flex`}>
        <p className="text-soilGray/100 font-medium uppercase tracking-wide">
          🎬 Open positions
        </p>
        {expand && (
          <Button style={{ border: "none" }} onClick={() => setExpand(false)}>
            <GiExpand size="15px" />
          </Button>
        )}
      </div>

      {expand ? (
        <PositionExpanded
          tabs={tabs}
          activeTab={activeTab}
          activeItem={activeRole}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          <div
            className={`scrollbar-hide mb-4 flex flex-grow overflow-y-scroll`}
          >
            <div
              className={`grid grow grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3`}
            >
              {item?.roles?.map((role: any, index: any) => (
                <OpenPositionCard
                  padding="-m-4"
                  key={index}
                  role={{
                    title: role.name,
                    description: role.description,
                    openPositions: role["Open Seats"],
                  }}
                  percentage={item.rolesPercentages[index] || 0}
                  onApply={onExpend}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PositionExpanded = ({
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
}) => {
  return (
    <>
      <TabsSelector
        tabs={tabs}
        selectedTab={activeTab}
        onSelect={(val) => {
          setActiveTab(val);
        }}
      />
      <div className="border-accentColor scrollbar-hide relative overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4 pt-6">
        <div className="flex flex-col">
          <div className="flex flex-row content-center items-center justify-between">
            <div className="flex flex-row">
              <Avatar size={`md`} src={activeItem.avatar} alt={"avatar"} />
              <div className="ml-3">
                <div className="text-xl	font-medium	tracking-wide	">
                  {activeItem.name}
                </div>
                <div className="text-soilGray/100	text-sm font-normal	tracking-wide">
                  {activeItem.description}
                </div>
                <div>
                  {activeItem.skills.map((item: any, index: any) => (
                    <Badge
                      text={item.skillData.name}
                      key={index}
                      className={`bg-soilPurple/20 py-px text-xs`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="text-soilPurple font-poppins mr-3 text-3xl font-bold">
                59%
              </div>
              <div>
                <div className="flex flex-col content-between justify-between">
                  <Button
                    variant="secondary"
                    radius="default"
                    size="sm"
                    // onClick={onRefer}
                  >
                    Refer 💸
                  </Button>
                  <Button
                    variant="secondary"
                    radius="default"
                    size="sm"
                    className="mt-2"
                    // onClick={() => onApply(role.title as string)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-soilGray/100 font-medium uppercase tracking-wide">
              📃 Description Of the role
            </div>
            <div className="p-1 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </div>
          </div>
          <div className="mb-3 flex flex-row justify-between">
            <div>
              <div className="text-soilGray/100 font-medium uppercase tracking-wide">
                💯 Expectations
              </div>
              <div className="text-sm">
                <li>2 weekly sync calls</li>
                <li>leading a team of 10 people</li>
                <li>willing to learn</li>
              </div>
            </div>
            <div>
              <div className="text-soilGray/100 font-medium uppercase tracking-wide">
                🦜Benefits
              </div>
              <div className="text-sm">
                <li>yearly IRL events</li>
                <li>flexible schedule</li>
                <li>Paid in the native token</li>
              </div>
            </div>
            <div>
              <div className="text-soilGray/100 font-medium uppercase tracking-wide">
                🕵️‍♀️Details
              </div>
              <div className="text-xs font-medium">
                <div className="flex flex-row p-1">
                  <div>🕓</div>
                  <div className={`ml-1 capitalize text-slate-900	`}>
                    15 hours/week
                  </div>
                </div>
                <div className="flex flex-row p-1">
                  <div>💰</div>
                  <div className={`ml-1 capitalize text-slate-900`}>
                    TRST $300
                  </div>
                </div>
                <div className="flex flex-row p-1">
                  <div>🗓</div>
                  <div className={`ml-1 capitalize text-slate-900	`}>
                    2 seasons
                  </div>
                </div>
                <div className="flex flex-row p-1">
                  <div>🪑</div>
                  <div className={`ml-1 capitalize text-slate-900	`}>
                    4 open position
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

///////////////////////// Bounty Flag Type /////////////////////////

const BountyFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <DefaultHeader item={item} />
      <TextHeading3 className="text-accentColor w-full text-center">
        ⚡️ 500 CODE ⚡️
      </TextHeading3>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-col items-start justify-center">
          <>
            <h1 className="text-soilHeading3 font-poppins font-medium">
              🗞 Description
            </h1>
            <p className="text-soilBody font-Inter w-8/12 font-normal">
              {item?.aboutTheBounty}
            </p>
          </>
        </div>
        {item.percentage && (
          <div className="mr-12">
            <h1 className="text-soilHeading3 font-poppins text-soilGray -ml-2 font-medium">
              ⚡️Match
            </h1>
            <p className="text-soilPurple font-poppins text-4xl font-semibold">
              {item.percentage}
            </p>
          </div>
        )}
      </div>

      <div className="grid w-full grid-cols-4 gap-6">
        <div className="col-span-2">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🛠 Matching Skills
          </p>
          <div>
            {item?.matchingSkills?.map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🛠 Missing Skills
          </p>
          <div>
            {item?.missingSkills?.map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            💻 Project
          </p>
          <div className="flex gap-2">
            <Avatar size={`xs`} src={item.ProjectPicture} alt={"avatar"} />
            <TextBody className="mt-1">{item.Project}</TextBody>
          </div>
        </div>
        <div className="col-span-2">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            💻 about the Project
          </p>
          <p className="">{item.description}</p>
        </div>
        <div className="col-span-2">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🥥 Bounty posted by
          </p>
          <div className="flex gap-2">
            <Avatar
              size={`xs`}
              src={item.bountedPostedByPicture}
              alt={"avatar"}
            />
            <TextBody className="mt-1">{item.bountedPostedBy}</TextBody>
          </div>
        </div>
      </div>
    </>
  );
};

///////////////////////// Channel Flag Type /////////////////////////

const ChannelFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <DefaultHeader item={item} />
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-col items-start justify-center">
          <>
            <h1 className="text-soilHeading3 font-poppins font-medium">
              💻 about the Channel
            </h1>
            <p className="text-soilBody font-Inter w-8/12 font-normal">
              {item?.description}
            </p>
          </>
        </div>
        {item.percentage && (
          <div className="mr-12">
            <h1 className="text-soilHeading3 font-poppins text-soilGray -ml-2 font-medium">
              ⚡️Match
            </h1>
            <p className="text-soilPurple font-poppins text-4xl font-semibold">
              {item.percentage}
            </p>
          </div>
        )}
      </div>

      <div className="grid w-full grid-cols-4 gap-6">
        <div className="col-span-2">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🛠 Matching Skills
          </p>
          <div>
            {item?.matchingSkills?.map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🛠 Missing Skills
          </p>
          <div>
            {item?.missingSkills?.map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
        <div className="col-span-4">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            💻 DAO
          </p>
          <div className="flex gap-2">
            <Avatar size={`xs`} src={item.DAO_picture} alt={"avatar"} />
            <TextBody className="mt-1">{item.DAO_name}</TextBody>
          </div>
        </div>
        <div className="col-span-4">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            📍 Location
          </p>
          <p className="">{item.location}</p>
        </div>
        <div className="col-span-4">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            👯‍♂️ People with similar skills
          </p>
          <div className="flex w-full flex-nowrap">
            {item?.peopleWithSimilarWkillsPictures?.map(
              (avatar: string, index: number) => (
                <div key={index} className={`-mr-3`}>
                  <Avatar size={`xs`} src={avatar} alt={"avatar"} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

///////////////////////// User Flag Type /////////////////////////

const UserFlagType = ({ item }: IStaticCardTypeProps) => {
  const endorsements = item?.endorsements?.map((endorsement: any) => ({
    member: {
      discordName: endorsement.name,
      discordAvatar: endorsement.avatar,
    },
    text: endorsement.endorsement,
    level: endorsement.level.name,
  }));

  return (
    <>
      <DefaultHeader item={item} />
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-col items-start justify-center">
          <>
            <h1 className="text-soilHeading3 font-poppins font-medium">
              💻 about the User
            </h1>
            <p className="text-soilBody font-Inter w-8/12 font-normal">
              {item?.description}
            </p>
          </>
        </div>
        {item.percentage && (
          <div className="mr-12">
            <h1 className="text-soilHeading3 font-poppins text-soilGray -ml-2 font-medium">
              ⚡️Match
            </h1>
            <p className="text-soilPurple font-poppins text-4xl font-semibold">
              {item.percentage}
            </p>
          </div>
        )}
      </div>
      <div className="grid w-full grid-cols-4 gap-6">
        <div className="col-span-3">
          <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
            🛠 Skills
          </p>
          <div className="inline-block">
            {item?.Skills?.map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
        <div className="col-span-1 ml-8">
          {!!item.socials?.length && (
            <SocialMediaComp
              title="Socials"
              links={item.socials.map((link: any) => ({
                name: link.name.toLowerCase(),
                url: link.link,
              }))}
              size="sm"
            />
          )}
        </div>
        {endorsements?.length > 0 && (
          <div className="col-span-4">
            <EndorsementList endorsements={endorsements} />
          </div>
        )}
      </div>
    </>
  );
};
