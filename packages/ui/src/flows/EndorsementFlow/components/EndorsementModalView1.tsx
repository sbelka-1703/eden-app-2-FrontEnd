import { UserContext } from "@eden/package-context";
import { Members, Project } from "@eden/package-graphql/generated";
import { Avatar, TextLabel1 } from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

import { ChatBox, EndorseButton, StarRating } from "./";

type ChatMessages = {
  user: string;
  message: string;
};

interface IEndorsementModalView1Props {
  member?: Members;
  project?: Project;
  onNext: () => void;
}

export const EndorsementModalView1 = ({
  member,
  project,
  onNext,
}: IEndorsementModalView1Props) => {
  const { currentUser } = useContext(UserContext);

  const [chatN, setChatN] = useState<ChatMessages[]>([]);

  useEffect(() => {
    if (member && project && currentUser && chatN.length === 0)
      setChatN((prev) => [
        ...prev,
        {
          user: "01",
          message: `Hey @${currentUser?.discordName}!  How was your experience working with @${member?.discordName} on ${project?.title}?`,
        },
      ]);
  }, [member, project, currentUser, chatN]);

  return (
    <div className={`grid grid-cols-3 `}>
      <div className={`col-span-2`}>
        <ChatBox
          chatN={chatN}
          handleSentMessage={(message, user) =>
            console.log("HANDLE MESSAGE ====> ", message, user)
          }
        />
      </div>
      <div className={`col-span-1`}>
        <div className={`text-lg font-medium uppercase text-neutral-700`}>
          Endorsing:
        </div>
        <div className={`my-4	flex items-center gap-2`}>
          <div>
            <Avatar src={member?.discordAvatar!} size="sm" />
          </div>
          <div>
            <div>
              {member?.discordName && (
                <span className="text-lg font-medium tracking-wide text-neutral-600">
                  @{member?.discordName}
                </span>
              )}
            </div>
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              {member?.memberRole?.title}
            </div>
          </div>
        </div>

        <div>
          <TextLabel1 className={`text-neutral-600`}>Top Skills:</TextLabel1>
        </div>
        <div>
          <TextLabel1 className={`text-neutral-600`}>Pros:</TextLabel1>
        </div>
        <div>
          <TextLabel1 className={`text-neutral-600`}>Cons:</TextLabel1>
        </div>
        <div>
          <TextLabel1 className={`text-neutral-600`}>General:</TextLabel1>
        </div>
        <div className={`my-4 text-center`}>
          <TextLabel1 className={`text-xs text-neutral-600`}>
            Would you want to work with @{member?.discordName} again?
          </TextLabel1>
          <StarRating rating={0} />
        </div>
        <div className={`my-2 flex justify-center`}>
          <EndorseButton type={`button`} onClick={onNext} />
        </div>
      </div>
    </div>
  );
};
