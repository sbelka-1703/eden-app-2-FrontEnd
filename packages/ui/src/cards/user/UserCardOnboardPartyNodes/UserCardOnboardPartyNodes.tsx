import { Members } from "@eden/package-graphql/generated";
import {
  Avatar,
  Card,
  // NumberCircle,
  MemberModal,
  NodeList,
  // ProgressBarGeneric,
  SocialMediaComp,
  TextHeading3,
  TextLabel2,
} from "@eden/package-ui";
import { useState } from "react";

// import { getFillProfilePercentage } from "../../../../utils/fill-profile-percentage";

export interface IUserCardOnboardPartyNodesProps {
  member: Members;
}

export const UserCardOnboardPartyNodes = ({
  member,
}: IUserCardOnboardPartyNodesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const progress = getFillProfilePercentage(member);

  const subExpertise = member?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_expertise"
  );

  const projectType = member?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_typeProject"
  );

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
              <p className="mb-4 text-xs font-medium leading-none text-zinc-500">
                <span className="mr-1">💼</span>
                {member.memberRole.title?.toUpperCase()}
              </p>
            )}
            <SocialMediaComp links={member.links} title="" size="sm" />
          </div>
        </div>
      </div>
      {/* <div className="mb-2">
        <div className="mb-1 flex items-baseline">
          <TextLabel>PROFILE PROGRESS</TextLabel>
          <span className="ml-auto">{progress}%</span>
        </div>
        <ProgressBarGeneric progress={progress} />
      </div> */}

      <TextLabel2>EXPERTISES</TextLabel2>
      <NodeList nodes={subExpertise} colorRGB={`235,225,255`} />
      <TextLabel2>PREFERRED PROJECTS</TextLabel2>
      <NodeList nodes={projectType} colorRGB={`209,247,196`} />
      <TextLabel2>ABOUT ME</TextLabel2>
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
