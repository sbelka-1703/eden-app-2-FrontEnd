import {
  MatchMembersToSkillOutput,
  Maybe,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  AvatarList,
  Badge,
  Button,
  Card,
  CommonServerAvatarList,
  LongText,
  // MemberModal,
  SocialMediaComp,
  TextLabel1,
  UserInviteModal,
  UserMessageModal,
  UserWithDescription,
} from "@eden/package-ui";
import { useState } from "react";

import { round } from "../../../../utils";

export interface IUserDiscoverCardProps {
  matchMember?: Maybe<MatchMembersToSkillOutput>;
  project?: Maybe<Project>;
  role?: Maybe<RoleType>;
  invite?: boolean;
  messageUser?: boolean;
  phase?: string;
}

export const UserDiscoverCard = ({
  matchMember,
  project,
  role,
  invite,
  phase,
}: IUserDiscoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const member = matchMember?.member;
  const matchPercentage = matchMember?.matchPercentage;
  const nodesPercentage = matchMember?.nodesPercentage;

  if (!member) return null;

  return (
    <Card border>
      <div className={`flex justify-between`}>
        <div></div>
        <div>
          <div className={`relative flex flex-col items-center`}>
            <UserWithDescription
              member={member}
              percentage={round(Number(matchPercentage?.totalPercentage), 0)}
            />
            {member?.links && (
              <div className="flex justify-center">
                <SocialMediaComp size="sm" title="" links={member?.links} />
              </div>
            )}
          </div>
        </div>
        <div>
          <Button onClick={() => setIsOpen(!isOpen)}>More</Button>
        </div>
      </div>

      <div className="flex">
        <LongText
          cutText={100}
          text={(member?.bio as string) || ""}
          className={`text-darkGreen font-Inter my-2 text-sm`}
        />
      </div>

      {member?.serverID && (
        <CommonServerAvatarList
          label={`common servers`}
          size={`xs`}
          serverID={member?.serverID as string[]}
        />
      )}

      {nodesPercentage && (
        <div>
          <p className="font-Inter mb-1 text-sm font-bold text-zinc-500">
            🛠 Top skills
          </p>
          <div>
            {nodesPercentage.slice(0, 6).map((node, index) => (
              <Badge
                text={node?.node?.name || ""}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
      )}

      {member?.endorsements && member?.endorsements.length > 0 && (
        <div className="mt-4">
          <TextLabel1>🎙 ENDORSEMENTS</TextLabel1>
          <div className={`flex`}>
            <AvatarList
              className="inline-block !w-auto !justify-start"
              avatars={member?.endorsements
                .slice(0, 5)
                .map((endorsement: any) => ({
                  size: "xs",
                  src: endorsement?.endorser?.discordAvatar,
                }))}
            />
            {member?.endorsements.slice(5).length > 0 && (
              <p className="text-soilGray ml-6 mt-1 inline">
                +{member?.endorsements.slice(8).length} more
              </p>
            )}
          </div>
        </div>
      )}

      {/* {(item.lifetimeStakeTRST || item.totalTRST) && (
        <div className="-mx-2 mt-3 -mb-3 flex">
          {item.lifetimeStakeTRST && (
            <LifetimeTRST
              member={item}
              lifetimeStakeTRST={item?.lifetimeStakeTRST}
              averageMonthlyReturnTRST={
                Math.round((item?.lifetimeStakeTRST / 100) * 10) / 10
              }
            />
          )}
          {item.totalTRST && (
            <div className="bg-soilPurple ml-auto mr-0 whitespace-nowrap rounded-xl px-2 text-sm text-white">{`${item.totalTRST} $TRST`}</div>
          )}
        </div>
      )} */}

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
    </Card>
  );
};
