import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { ChatSimple } from "@eden/package-ui";
// import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";

import {
  EDEN_GPT_REPLY,
  // EDEN_GPT_REPLY_CHAT_API,
  EDEN_GPT_REPLY_CHAT_API_V2,
  EDEN_GPT_REPLY_CHAT_API_V3,
  EDEN_GPT_REPLY_MEMORY,
  // MESSAGE_MAP_KG_V2,
  // MESSAGE_MAP_KG_V3,
  MESSAGE_MAP_KG_V4,
  STORE_LONG_TERM_MEMORY,
} from "./gqlFunctions";

interface NodeObj {
  [key: string]: {
    active: boolean;
    confidence: number;
    isNew: boolean;
  };
}

interface Task {
  taskType: string;
  percentageCompleted: number;
  taskTypeID: string;
}

interface MessageObject {
  message: string;
  sentMessage: boolean;
}

export enum AI_REPLY_SERVICES {
  // eslint-disable-next-line no-unused-vars
  EDEN_GPT_REPLY = "EDEN_GPT_REPLY",
  // eslint-disable-next-line no-unused-vars
  EDEN_GPT_REPLY_MEMORY = "EDEN_GPT_REPLY_MEMORY",
  // eslint-disable-next-line no-unused-vars
  EDEN_GPT_REPLY_CHAT_API_V2 = "EDEN_GPT_REPLY_CHAT_API_V2",
  // eslint-disable-next-line no-unused-vars
  EDEN_GPT_REPLY_CHAT_API_V3 = "EDEN_GPT_REPLY_CHAT_API_V3",
}
export type ChatMessage = Array<{ user: string; message: string }>;

export interface IEdenAiChatProps {
  aiReplyService: AI_REPLY_SERVICES;
  extraNodes?: Array<any>;
  sentMessageToEdenAIobj?: MessageObject;
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
  // setSentMessageToEdenAIobj?: (val: MessageObject) => void;
}

export const EdenAiChat = ({
  aiReplyService,
  extraNodes, // extra nodes to add to the query
  sentMessageToEdenAIobj,
  handleChangeNodes,
  handleChangeChat,
  setShowPopupSalary,
  setMode,
  setSentMessageToEdenAIobj,
}: IEdenAiChatProps) => {
  const { currentUser } = useContext(UserContext);

  const [chatN, setChatN] = useState<ChatMessage>([] as ChatMessage); // all chat messages
  const [chatNprepareGPT, setChatNprepareGPT] = useState<string>(""); // formated chat messages for chatGPT
  const [messageUser, setMessageUser] = useState<string>(""); // last message sent from user

  const [nodeObj, setNodeObj] = useState<NodeObj>({}); // list of nodes
  const [edenAIsentMessage, setEdenAIsentMessage] = useState<boolean>(false); // sets if response is pending (TODO => change logic to query based)
  const [numMessageLongTermMem, setNumMessageLongTermMem] = useState<any>(0);

  const [previusTaskDoneID, setPreviusTaskDoneID] = useState<String>("");

  const [executedTasks, setExecutedTasks] = useState<Task[]>([
    {
      taskType: "Find Skill",
      percentageCompleted: 0,
      taskTypeID: "skill_task",
    },
    {
      taskType: "Find Industry",
      percentageCompleted: 0,
      taskTypeID: "insudtry_task",
    },
    {
      taskType: "Find Experience level",
      percentageCompleted: 0,
      taskTypeID: "experience_task",
    },
    {
      taskType: "Find Salary level",
      percentageCompleted: 0,
      taskTypeID: "salary_task",
    },
    {
      taskType: "Find Availability",
      percentageCompleted: 0,
      taskTypeID: "availability_task",
    },
  ]);

  // ---------- AI GPT REPLY MESSAGE ----------
  const { data: dataEdenGPTReply } = useQuery(EDEN_GPT_REPLY, {
    variables: {
      fields: {
        message: messageUser,
      },
    },
    skip:
      messageUser == "" || aiReplyService != AI_REPLY_SERVICES.EDEN_GPT_REPLY,
  });

  const { data: dataEdenGPTReplyMemory } = useQuery(EDEN_GPT_REPLY_MEMORY, {
    variables: {
      fields: {
        message: messageUser,
        memorySort: chatNprepareGPT,
        userID: currentUser?._id,
      },
    },
    skip:
      messageUser == "" ||
      aiReplyService != AI_REPLY_SERVICES.EDEN_GPT_REPLY_MEMORY,
  });

  const { data: dataEdenGPTReplyChatAPI } = useQuery(
    EDEN_GPT_REPLY_CHAT_API_V2,
    {
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
      skip:
        messageUser == "" ||
        aiReplyService != AI_REPLY_SERVICES.EDEN_GPT_REPLY_CHAT_API_V2,
    }
  );

  const { data: dataEdenGPTReplyChatAPIV3 } = useQuery(
    EDEN_GPT_REPLY_CHAT_API_V3,
    {
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
            .slice(0, chatN.length - 1)
            .slice(-6),
          userID: currentUser?._id,
          executedTasks: executedTasks,
          previusTaskDoneID: previusTaskDoneID,
        },
      },
      skip:
        messageUser == "" ||
        aiReplyService != AI_REPLY_SERVICES.EDEN_GPT_REPLY_CHAT_API_V3 ||
        chatN[chatN.length - 1]?.user == "01" ||
        executedTasks == undefined,
      // || executedTasks?.length > 0,
    }
  );
  // ------------------------------------------

  console.log("chatN = ", messageUser, " --- ", chatN);

  console.log("executedTasks = ", executedTasks);

  // -------------- AI GPT NODES --------------
  const { data: dataMessageMapKGV4 } = useQuery(MESSAGE_MAP_KG_V4, {
    variables: {
      fields: {
        message: messageUser,
        assistantMessage:
          chatN.length > 3 ? chatN[chatN.length - 3]?.message : "",
        // assistantMessage: chatN[chatN.length - 2]?.message,
      },
    },
    skip:
      messageUser == "" ||
      chatN.length < 2 ||
      chatN[chatN.length - 2]?.user == "01",
  });

  // update nodes ---- TODO => refactor this to query onCompleted
  useEffect(() => {
    if (dataMessageMapKGV4) {
      const newNodeObj: any = [];

      dataMessageMapKGV4?.messageMapKG_V4?.keywords?.forEach((keyword: any) => {
        if (keyword.nodeID) {
          newNodeObj.push({
            nodeID: keyword.nodeID,
            active: true,
            confidence: keyword.confidence,
            isNew: true,
          });
        }
      });

      const newNodesObjK: any = {};

      //  --------- only take the ones that are true or have high confidence ------------

      for (const [key, value] of Object.entries(nodeObj)) {
        const nodeActive = value.active;
        const nodeConfidence = value.confidence;

        if (nodeActive) {
          newNodesObjK[key] = {
            active: nodeActive,
            confidence: nodeConfidence,
          };
        } else {
          if (Object.keys(nodeObj).length > 7) {
            if (nodeConfidence > 5) {
              newNodesObjK[key] = {
                active: nodeActive,
                confidence: nodeConfidence,
              };
            }
          } else {
            newNodesObjK[key] = {
              active: nodeActive,
              confidence: nodeConfidence,
            };
          }
        }
      }
      //  --------- only take the ones that are true or have high confidence ------------
      for (let i = 0; i < newNodeObj.length; i++) {
        if (!Object.keys(newNodesObjK).includes(newNodeObj[i].nodeID)) {
          let newActive = false;

          if (newNodeObj[i].confidence > 6) {
            newActive = true;
          }
          newNodesObjK[newNodeObj[i].nodeID] = {
            active: newActive,
            confidence: newNodeObj[i].confidence,
            isNew: true,
          };
        }
      }

      setNodeObj(newNodesObjK);
      // ------- Array of objects to disctionary ------------
    }
  }, [dataMessageMapKGV4]);
  // -----------------------------------------

  // --------- Handles when an extra node is added ---------------
  useEffect(() => {
    const nodeObjNew = { ...nodeObj };

    extraNodes?.forEach((node) => {
      nodeObjNew[node.value] = {
        confidence: 10,
        active: true,
        isNew: true,
      };
    });

    setNodeObj(nodeObjNew);
  }, [extraNodes]);
  // -----------------------------------------

  // ---------- When GPT Reply, Store all convo messages and GPT friendly formated messages ------------
  useEffect(() => {
    if (
      (dataEdenGPTReply ||
        dataEdenGPTReplyMemory ||
        dataEdenGPTReplyChatAPI ||
        dataEdenGPTReplyChatAPIV3) &&
      edenAIsentMessage == true
    ) {
      const chatT: ChatMessage = [...chatN];

      // let newMessage = "";

      // if (aiReplyService === AI_REPLY_SERVICES.EDEN_GPT_REPLY_CHAT_API_V2) {
      //   newMessage = dataEdenGPTReplyChatAPI.edenGPTreplyChatAPI_V2.reply;
      // } else if (aiReplyService === AI_REPLY_SERVICES.EDEN_GPT_REPLY_MEMORY) {
      //   newMessage = dataEdenGPTReplyMemory.edenGPTreplyMemory.reply;
      // } else if (aiReplyService === AI_REPLY_SERVICES.EDEN_GPT_REPLY) {
      //   newMessage = dataEdenGPTReply.edenGPTreply.reply;
      // }
      const reply =
        dataEdenGPTReplyChatAPI?.edenGPTreplyChatAPI_V2.reply ||
        dataEdenGPTReplyMemory?.edenGPTreplyMemory.reply ||
        dataEdenGPTReply?.edenGPTreply.reply ||
        dataEdenGPTReplyChatAPIV3?.edenGPTreplyChatAPI_V3.reply;

      if (
        dataEdenGPTReplyChatAPIV3 &&
        dataEdenGPTReplyChatAPIV3?.edenGPTreplyChatAPI_V3?.executedTasks !=
          undefined
      ) {
        const resChatAPIV3 = dataEdenGPTReplyChatAPIV3?.edenGPTreplyChatAPI_V3;

        const executedTasksN = resChatAPIV3?.executedTasks?.map((task: any) => {
          return {
            taskType: task.taskType,
            percentageCompleted: task.percentageCompleted,
            taskTypeID: task.taskTypeID,
          };
        });

        if (setShowPopupSalary && setMode) {
          if (resChatAPIV3?.executeTaskType == "salary_task") {
            setShowPopupSalary(true);
            setMode("salary");
          } else if (resChatAPIV3?.executeTaskType == "availability_task") {
            setShowPopupSalary(true);
            setMode("availability");
          } else if (resChatAPIV3?.executeTaskType == "experience_task") {
            setShowPopupSalary(true);
            setMode("level");
          }
        }

        setExecutedTasks(executedTasksN);
        setPreviusTaskDoneID(resChatAPIV3?.executeTaskType);
      }

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

      setChatNprepareGPT(chatNprepareGPTP);
      setEdenAIsentMessage(false);
    }
  }, [
    dataEdenGPTReply,
    dataEdenGPTReplyMemory,
    dataEdenGPTReplyChatAPI,
    dataEdenGPTReplyChatAPIV3,
  ]);
  // -----------------------------------------

  console.log("previusTaskDoneID = ", previusTaskDoneID);

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
      handleStoreLongTermMemory();
      setNumMessageLongTermMem(0);
    }

    setMessageUser(messageN);

    setEdenAIsentMessage(true);
  };

  // ------- Store long term memory ------------
  const [storeLongTermMemory, {}] = useMutation(STORE_LONG_TERM_MEMORY, {
    // onCompleted({ storeLongTermMemory }) {
    //   // // if (!storeLongTermMemory) console.log("deleteError is null");
    //   // // //   console.log("deleteError", deleteError);
    //   // refetchErrors();
    //   // console.log("you just saved memory with sumary = ", storeLongTermMemory);
    // },
  });

  const handleStoreLongTermMemory = () => {
    storeLongTermMemory({
      variables: {
        fields: {
          messages: chatN
            .map((obj) => {
              if (obj.user === "01") {
                return { ...obj, name: "Eden: ", user: undefined };
              } else {
                return { ...obj, name: "User: ", user: undefined };
              }
            })
            .slice(-6),
          userID: currentUser?._id,
        },
      },
    });
  };
  // ----------------------------------------

  // --------- sent Message to Eden AI ---------------
  useEffect(() => {
    if (
      setSentMessageToEdenAIobj &&
      sentMessageToEdenAIobj?.sentMessage == true
    ) {
      handleSentMessage(sentMessageToEdenAIobj?.message, "02");
      setSentMessageToEdenAIobj("", false);
    }
  }, [sentMessageToEdenAIobj]);
  // --------- sent Message to Eden AI ---------------

  // ------------ Change on chat event --------------

  useEffect(() => {
    if (handleChangeChat) handleChangeChat!(chatN);
  }, [chatN]);
  // ------------ Change on nodes event --------------
  useEffect(() => {
    if (handleChangeNodes) handleChangeNodes(nodeObj);
  }, [nodeObj]);

  return <ChatSimple chatN={chatN} handleSentMessage={handleSentMessage} />;
};
