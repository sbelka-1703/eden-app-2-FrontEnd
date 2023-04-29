import {
  AI_INTERVIEW_SERVICES,
  ChatMessage,
  InterviewEdenAI,
} from "@eden/package-ui";
import React, { useState } from "react";

// interface cardsDataType {
//   title: string;
//   trust: number;
//   time: number;
//   completed: boolean;
//   firstMessage: string;
//   experienceTypeID: string;
// }

const InterviewEdenAIpage: React.FC = () => {
  interface MessageObject {
    message: string;
    sentMessage: boolean;
    user?: string;
  }
  const [sentMessageToEdenAIobj, setSentMessageToEdenAIobj] =
    useState<MessageObject>({ message: "", sentMessage: false, user: "" });

  const [experienceTypeID] = useState<string>("");

  const [chatN, setChatN] = useState<ChatMessage>([]);

  console.log("chatN = ", chatN);

  return (
    <div className="flex h-screen w-full">
      <div className="flex h-full w-1/2 flex-col space-y-4 p-4">
        <h1 className="mb-4 text-3xl font-bold">
          Help Eden with some questions to know you better
        </h1>
      </div>
      <div className="flex h-screen flex-col items-center justify-center text-lg">
        <div className="h-[60vh]">
          {
            <InterviewEdenAI
              key={experienceTypeID}
              aiReplyService={AI_INTERVIEW_SERVICES.INTERVIEW_EDEN_AI}
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
          }
        </div>
      </div>
    </div>
  );
};

export default InterviewEdenAIpage;
