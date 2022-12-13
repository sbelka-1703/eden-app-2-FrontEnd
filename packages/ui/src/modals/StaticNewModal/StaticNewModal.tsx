import {
  Avatar,
  Badge,
  Button,
  EmojiSelector,
  Modal,
  SocialMediaComp,
  TextBody,
  TextHeading2,
  TextHeading3,
} from "@eden/package-ui";
import { CheckCircleIcon } from "@heroicons/react/solid";

import { RoleCard } from "../../archive/cards/RoleCard";
import { AvatarList } from "../../lists";
import { EndorsementList } from "../../lists/EndorsementList";

export interface IStaticNewModalProps {
  item?: any;
  resultPopUpFlag?: any;
  open?: boolean;
  onClose?: () => void;
}

export const StaticNewModal = ({
  item,
  resultPopUpFlag,
  open,
  onClose,
}: IStaticNewModalProps) => {
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

const ProjectFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <DefaultHeader item={item} />

      <div className={`grid grid-cols-3`}>
        <div className={`col-span-2`}>
          <div className={`my-4 flex flex-col`}>
            <p className="mb-3 text-xl font-semibold tracking-widest subpixel-antialiased">
              💻 about the Project
            </p>
            <div>{item?.description}</div>
          </div>
        </div>
        <div className={`col-span-1 col-end-7`}>
          <h1 className="text-soilHeading3 font-poppins text-soilGray -ml-2 font-medium">
            ⚡️Match
          </h1>
          <p className="text-soilPurple font-poppins text-4xl font-semibold">
            {item.percentage}
          </p>
        </div>
      </div>

      <div className={`mt-2 w-full`}>
        <p className="font-medium	tracking-wide	text-slate-500">
          🛠 Relevant Roles
        </p>
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
      <div className={`mt-2 w-full`}>
        <p className="font-medium	tracking-wide	text-slate-500">🧑‍🤝‍🧑 Core Team</p>
        <div>
          <AvatarList
            className="inline-block !w-auto !justify-start"
            avatars={item?.coreTeamPicture.slice(0, 5).map((pic: any) => ({
              size: "xs",
              src: pic,
            }))}
          />
        </div>
      </div>
      <div className={`my-5 flex`}>
        <TextHeading2>Open Roles</TextHeading2>
      </div>

      <div className={`scrollbar-hide mb-4 flex flex-grow overflow-y-scroll`}>
        <div
          className={`grid grow grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3`}
        >
          {item?.roles?.map((role: any, index: any) => (
            <RoleCard
              key={index}
              role={{
                title: role.name,
                description: role.description,
                openPositions: role["Open Seats"],
              }}
              percentage={item.rolesPercentages[index] || 0}
              onApply={(val) => {
                console.log(val);
              }}
            />
          ))}
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
              size="1.8rem"
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
