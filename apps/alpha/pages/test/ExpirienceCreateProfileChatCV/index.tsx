import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  AI_REPLY_SERVICES,
  Button,
  ChatMessage,
  EdenAiChat,
} from "@eden/package-ui";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";

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

export const CV_TO_MEMORY = gql`
  mutation ($fields: storeLongTermMemorySummaryInput) {
    storeLongTermMemorySummary(fields: $fields) {
      success
      message
    }
  }
`;

const ExperienceCreateProfileChat: React.FC = () => {
  interface MessageObject {
    message: string;
    sentMessage: boolean;
    user?: string;
  }

  const { currentUser } = useContext(UserContext);

  const [sentMessageToEdenAIobj, setSentMessageToEdenAIobj] =
    useState<MessageObject>({ message: "", sentMessage: false, user: "" });

  const [experienceTypeID, setExperienceTypeID] = useState<string>("");

  const [isDoneAvailable, setIsDoneAvailable] = useState(false);

  const [chatN, setChatN] = useState<ChatMessage>([]);

  const [activeCard, setActiveCard] = useState<number>(-1);

  const [cardsData, setCardsData] = useState<cardsDataType[]>(cardsDataInit);

  const [totalTrustPoints, setTotalTrustPoints] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  console.log("activeCard = ", activeCard);

  const [CVtoMemory] = useMutation(CV_TO_MEMORY, {
    onCompleted({ CVtoMemory }) {
      console.log("CVtoMemory.success==== ", CVtoMemory.success);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64File = ((reader.result as string) || "").split(",")[1];
      const response = await fetch("../api/process-pdf/process-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileBuffer: base64File }),
      });

      if (response.ok) {
        const { text } = await response.json();

        // CVtoMemory({ variables: { fields: { message: text, userID: currentUser?._id } } });

        console.log("currentUser?._id", currentUser?._id);

        // CVtoJobs({ variables: { fields: { cvString: text } } });

        // CVtoNodes({ variables: { fields: { message: text } } });

        console.log(text);
      } else {
        const { error } = await response.json();

        console.log("error aaa", error);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (chatN.length > 5) {
      setIsDoneAvailable(true);
    }
  }, [chatN]);

  function handleDoneClick() {
    setIsDoneAvailable(false);
    setActiveCard(-1);

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
    <div className="flex h-screen w-full">
      <div className="flex h-full w-1/2 flex-col space-y-4 p-4">
        <h1 className="mb-4 text-3xl font-bold">
          Help Eden with some questions to know you better
        </h1>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xl">TRUST Points: {totalTrustPoints}</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-2"
        >
          <label>Resume(CV)</label>
          <label htmlFor="input" className="text-center text-sm">
            Upload Recent Resume Here
          </label>
          <input
            className="ml-60"
            onChange={handleFileChange}
            type="file"
            accept=".pdf"
          ></input>

          <Button loading={isLoading} type="submit" variant="primary">
            {isLoading ? "Uploading Resume..." : "Upload Resume"}
          </Button>
        </form>
        <div className="flex h-full flex-wrap">
          {cardsData.map((card: cardsDataType, idx: number) => (
            <div key={card.title} className="h-1/3 w-1/2 p-10">
              <div
                style={
                  idx == activeCard
                    ? {
                        border: "3px solid green",
                        borderRadius: "5px",
                        boxShadow: "0 0 5px 2px rgba(0, 255, 0, 0.5)",
                      }
                    : {}
                }
                className="relative flex h-full flex-col justify-between rounded-lg bg-white bg-opacity-60 p-4 text-center text-gray-800 shadow-lg"
              >
                {card.completed && (
                  <span className="absolute right-2 top-2 rounded-full bg-green-200 p-1 text-4xl text-green-600">
                    &#x2714;
                  </span>
                )}
                <h2 className="mb-2 text-xl">{card.title}</h2>
                <div>
                  <p className="mb-2 text-sm">TRUSE Points: {card.trust}</p>
                  <p className="mb-2 text-sm">Time: {card.time} min</p>
                </div>
                <button
                  className="self-end rounded-md bg-green-600 bg-opacity-90 px-4 py-2 text-white"
                  // onClick={() => {
                  //     // setSentMessageToEdenAIobj({
                  //     //     message: card.firstMessage,
                  //     //     sentMessage: true,
                  //     //     user: "01"
                  //     // });
                  //     setTimeout(console.log("hello " ), 3000);
                  //     setClearConversation(true)
                  // }}
                  onClick={() => {
                    setTimeout(() => {
                      setSentMessageToEdenAIobj({
                        message: card.firstMessage,
                        sentMessage: true,
                        user: "01",
                      });
                    }, 1200);
                    setExperienceTypeID(card.experienceTypeID);
                    setActiveCard(idx);
                  }}
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-screen flex-col items-center justify-center text-lg">
        <div className="h-[60vh]">
          {activeCard != -1 && (
            <EdenAiChat
              key={experienceTypeID}
              //   aiReplyService={AI_REPLY_SERVICES.EDEN_GPT_REPLY_CHAT_API_V3}
              aiReplyService={
                AI_REPLY_SERVICES.EDEN_GPT_CREATE_PROFILE_EXPERIENCE_CHAT
              }
              experienceTypeID={experienceTypeID}
              //   extraNodes={extraNodes}
              //   handleChangeNodes={(_nodeObj: any) => {
              //     // console.log("handleChangeNodes:", nodeObj);
              //     setNodeObj(_nodeObj);
              //   }}
              handleChangeChat={(_chat: any) => {
                // console.log("handleChangeChat:", _chat);
                setChatN(_chat);
              }}
              //   setShowPopupSalary={setShowPopup}
              //   setMode={setMode}
              sentMessageToEdenAIobj={sentMessageToEdenAIobj}
              setSentMessageToEdenAIobj={setSentMessageToEdenAIobj}
              placeholder={""}
            />
          )}
        </div>
        {activeCard != -1 && (
          <div className="mt-8">
            <button
              className={`rounded-full px-6 py-3 font-bold uppercase text-white ${
                isDoneAvailable ? "bg-green-500" : "bg-gray-400"
              }`}
              onClick={handleDoneClick}
            >
              {isDoneAvailable ? "Done!" : "Done"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCreateProfileChat;
