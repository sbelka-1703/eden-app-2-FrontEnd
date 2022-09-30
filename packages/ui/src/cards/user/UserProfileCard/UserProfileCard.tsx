/* eslint-disable camelcase */
import { UserContext } from "@eden/package-context";
import { Maybe, SkillType_Member } from "@eden/package-graphql/generated";
import { Avatar, NumberCircle, SkillList, TextLabel } from "@eden/package-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useContext, useState } from "react";

export interface IUserProfileCardProps {}

export const UserProfileCard = ({}: IUserProfileCardProps) => {
  const { currentUser } = useContext(UserContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const learningSkills: Maybe<SkillType_Member>[] | undefined =
    currentUser?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level === "learning"
    );

  const skilledSkills: Maybe<SkillType_Member>[] | undefined =
    currentUser?.skills?.filter(
      (skill: Maybe<SkillType_Member>) => skill?.level !== "learning"
    );

  return (
    <div className={`text-darkGreen rounded-2xl border bg-white py-6`}>
      <div className={`px-6`}>
        <div className={` font-poppins text-xl font-medium`}>Your Profile</div>
        <div className={`my-3 flex`}>
          <div>
            <Avatar src={currentUser?.discordAvatar || ""} size="md" />
          </div>
          <div className={`font-poppins pl-4 text-2xl font-medium`}>
            <div>
              @{currentUser?.discordName}
              <TextLabel> #{currentUser?.discriminator}</TextLabel>
            </div>
            <div className={`font-Inter text-xl text-zinc-500`}>
              {currentUser?.memberRole?.title}
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className={`h-6/10 scrollbar-hide overflow-y-scroll px-6`}>
          <div className="my-2 flex items-center space-x-2">
            <TextLabel>LEARNING</TextLabel>
            {learningSkills && <NumberCircle value={learningSkills?.length} />}
          </div>
          {learningSkills && (
            <SkillList
              overflowNumber={4}
              skills={learningSkills}
              colorRGB="209,247,196"
            />
          )}
          <div className="my-2 flex items-center space-x-2">
            <TextLabel>SKILLED</TextLabel>
            {skilledSkills && <NumberCircle value={skilledSkills?.length} />}
          </div>
          {skilledSkills && (
            <SkillList
              overflowNumber={4}
              skills={skilledSkills}
              colorRGB="235,225,255"
            />
          )}
        </div>
      )}
      <button
        className={`font-Inter w-full text-sm text-zinc-600`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <span>
            Hide <ChevronUpIcon width={16} className="ml-2 inline" />
          </span>
        ) : (
          <span>
            Show more <ChevronDownIcon width={16} className="ml-2 inline" />
          </span>
        )}
      </button>
    </div>
  );
};
