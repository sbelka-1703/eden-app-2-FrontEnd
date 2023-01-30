import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  Avatar,
  Card,
  MemberModal,
  SocialMediaComp,
  TextHeading3,
  TextLabel1,
} from "@eden/package-ui";
import { useState } from "react";
import { GrExpand } from "react-icons/gr";

export interface UserMiniCardProps {
  member?: Maybe<Members>;
  item?: any;
  onExpand?: () => void;
}

export const UserMiniCard = ({ member, item }: UserMiniCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!member && !item) {
    return null;
  }

  return (
    <>
      <Card border shadow>
        <div className={`flex flex-row justify-between justify-items-stretch`}>
          <div></div>
          <div>
            <div className={`relative flex flex-col items-center`}>
              <div className="relative">
                <Avatar
                  src={
                    (member?.discordAvatar as string) || item?.championPicture
                  }
                />
              </div>
              <div className={`flex text-center`}>
                <TextHeading3>
                  @{member?.discordName || item?.discordName}
                </TextHeading3>
              </div>
              <div className={`my-1 flex text-center`}>
                <TextLabel1>
                  {member?.memberRole?.title || item?.designation}
                </TextLabel1>
              </div>
              <div className={`flex justify-center`}>
                <SocialMediaComp
                  size={`sm`}
                  title=""
                  links={member?.links || item?.links}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className={`basis-1/8 w-full text-zinc-400`}
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <GrExpand size="15px" />
            </button>
          </div>
        </div>
      </Card>
      <MemberModal
        member={member}
        open={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
};
