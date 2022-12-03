import { Members } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Card,
  // NumberCircle,
  MemberModal,
  ProgressBarGeneric,
  // SocialMediaComp,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";
import { useState } from "react";

import { getFillProfilePercentage } from "../../../../utils/fill-profile-percentage";

export interface IUserCardOnboardPartyNodesProps {
  member: Members;
}

export const UserCardOnboardPartyNodes = ({
  member,
}: IUserCardOnboardPartyNodesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const progress = getFillProfilePercentage(member);

  return (
    <Card border className="border-soilGray col-span-1 bg-white p-3">
      <div className="flex items-center">
        {member.discordAvatar && (
          <button onClick={() => setIsModalOpen(true)}>
            <div className="mr-3">
              <Avatar src={member.discordAvatar} size="md" />
            </div>
          </button>
        )}

        <div>
          <div>
            <TextHeading3 className="-mt-3">{member.discordName}</TextHeading3>
            {member.memberRole && (
              <p className="text-xs font-medium leading-none text-zinc-500">
                <span className="mr-1">💼</span>
                {member.memberRole.title?.toUpperCase()}
              </p>
            )}
            {/* <SocialMediaComp links={member.links} title="" size="18px" /> */}
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div className="mb-1 flex items-baseline">
          <TextLabel>PROFILE PROGRESS</TextLabel>
          <span className="ml-auto">{progress}%</span>
        </div>
        <ProgressBarGeneric progress={progress} />
      </div>
      <div className="flex items-center space-x-2 py-1">
        <TextLabel>PREFERRED PROJECTS</TextLabel>
      </div>
      <div>
        {member?.nodes?.map((item, index) => {
          if (item?.nodeData?.node == "sub_typeProject") {
            return (
              <Badge
                key={index}
                text={item?.nodeData?.name || ""}
                colorRGB={`209,247,196`}
                className={`font-Inter text-sm`}
                cutText={16}
              />
            );
          }
        })}
      </div>
      <div className="flex items-center space-x-2 py-1">
        <TextLabel>SKILLS</TextLabel>
      </div>
      <div>
        {member?.nodes?.map((item, index) => {
          if (item?.nodeData?.node == "sub_expertise") {
            return (
              <Badge
                key={index}
                text={item?.nodeData?.name || ""}
                colorRGB={`235,225,255`}
                className={`font-Inter text-sm`}
                cutText={16}
              />
            );
          }
        })}
      </div>
      <TextLabel>ABOUT ME</TextLabel>
      <div className={`text-darkGreen font-poppins text-sm font-medium`}>
        {member.bio}
      </div>
      <MemberModal
        member={member}
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      />
    </Card>
  );
};
