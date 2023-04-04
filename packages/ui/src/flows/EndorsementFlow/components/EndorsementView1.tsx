import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  KeywordValue,
  Members,
  NodesType,
} from "@eden/package-graphql/generated";
import { Avatar, TextHeading2, TextLabel1 } from "@eden/package-ui";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BsCoin } from "react-icons/bs";

import { IChatMessages } from "../EndorsementFlow";
import { ChatBox, KeywordList, ReviewButton, StarRating } from "./";

const EDEN_GPT_ENDORSE_CHAT_API = gql`
  query ($fields: edenGPTEndorseChatAPIInput!) {
    edenGPTEndorseChatAPI(fields: $fields) {
      reply
    }
  }
`;

const MESSAGE_MAP_KG = gql`
  query ($fields: messageMapKGInput!) {
    messageMapKG(fields: $fields) {
      keywords {
        keyword
        confidence
        nodeID
      }
    }
  }
`;

interface IEndorsementView1Props {
  member?: Members;
  onNext: () => void;
  rating: number;
  // eslint-disable-next-line no-unused-vars
  onRatingChange: (rating: number) => void;
  chatMessages?: IChatMessages[];
  // eslint-disable-next-line no-unused-vars
  onChatMessagesChange: Dispatch<SetStateAction<IChatMessages[]>>;
  endorsedSkills?: NodesType[];
  keywords?: any[];
  onKeywordsChange?: Dispatch<SetStateAction<any[]>>;
}

export const EndorsementView1 = ({
  member,
  onNext,
  rating,
  onRatingChange,
  chatMessages,
  onChatMessagesChange,
  endorsedSkills,
  keywords,
  onKeywordsChange,
}: IEndorsementView1Props) => {
  const { currentUser } = useContext(UserContext);

  const [messageUser, setMessageUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useQuery(EDEN_GPT_ENDORSE_CHAT_API, {
    variables: {
      fields: {
        message: messageUser,
        conversation: chatMessages?.map((obj: IChatMessages) => {
          if (obj.user === "01") {
            return { role: "assistant", content: obj.message };
          } else {
            return { role: "user", content: obj.message };
          }
        }),
        userID: currentUser?._id,
      },
    },
    skip: messageUser == "",
    onCompleted: (data) => {
      // console.log("dataEdenGPTEndorseChatAPI = ", data);
      onChatMessagesChange((prev) => [
        ...prev,
        { user: "01", message: data.edenGPTEndorseChatAPI.reply },
      ]);
      setMessageUser("");
      setLoading(false);
    },
  });

  const chatNToString = () => {
    let chatNString = "";

    chatMessages?.forEach((message) => {
      chatNString += message.message + " ";
    });
    // console.log("chatNString = ", chatNString);
    return chatNString;
  };

  useQuery(MESSAGE_MAP_KG, {
    variables: {
      fields: {
        message: chatNToString(),
      },
    },
    skip: chatMessages && chatMessages.length < 2,
    onCompleted: (data) => {
      // check if the keywords are already in the list
      const newKeywords = data.messageMapKG.keywords.filter(
        (keyword: KeywordValue) => {
          return !keywords?.some((k) => k.keyword === keyword.keyword);
        }
      );

      // console.log("NEW KEYWORDS = ", newKeywords);
      onKeywordsChange && onKeywordsChange((prev) => [...prev, ...newKeywords]);
    },
  });

  useEffect(() => {
    if (member && currentUser && chatMessages?.length === 0)
      onChatMessagesChange((prev) => [
        ...prev,
        {
          user: "01",
          message: `Hey ${currentUser?.discordName}!  How do you feel ${
            member?.discordName
          } is with ${endorsedSkills && endorsedSkills[0].nodeData?.name}?`,
        },
      ]);
  }, [member, currentUser, chatMessages]);

  const handleSentMessage = useCallback((message: string, user: string) => {
    setLoading(true);
    onChatMessagesChange((prev) => [...prev, { user, message }]);
    setMessageUser(message);
  }, []);

  return (
    <div className={`h-full`}>
      <TextHeading2>{`Chat with Eden AI:`}</TextHeading2>
      <div className={`my-4 flex justify-center`}>
        <div
          className={`bg-soilYellow/60 flex items-center gap-2 rounded-full`}
        >
          <Avatar size={`sm`} src={member?.discordAvatar || ""} />
          <div className={`py-1 pr-6 text-sm font-medium text-zinc-700`}>
            <div>
              <span className={`text-lg font-semibold text-zinc-700`}>
                {member?.discordName || ""}
              </span>{" "}
              invited you to endorse them for
            </div>
            <div>
              their expertise in
              {endorsedSkills?.map((node) => (
                <span key={node?.nodeData?._id} className={`px-1 font-bold`}>
                  {node?.nodeData?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`grid h-4/5 grid-cols-3 gap-4`}>
        <div className={`col-span-2`}>
          <ChatBox
            chatN={chatMessages}
            messageLoading={loading}
            handleSentMessage={handleSentMessage}
          />
        </div>
        <div className={`relative col-span-1`}>
          <TextLabel1>Endorsing For:</TextLabel1>
          <div className={`mb-6`}>
            {endorsedSkills?.map((node) => (
              <span
                key={node?.nodeData?._id}
                className={`px-1 text-lg font-bold text-zinc-800`}
              >
                {node?.nodeData?.name}
              </span>
            ))}
          </div>

          <KeywordList
            label={`Complimentary Skills:`}
            nodes={keywords}
            colorRGB={`235,225,255`}
          />

          <div className={`absolute inset-x-0 bottom-6`}>
            <div className={`my-4 text-center shadow-md`}>
              <TextLabel1 className={`text-xs font-semibold text-neutral-800`}>
                Would you want to work with @{member?.discordName} again?
              </TextLabel1>
              <StarRating rating={rating} onRatingChange={onRatingChange} />
            </div>
            <div className={`mt-12 flex justify-center`}>
              {chatMessages && chatMessages?.length < 4 ? (
                <button
                  type={`button`}
                  disabled
                  className={`rounded-full border-2 bg-[#D7D7FF]/10 px-4 py-1 font-semibold uppercase text-neutral-400`}
                >
                  Endorse{" "}
                  <BsCoin
                    className={`ml-2 inline-block h-4 w-4 text-yellow-500`}
                  />
                </button>
              ) : (
                <ReviewButton type={`button`} onClick={onNext} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
