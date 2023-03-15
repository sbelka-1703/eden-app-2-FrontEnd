// eslint-disable-next-line no-unused-vars
import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Members, Project } from "@eden/package-graphql/generated";
import { Avatar, TextLabel1 } from "@eden/package-ui";
import { useCallback, useContext, useEffect, useState } from "react";

import { ChatBox, EndorseButton, StarRating } from "./";

const EDEN_GPT_REPLY_CHAT_API = gql`
  query ($fields: edenGPTreplyChatAPIInput!) {
    edenGPTreplyChatAPI(fields: $fields) {
      reply
    }
  }
`;

type ChatMessages = {
  user: string;
  message: string;
};

interface IEndorsementModalView1Props {
  member?: Members;
  project?: Project;
  onNext: () => void;
  rating: number;
  // eslint-disable-next-line no-unused-vars
  onRatingChange: (rating: number) => void;
}

export const EndorsementModalView1 = ({
  member,
  project,
  onNext,
  rating,
  onRatingChange,
}: IEndorsementModalView1Props) => {
  const { currentUser } = useContext(UserContext);

  const [messageUser, setMessageUser] = useState<string>("");
  const [chatN, setChatN] = useState<ChatMessages[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);

  const { data: dataEdenGPTReplyChatAPI } = useQuery(EDEN_GPT_REPLY_CHAT_API, {
    variables: {
      fields: {
        message: messageUser,
        conversation: chatN
          .map((obj) => {
            if (obj.user === "01") {
              return { role: "assistant", content: obj.message };
            } else {
              return { role: "user", content: obj.message };
            }
          })
          .slice(-6),
        userID: currentUser?._id,
      },
    },
    skip: messageUser == "",
    onCompleted: (data) => {
      console.log("dataEdenGPTReplyChatAPI = ", data);
      setChatN((prev) => [
        ...prev,
        { user: "01", message: data.edenGPTreplyChatAPI.reply },
      ]);
      setMessageUser("");
      setLoading(false);
    },
  });

  useEffect(() => {
    if (dataEdenGPTReplyChatAPI)
      console.log("dataEdenGPTReplyChatAPI = ", dataEdenGPTReplyChatAPI);
  }, [dataEdenGPTReplyChatAPI]);

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

  // useEffect(() => {
  //   console.log("chatN = ", chatN);
  // }, [chatN]);

  const handleSentMessage = useCallback((message: string, user: string) => {
    setLoading(true);
    setChatN((prev) => [...prev, { user, message }]);
    setMessageUser(message);
  }, []);

  return (
    <div className={`grid grid-cols-3 gap-4`}>
      <div className={`col-span-2`}>
        <ChatBox chatN={chatN} handleSentMessage={handleSentMessage} />
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
          <StarRating rating={rating} onRatingChange={onRatingChange} />
        </div>
        <div className={`my-2 flex justify-center`}>
          <EndorseButton type={`button`} onClick={onNext} />
        </div>
      </div>
    </div>
  );
};
