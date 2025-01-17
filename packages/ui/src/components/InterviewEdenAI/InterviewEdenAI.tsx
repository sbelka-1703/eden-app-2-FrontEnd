import { useQuery } from "@apollo/client";
import { Maybe } from "@eden/package-graphql/generated";
import { ChatSimple } from "@eden/package-ui";
// import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { INTERVIEW_EDEN_AI } from "./gqlFunctions";

interface NodeObj {
  [key: string]: {
    active: boolean;
    confidence: number;
    isNew: boolean;
  };
}
interface Question {
  _id: number;
  content: string;
  bestAnswer: string;
}

// interface Task {
//   taskType: string;
//   percentageCompleted: number;
//   taskTypeID: string;
// }

interface MessageObject {
  message: string;
  sentMessage: boolean;
  user?: string;
}

export enum AI_INTERVIEW_SERVICES {
  // eslint-disable-next-line no-unused-vars
  INTERVIEW_EDEN_AI = "INTERVIEW_EDEN_AI",
}
type ChatMessage = Array<{ user: string; message: string }>;

export interface IInterviewEdenAIProps {
  aiReplyService: AI_INTERVIEW_SERVICES;
  extraNodes?: Array<any>;
  sentMessageToEdenAIobj?: MessageObject;
  changeChatN?: ChatMessage;
  experienceTypeID?: string;
  questions?: Question[];
  userID?: Maybe<string> | undefined;
  // eslint-disable-next-line no-unused-vars
  handleChangeNodes?: (nodes: NodeObj) => void;
  // eslint-disable-next-line no-unused-vars
  handleChangeChat?: (chat: ChatMessage) => void;
  // eslint-disable-next-line no-unused-vars
  setShowPopupSalary?: (show: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  setMode?: (val: "salary" | "level" | "availability") => void;
  // eslint-disable-next-line no-unused-vars
  setSentMessageToEdenAIobj?: (message: any, sentMessage: any) => void;
  // eslint-disable-next-line no-unused-vars
  setChangeChatN?: (messageArr: any) => void;
  // eslint-disable-next-line no-unused-vars
  setQuestions?: (questions: Question[]) => void;
  placeholder?: any;
}

export const InterviewEdenAI = ({
  aiReplyService,
  // extraNodes, // extra nodes to add to the query
  sentMessageToEdenAIobj,
  // experienceTypeID,
  changeChatN,
  questions,
  userID,
  handleChangeNodes,
  handleChangeChat,
  // setShowPopupSalary,
  // setMode,
  setSentMessageToEdenAIobj,
  setChangeChatN,
  setQuestions,
  placeholder = "",
}: IInterviewEdenAIProps) => {
  // const { currentUser } = useContext(UserContext);

  const [chatN, setChatN] = useState<ChatMessage>([] as ChatMessage); // all chat messages

  // const [conversationN, setConversationN] = useState<ChatMessage>([] as ChatMessage); // all chat messages

  // const [chatNprepareGPT, setChatNprepareGPT] = useState<string>(""); // formated chat messages for chatGPT
  // const [messageUser, setMessageUser] = useState<string>(""); // last message sent from user

  const [nodeObj] = useState<NodeObj>({}); // list of nodes
  // const [nodeObj, setNodeObj] = useState<NodeObj>({}); // list of nodes

  const [edenAIsentMessage, setEdenAIsentMessage] = useState<boolean>(false); // sets if response is pending (TODO => change logic to query based)
  const [numMessageLongTermMem, setNumMessageLongTermMem] = useState<any>(0);

  // const [previusTaskDoneID, setPreviusTaskDoneID] = useState<String>("");

  // const [executedTasks, setExecutedTasks] = useState<Task[]>([
  //   {
  //     taskType: "Find Skill",
  //     percentageCompleted: 0,
  //     taskTypeID: "skill_task",
  //   },
  //   {
  //     taskType: "Find Industry",
  //     percentageCompleted: 0,
  //     taskTypeID: "insudtry_task",
  //   },
  //   {
  //     taskType: "Find Experience level",
  //     percentageCompleted: 0,
  //     taskTypeID: "experience_task",
  //   },
  //   {
  //     taskType: "Find Salary level",
  //     percentageCompleted: 0,
  //     taskTypeID: "salary_task",
  //   },
  //   {
  //     taskType: "Find Availability",
  //     percentageCompleted: 0,
  //     taskTypeID: "availability_task",
  //   },
  // ]);

  // const [setUnansweredQuestions] = useState<String[]>([
  //   "What's your previous experience in this field?",
  //   "What are your strengths and weaknesses?",
  //   "Can you give an example of handling a difficult situation at work?",
  //   "How do you stay updated with industry trends and developments?",
  //   "What are your salary expectations for this role?",
  //   "Can you tell us about a project or achievement you're proud of?",
  //   "Can you describe your ideal work environment?",
  // ]);

  // const [setQuestionAskingNow] = useState<string>("");

  const [timesAsked, setTimesAsked] = useState<number>(0);

  // ---------- AI GPT REPLY MESSAGE ----------
  const { data: dataInterviewEdenAI } = useQuery(INTERVIEW_EDEN_AI, {
    variables: {
      fields: {
        conversation: chatN.map((obj) => {
          if (obj.user === "01") {
            return { role: "assistant", content: obj.message };
          } else {
            return { role: "user", content: obj.message };
          }
          // }),
        }),
        // }).slice(-(timesAsked + 1)*2),
        // questionAskingNow: questionAskingNow,
        // unansweredQuestions: unansweredQuestions,
        timesAsked: timesAsked,
        userID: userID,
        unansweredQuestionsArr: questions?.map((question) => {
          return {
            questionID: question._id,
            questionContent: question.content,
          };
        }),
      },
    },
    skip:
      chatN.length == 0 ||
      aiReplyService != AI_INTERVIEW_SERVICES.INTERVIEW_EDEN_AI ||
      chatN[chatN.length - 1]?.user == "01" ||
      userID == "" ||
      questions?.length == 0 ||
      questions == undefined,
  });

  console.log("questions 2 = ", questions);

  // ---------- When GPT Reply, Store all convo messages and GPT friendly formated messages ------------
  useEffect(() => {
    if (dataInterviewEdenAI && edenAIsentMessage == true) {
      const chatT: ChatMessage = [...chatN];

      // let newMessage = "";

      // if (aiReplyService === AI_INTERVIEW_SERVICES.EDEN_GPT_REPLY_CHAT_API_V2) {
      //   newMessage = dataEdenGPTReplyChatAPI.edenGPTreplyChatAPI_V2.reply;
      // } else if (aiReplyService === AI_INTERVIEW_SERVICES.EDEN_GPT_REPLY_MEMORY) {
      //   newMessage = dataEdenGPTReplyMemory.edenGPTreplyMemory.reply;
      // } else if (aiReplyService === AI_INTERVIEW_SERVICES.EDEN_GPT_REPLY) {
      //   newMessage = dataInterviewEdenAI.interviewEdenAI.reply;
      // }
      const reply = dataInterviewEdenAI?.interviewEdenAI?.reply;
      // const unansweredQuestions =
      //   dataInterviewEdenAI?.interviewEdenAI?.unansweredQuestions;
      // const questionAskingNow =
      //   dataInterviewEdenAI?.interviewEdenAI?.questionAskingNow;
      const timesAsked = dataInterviewEdenAI?.interviewEdenAI?.timesAsked;

      let questionsT: Question[] = [];

      questionsT =
        dataInterviewEdenAI?.interviewEdenAI?.unansweredQuestionsArr.map(
          (question: any) => {
            return {
              _id: question.questionID,
              content: question.questionContent,
            };
          }
        );

      // setQuestionAskingNow(questionAskingNow);

      // setUnansweredQuestions(unansweredQuestions);

      console.log("questionsT = ", questionsT);

      if (setQuestions != undefined && questionsT != undefined) {
        setQuestions(questionsT);
      }

      setTimesAsked(timesAsked);

      chatT.push({
        user: "01",
        message: reply,
      });

      setChatN(chatT);

      // from chatT that is an array of objects, translate it to a string
      let chatNprepareGPTP = "";

      for (let i = 0; i < chatT.length; i++) {
        if (chatT[i].user == "01")
          chatNprepareGPTP += "Eden AI: " + chatT[i].message + "\n";
        else chatNprepareGPTP += "User: " + chatT[i].message + "\n";
      }

      console.log("chatNprepareGPTP = ", chatNprepareGPTP);

      // setChatNprepareGPT(chatNprepareGPTP);
      setEdenAIsentMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInterviewEdenAI]);
  // -----------------------------------------

  // ---------- When sent message, Store all convo messages and long term memory ------------
  const handleSentMessage = (messageN: any, userN: any) => {
    const chatT = [...chatN];

    chatT.push({
      user: userN,
      message: messageN,
    });
    setChatN(chatT as [{ user: string; message: string }]);

    setNumMessageLongTermMem(numMessageLongTermMem + 1);

    if (numMessageLongTermMem > 3) {
      setNumMessageLongTermMem(0);
    }

    // setMessageUser(messageN);

    setEdenAIsentMessage(true);
  };

  // --------- sent Message to Eden AI ---------------
  useEffect(() => {
    if (
      setSentMessageToEdenAIobj &&
      sentMessageToEdenAIobj?.sentMessage == true
    ) {
      if (sentMessageToEdenAIobj?.user != "") {
        setTimeout(() => {
          handleSentMessage(
            sentMessageToEdenAIobj?.message,
            sentMessageToEdenAIobj?.user
          );
        }, 700);
      } else {
        handleSentMessage(sentMessageToEdenAIobj?.message, "02");
      }
      setSentMessageToEdenAIobj("", false);
    }
  }, [sentMessageToEdenAIobj]);
  // --------- sent Message to Eden AI ---------------

  // --------- sent Message to Eden AI ---------------
  useEffect(() => {
    if (setChangeChatN && changeChatN && changeChatN.length > 0) {
      setChatN(changeChatN);
      setChangeChatN([]);
    }
  }, [changeChatN]);
  // --------- sent Message to Eden AI ---------------

  // ------------ Change on chat event --------------

  useEffect(() => {
    if (handleChangeChat) handleChangeChat!(chatN);
  }, [chatN]);
  // ------------ Change on nodes event --------------
  useEffect(() => {
    if (handleChangeNodes) handleChangeNodes(nodeObj);
  }, [nodeObj]);

  return (
    <ChatSimple
      chatN={chatN}
      handleSentMessage={handleSentMessage}
      placeholder={placeholder}
    />
  );
};
