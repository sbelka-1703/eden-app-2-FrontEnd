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
}

export const StaticCard = ({ item }: IStaticCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // console.log(item);
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
      <StaticModal
        item={item}
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      />
    </Card>
  );
};
