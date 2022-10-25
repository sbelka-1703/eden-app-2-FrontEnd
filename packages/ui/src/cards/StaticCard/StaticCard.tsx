import {
  Avatar,
  Badge,
  Button,
  Card,
  StaticModal,
  TextHeading3,
} from "@eden/package-ui";
import { useState } from "react";

export interface IStaticCardProps {
  item?: any;
  resultCardFlag?: any;
  resultPopUpFlag?: any;
}

export const StaticCard = ({
  item,
  resultCardFlag,
  resultPopUpFlag,
}: IStaticCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(item);
  // console.log(resultCardFlag);
  console.log(resultPopUpFlag);
  if (!item) return null;

  return (
    <Card border>
      <div className={`flex justify-between`}>
        <div></div>
        <div>
          <div className={`relative`}>
            <Avatar isProject src={item?.picture} />
            <div
              className={`text-soilPurple absolute -mt-9 ml-12 rounded-full bg-white px-1.5 text-xl font-semibold shadow-sm`}
            >
              {item?.percentage}
            </div>
          </div>
          <TextHeading3>{item?.name}</TextHeading3>
        </div>
        <div>
          <Button onClick={() => setIsOpen(!isOpen)}>More</Button>
        </div>
      </div>
      <div className={`text-darkGreen font-Inter my-2 text-sm`}>
        {item?.description}
      </div>

      {resultCardFlag?.type === "DAO" && <DaoFlagType item={item} />}
      {resultCardFlag?.type === "Project" && <ProjectFlagType item={item} />}

      <StaticModal
        item={item}
        resultPopUpFlag={resultPopUpFlag}
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      />
    </Card>
  );
};

export interface IStaticCardTypeProps {
  item?: any;
}

///////////////////////// DAO Flag Type /////////////////////////

const DaoFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <div className={`font-Inter text-sm text-zinc-500`}>
        🛠 Relevant Skills
      </div>
      <div>
        {item?.matchingSkills?.map((skill: string, index: number) => (
          <Badge
            text={skill}
            key={index}
            className={`bg-soilPurple/20 py-px text-xs`}
          />
        ))}
      </div>
      <div className={`font-Inter my-2 text-sm text-zinc-500`}>
        👯‍♂️ Eden members in D_D & BDAO
      </div>
      <div className="flex w-full flex-nowrap">
        {item?.edenMembersDAOPictures?.map((avatar: string, index: number) => (
          <div key={index} className={`-mr-3`}>
            <Avatar size={`xs`} src={avatar} alt={"avatar"} />
          </div>
        ))}
      </div>
      <div className={`font-Inter mt-2 text-sm text-zinc-500`}>
        Eden adoptiopn in Bankless is {item?.edenMembersDAO}%
      </div>
    </>
  );
};

///////////////////////// Project Flag Type /////////////////////////

const ProjectFlagType = ({ item }: IStaticCardTypeProps) => {
  return (
    <>
      <div className={`font-Inter text-sm text-zinc-500`}>🛠 Relevant Roles</div>
      <div>
        {item?.roles?.map((role: any, index: number) => (
          <Badge
            text={role?.name}
            key={index}
            className={`bg-soilPurple/20 py-px text-xs`}
          />
        ))}
      </div>
      <div className={`font-Inter my-2 text-sm text-zinc-500`}>
        👯‍♂️ Core Team
      </div>
      <div className="flex w-full flex-nowrap">
        {item?.coreTeamPicture?.map((avatar: string, index: number) => (
          <div key={index} className={`-mr-3`}>
            <Avatar size={`xs`} src={avatar} alt={"avatar"} />
          </div>
        ))}
      </div>
      <div className={`font-Inter mt-2 text-sm text-zinc-500`}>
        Eden adoptiopn in Bankless is {item?.edenMembersDAO}%
      </div>
    </>
  );
};
