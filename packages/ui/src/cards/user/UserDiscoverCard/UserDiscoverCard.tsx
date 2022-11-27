import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  Avatar,
  // AvatarList,
  // Badge,
  Button,
  Card,
  Favorite,
  LongText,
  // ProfileExpandedModal,
  SocialMediaComp,
  // TextBody,
  TextHeading3,
  TextLabel,
  UserDiscoverModal,
} from "@eden/package-ui";
import { useState } from "react";

export interface IUserDiscoverCardProps {
  member?: Maybe<Members>;
  item?: any;
  resultCardFlag?: any;
  resultPopUpFlag?: any;
}

export const UserDiscoverCard = ({ member }: IUserDiscoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // console.log("member", member);
  if (!member) return null;

  return (
    <Card border>
      <div className={`flex justify-between`}>
        <div>
          <Favorite
            favorite={isFavorite}
            onFavorite={() => setIsFavorite((favorite) => !favorite)}
          />
        </div>
        <div>
          <div className={`relative flex flex-col items-center`}>
            <div className="relative">
              <Avatar src={member?.discordAvatar as string} />

              <div
                className={`text-soilPurple absolute -mt-9 ml-12 rounded-full bg-white px-1.5 text-xl font-semibold shadow-sm`}
              >
                {/* {item?.percentage} */}
              </div>
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

      {/* {item?.Skills && (
        <div>
          <p className="font-Inter mb-1 text-sm font-bold text-zinc-500">
            🛠 Top skills
          </p>
          <div>
            {item?.Skills.slice(0, 6).map((skill: string, index: number) => (
              <Badge
                text={skill}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))}
          </div>
        </div>
      )} */}

      {/* {item.endorsements && (
        <div className="mt-4">
          <p className="font-Inter mb-1 text-sm font-bold text-zinc-500">
            🎙 ENDORSEMENTS
          </p>
          <AvatarList
            className="inline-block !w-auto !justify-start"
            avatars={item.endorsements.slice(0, 5).map((endorsement: any) => ({
              size: "xs",
              src: endorsement.avatar,
            }))}
          />
          {item.endorsements.slice(5).length > 0 && (
            <p className="text-soilGray ml-6 inline">
              +{item.endorsements.slice(8).length} more
            </p>
          )}
        </div>
      )} */}

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
      {/* {resultPopUpFlag?.type === "User" ? (
        <ProfileExpandedModal
          open={isOpen}
          item={item}
          onClose={() => setIsOpen(!isOpen)}
        />
      ) : (
        <StaticModal
          item={item}
          resultPopUpFlag={resultPopUpFlag}
          open={isOpen}
          onClose={() => setIsOpen(!isOpen)}
        />
      )} */}
      <UserDiscoverModal
        open={isOpen}
        member={member}
        onClose={() => setIsOpen(!isOpen)}
      />
    </Card>
  );
};
