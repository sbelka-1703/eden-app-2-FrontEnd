import {
  MatchMembersToSkillOutput,
  Maybe,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  AvatarList,
  Badge,
  Button,
  Card,
  LongText,
  SocialMediaComp,
  TextHeading3,
  TextLabel,
  UserDiscoverModal,
} from "@eden/package-ui";
import { useState } from "react";

import { round } from "../../../../utils";

export interface IUserDiscoverCardProps {
  matchMember?: Maybe<MatchMembersToSkillOutput>;
  item?: any;
  resultCardFlag?: any;
  resultPopUpFlag?: any;
}

export const UserDiscoverCard = ({ matchMember }: IUserDiscoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const member = matchMember?.member;
  const matchPercentage = matchMember?.matchPercentage;

  if (!member) return null;

  return (
    <Card border>
      <div className={`flex justify-between`}>
        <div></div>
        <div>
          <div className={`relative flex flex-col items-center`}>
            <div className="relative">
              <Avatar src={member?.discordAvatar as string} />

              {matchPercentage?.totalPercentage && (
                <div
                  className={`text-soilPurple absolute -mt-9 ml-12 rounded-full bg-white px-1.5 text-xl font-semibold shadow-sm`}
                >
                  {round(Number(matchPercentage?.totalPercentage), 0)}%
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <TextHeading3>@{member?.discordName}</TextHeading3>
              <TextLabel className="mt-2 pl-1">
                #{member?.discriminator}
              </TextLabel>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={() => setIsOpen(!isOpen)}>More</Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <TextHeading3 className="text-sm  text-gray-600">
          {member?.memberRole?.title}
        </TextHeading3>

        {member?.links && (
          <SocialMediaComp size="1.2rem" title="" links={member?.links} />
        )}
      </div>
      <div className="flex">
        <LongText
          cutText={100}
          text={(member?.bio as string) || ""}
          className={`text-darkGreen font-Inter my-2 text-sm`}
        />
      </div>

      {member?.nodes && (
        <div>
          <p className="font-Inter mb-1 text-sm font-bold text-zinc-500">
            🛠 Top skills
          </p>
          <div>
            {member?.nodes.slice(0, 6).map((node, index) => (
              <Badge
                text={node?.nodeData?.name || ""}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
      )}

      {member?.endorsements && (
        <div className="mt-4">
          <p className="font-Inter mb-1 text-sm font-bold text-zinc-500">
            🎙 ENDORSEMENTS
          </p>
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
            <p className="text-soilGray ml-6 inline">
              +{member?.endorsements.slice(8).length} more
            </p>
          )}
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

      <UserDiscoverModal
        open={isOpen}
        member={member}
        matchPercentage={matchPercentage}
        onClose={() => setIsOpen(!isOpen)}
      />
    </Card>
  );
};
