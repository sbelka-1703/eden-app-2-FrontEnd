import {
  MatchMembersToSkillOutput,
  Maybe,
  NodesType,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  AvatarList,
  Badge,
  Button,
  Card,
  CommonServerAvatarListTest,
  LongText,
  MatchAvatar,
  NodeList,
  // MemberModal,
  SocialMediaComp,
  TextHeading3,
  TextHeading1,
  TextLabel,
  UserInviteModal,
  UserMessageModal,
  UserWithDescription,
} from "@eden/package-ui";
import { useState } from "react";

import { round } from "../../../../utils";
import { trimParentheses } from "../../../../utils/trim-parentheses";

export interface IUserDiscoverCardTestProps {
  matchMember?: Maybe<MatchMembersToSkillOutput>;
  project?: Maybe<Project>;
  role?: Maybe<RoleType>;
  invite?: boolean;
  messageUser?: boolean;
  phase?: string;
}

export const UserDiscoverCardTest = ({
  matchMember,
  project,
  role,
  invite,
  phase,
}: IUserDiscoverCardTestProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const member = matchMember?.member;
  const matchPercentage = matchMember?.matchPercentage;
  const nodesPercentage = matchMember?.nodesPercentage;

  if (!member) return null;

  const subExpertise = member?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_expertise"
  );
  const colorRGBArray = ["244,229,255", "214,233,255", "231,242,219"];
  const badges = subExpertise
    ?.slice(0, 2)
    ?.map((node: Maybe<NodesType> | undefined, index: number) => (
      <Badge
        key={index}
        text={trimParentheses(node?.nodeData?.name || "")}
        colorRGB={colorRGBArray[index]}
        className={`font-Inter text-sm`}
        cutText={16}
      />
    ));

  return (
    <div className="max-h-[348px] rounded-2xl border p-2">
      <div className={`flex justify-between`}>
        <div className={`relative flex w-full flex-col items-center`}>
          <div className={`desc font-Inter  flex  w-full content-center`}>
            <MatchAvatar
              src={member?.discordAvatar as string}
              percentage={
                round(Number(matchPercentage?.totalPercentage), 0) as number
              }
              size={`md`}
            />
            <div className="w-full flex-col items-start pl-4 ">
              <div className="flex ">
                <TextHeading3>{member?.discordName}</TextHeading3>
              </div>
              <div className=" font-semibold text-gray-400">
                {member?.memberRole?.title}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <LongText
          cutText={100}
          text={(member?.bio as string) || ""}
          className={`text-darkGreen font-Inter my-2 text-sm`}
        />
      </div>
      <div className="pb-2">
        <div>
          <TextHeading3
            style={{ fontWeight: 700 }}
            className="mb-2 text-sm uppercase text-gray-500"
          >
            💫 Top skills
          </TextHeading3>
          <div>{badges?.slice(0, 6)}</div>
        </div>
      </div>

      {member?.serverID && (
        <CommonServerAvatarListTest
          label={`💯 Eden servers`}
          size={`xs`}
          serverID={member?.serverID as string[]}
        />
      )}

      {invite && project && role ? (
        <UserInviteModal
          open={isOpen}
          member={member}
          project={project}
          role={role}
          phase={phase}
          matchPercentage={matchPercentage}
          onClose={() => setIsOpen(!isOpen)}
        />
      ) : (
        <UserMessageModal
          open={isOpen}
          member={member}
          matchPercentage={matchPercentage}
          onClose={() => setIsOpen(!isOpen)}
        />
      )}
      <div className="float-right ">
        <div
          className="cursor-pointer rounded-lg border border-black py-2 px-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          More
        </div>
      </div>
    </div>
  );
};
