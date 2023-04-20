import {
  AI_REPLY_SERVICES,
  Button,
  ChatMessage,
  EdenAiChat,
} from "@eden/package-ui";
import React, { useEffect, useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";

const cardsDataInit = [
  {
    title: "Skill & Experience",
    trust: 30,
    time: 3,
    completed: false,
    firstMessage: "Can you tell me about your skills and experiences",
    experienceTypeID: "SKILLS_EXPERIENCE",
  },
  {
    title: "Personal Background",
    trust: 30,
    time: 4,
    completed: false,
    firstMessage: "Can you tell me about your Background",
    experienceTypeID: "BACKGROUND",
  },
  {
    title: "Career Goals",
    trust: 25,
    time: 2,
    completed: false,
    firstMessage: "Can you tell me about your Career Goals",
    experienceTypeID: "CAREER_GOALS_ASPIRATIONS",
  },
  {
    title: "Work Preferences",
    trust: 35,
    time: 2,
    completed: false,
    firstMessage: "Can you tell me about your Work preferences",
    experienceTypeID: "WORK_PREFERENCES",
  },
];

interface cardsDataType {
  title: string;
  trust: number;
  time: number;
  completed: boolean;
  firstMessage: string;
  experienceTypeID: string;
}

interface MessageObject {
  message: string;
  sentMessage: boolean;
  user?: string;
}

interface IExperienceCreateProfileChatProps {
  // eslint-disable-next-line no-unused-vars
  handleChangeNodes?: (val: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleChangeChat?: (val: any) => void;
}

export const ExperienceCreateProfileChat: React.FC<
  IExperienceCreateProfileChatProps
> = ({ handleChangeNodes, handleChangeChat }) => {
  const [sentMessageToEdenAIobj, setSentMessageToEdenAIobj] =
    useState<MessageObject>({ message: "", sentMessage: false, user: "" });

  const [experienceTypeID, setExperienceTypeID] = useState<string>("");

  const [isDoneAvailable, setIsDoneAvailable] = useState(false);

  const [chatN, setChatN] = useState<ChatMessage>([]);

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const [cardsData, setCardsData] = useState<cardsDataType[]>(cardsDataInit);

  const [totalTrustPoints, setTotalTrustPoints] = useState(0);

  console.log("activeCard = ", activeCard);

  useEffect(() => {
    if (chatN.length > 5) {
      setIsDoneAvailable(true);
    }
  }, [chatN]);

  function handleDoneClick() {
    setIsDoneAvailable(false);
    setActiveCard(null);

    // update only the cardData that were clicked
    const newCardsData = cardsData.map((card: cardsDataType, index: number) => {
      if (index === activeCard) {
        setTotalTrustPoints(totalTrustPoints + card.trust);
        return { ...card, completed: true };
      }
      return card;
    });

    setCardsData(newCardsData);
  }

  return (
    <div className="h-full w-full">
      <div className="absolute left-0 top-16 w-full bg-white px-4">
        <h2 className="mb-4 text-2xl">
          Help Eden with some questions to know you better
        </h2>
        <p className="mb-2">TRUST Points: {totalTrustPoints}</p>
      </div>
      <div className="pt-20"></div>
      <section className="grid h-[calc(100%-5rem)] w-full grid-cols-12">
        <div className="scrollbar-hide col-span-3 flex h-full flex-col overflow-scroll">
          {cardsData.map((card: cardsDataType, idx: number) => (
            <div key={card.title} className="mb-2 w-full last:mb-0">
              <div
                style={
                  idx == activeCard
                    ? {
                        border: "1px solid rgba(0, 255, 0, 0.5)",
                        borderRadius: "5px",
                        boxShadow: "0 0 5px 2px rgba(0, 255, 0, 0.5)",
                      }
                    : {}
                }
                className="relative flex h-full flex-col rounded-lg border bg-white bg-opacity-60 p-2 text-gray-800"
              >
                {card.completed && (
                  <HiBadgeCheck
                    className="absolute right-2 top-2"
                    size={24}
                    color="rgba(0, 255, 0, 1)"
                  />
                )}
                <h2 className="mb-2">{card.title}</h2>
                <div>
                  <p className="text-sm">TRUST Points: {card.trust}</p>
                  <p className="mb-1 text-sm">⏳ {card.time} min</p>
                </div>
                <Button
                  className="absolute bottom-2 right-2 rounded-md bg-opacity-90 !px-4 !py-px text-xs"
                  // onClick={() => {
                  //     // setSentMessageToEdenAIobj({
                  //     //     message: card.firstMessage,
                  //     //     sentMessage: true,
                  //     //     user: "01"
                  //     // });
                  //     setTimeout(console.log("hello " ), 3000);
                  //     setClearConversation(true)
                  // }}
                  variant="primary"
                  onClick={() => {
                    setExperienceTypeID(card.experienceTypeID);
                    setActiveCard(idx);
                    setSentMessageToEdenAIobj({
                      message: card.firstMessage,
                      sentMessage: true,
                      user: "01",
                    });
                  }}
                >
                  Start
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="relative z-20 col-span-9 flex h-full flex-col items-center justify-center text-lg">
          <div className="absolute -top-14 left-0 h-[calc(100%+2rem)] w-full pl-4">
            {activeCard != null ? (
              <EdenAiChat
                key={experienceTypeID}
                //   aiReplyService={AI_REPLY_SERVICES.EDEN_GPT_REPLY_CHAT_API_V3}
                aiReplyService={
                  AI_REPLY_SERVICES.EDEN_GPT_CREATE_PROFILE_EXPERIENCE_CHAT
                }
                experienceTypeID={experienceTypeID}
                //   extraNodes={extraNodes}
                handleChangeNodes={(_nodeObj: any) => {
                  console.log("handleChangeNodes:", _nodeObj);
                  // setNodeObj(_nodeObj);
                  if (handleChangeNodes) handleChangeNodes(_nodeObj);
                }}
                handleChangeChat={(_chat: any) => {
                  // console.log("handleChangeChat:", _chat);
                  setChatN(_chat);
                  if (handleChangeChat) handleChangeChat(_chat);
                }}
                //   setShowPopupSalary={setShowPopup}
                //   setMode={setMode}
                sentMessageToEdenAIobj={sentMessageToEdenAIobj}
                setSentMessageToEdenAIobj={setSentMessageToEdenAIobj}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-slate-400">
                  Click on start to begin a conversation with Eden AI
                </p>
              </div>
            )}
          </div>
          {activeCard != null && (
            <div className="absolute -bottom-8">
              <Button
                disabled={!isDoneAvailable}
                variant="primary"
                onClick={handleDoneClick}
              >
                {isDoneAvailable ? "Done!" : "Done"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
