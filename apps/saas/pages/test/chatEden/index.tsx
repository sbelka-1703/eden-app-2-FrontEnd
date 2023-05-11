/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@apollo/client";
// import {
//   // FIND_MEMBER_INFO,
//   MATCH_NODES_MEMBERS_AI4,
// } from "@eden/package-graphql";
import {
  MatchMembersToSkillOutput,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  AI_REPLY_SERVICES,
  Card,
  // CardGrid,
  // CommonServerAvatarList,
  DynamicSearchGraph,
  EdenAiChat,
} from "@eden/package-ui";
// import dynamic from "next/dynamic";
import React, { Fragment, useEffect, useState } from "react";

import { FIND_RELATED_NODE } from "../../../utils/data/GQLfuncitons";
import type { NextPageWithLayout } from "../../_app";
import MultiSelectPopup from "./components/MultiSelectPopup";
// import SalaryPopup from "./components/SalaryPopup";

interface NodeObj {
  [key: string]: {
    active: boolean;
    confidence: number;
    isNew: boolean;
  };
}

const chatEden: NextPageWithLayout = () => {
  const [nodeObj, setNodeObj] = useState<NodeObj>({
    // "640a739dc5d61b4bae0ee091": {
    //   // SOS 🆘 -> problem with this node combination
    //   confidence: 9,
    //   active: false,
    //   isNew: true,
    // },
    // "6416b6e1a57032640bd813aa": {
    //   confidence: 9,
    //   active: true,
    //   isNew: true,
    // },
    // "6416adcc48d9ba5ceefb67cc": {
    //   confidence: 9,
    //   active: true,
    //   isNew: true,
    // },
    // "6425213bfd005e8c789ceaca": {
    //   confidence: 10,
    //   active: true,
    //   isNew: true,
    // },
    // "6425213cfd005e8c789ceacd": {
    //   confidence: 10,
    //   active: true,
    //   isNew: true,
    // },
    // "6425213dfd005e8c789cead0": {
    //   confidence: 10,
    //   active: true,
    //   isNew: false,
    // },
  });

  //  ------------- Popup Preparation ----------
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [nodeSearchRelated, setnodeSearchRelated] = useState("");

  const [optionsPopup, setOptionsPopup] = useState<any>([]);
  const [extraNodes, setExtraNodes] = useState<any>([]);

  // const optionsPopup = [
  //   { value: "ID1", label: "React" },
  //   { value: "ID2", label: "Javascript" },
  //   { value: "ID3", label: "UX" },
  //   { value: "ID4", label: "UI" },
  // ];

  const handleOpenPopup = (nodeID: any) => {
    setIsOpenPopup(true);
    setnodeSearchRelated(nodeID);
  };

  console.log("nodeSearchRelated = ", nodeSearchRelated);

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  };

  const handleSelectPopup = (selectedOptionsPopup: Array<any>) => {
    setExtraNodes(selectedOptionsPopup);
  };
  //  ------------- Popup Preparation ----------

  // const [setChatN] = useState<ChatMessage>([]);

  const {} = useQuery(FIND_RELATED_NODE, {
    variables: {
      fields: {
        _id: nodeSearchRelated,
      },
    },
    skip: nodeSearchRelated == "",
    onCompleted: (data) => {
      // setDataMembersA(data.findNodes);
      const optionPopup: any[] = [];

      data.findNode?.relatedNodes?.forEach((node: any) => {
        optionPopup.push({
          value: node._id,
          label: node.name,
        });
      });

      setOptionsPopup(optionPopup);
    },
  });

  // const [setFilterState] = useState<FilterStateType>({
  //   budget: {
  //     minPerHour: -1,
  //     maxPerHour: -1,
  //   },
  //   availability: {
  //     minHourPerWeek: -1,
  //     maxHourPerWeek: -1,
  //   },
  //   experienceLevel: -1,
  // });

  //  ------------- change activation nodes when click ----
  const [activateNodeEvent, setActivateNodeEvent] = useState<any>(null);

  useEffect(() => {
    // what node where clicked
    if (activateNodeEvent != null) {
      activateNode(activateNodeEvent);
      setActivateNodeEvent(null);
    }
  }, [activateNodeEvent]);

  const activateNode = (nodeID: string) => {
    // activate the node that was clicked
    // const matchingIndex = nodesID?.indexOf(nodeID);

    // console.log("fuckOF = ");

    if (nodeObj[nodeID]) {
      nodeObj[nodeID].active = !nodeObj[nodeID].active;
      setNodeObj(nodeObj);
    }

    // if (matchingIndex != -1 && matchingIndex != undefined) {
    //   const newActiveNodes = [...activeNodes];

    //   newActiveNodes[matchingIndex] = !newActiveNodes[matchingIndex];
    //   setActiveNodes(newActiveNodes);
    // }
  };
  //  ------------- change activation nodes when click ----

  // ------------ Salary Popup ------------
  // const [setShowPopup] = useState<boolean>(false);
  // const [setPopupData] = useState<{
  //   minSalary?: number;
  //   maxSalary?: number;
  //   level?: string;
  //   minHours?: number;
  //   maxHours?: number;
  // }>({ minSalary: 0, maxSalary: 0, level: "", minHours: 0, maxHours: 0 });

  interface MessageObject {
    message: string;
    sentMessage: boolean;
  }
  const [sentMessageToEdenAIobj, setSentMessageToEdenAIobj] =
    useState<MessageObject>({ message: "", sentMessage: false });

  // const experienceToNumberMap: Record<string, number> = {
  //   Junior: 3,
  //   Mid: 6,
  //   Senior: 9,
  // };

  // const handleDone = (data: {
  //   minSalary?: number;
  //   maxSalary?: number;
  //   level?: string;
  //   minHours?: number;
  //   maxHours?: number;
  //   sentMessageToEdenAI?: string;
  // }) => {
  //   setPopupData(data);
  //   setShowPopup(false);

  //   const filterState = {
  //     budget: {
  //       minPerHour: data?.minSalary ? data.minSalary : -1,
  //       maxPerHour: data?.maxSalary ? data.maxSalary : -1,
  //     },
  //     availability: {
  //       minHourPerWeek: data?.minHours ? data.minHours : -1,
  //       maxHourPerWeek: data?.maxHours ? data.maxHours : -1,
  //     },
  //     experienceLevel: -1,
  //   };

  //   if (data?.level) {
  //     filterState["experienceLevel"] = experienceToNumberMap[data.level];
  //   }
  //   setFilterState(filterState);

  //   console.log("sentMessageToEdenAI = ", data.sentMessageToEdenAI);

  //   if (data.sentMessageToEdenAI) {
  //     setSentMessageToEdenAIobj({
  //       message: data.sentMessageToEdenAI,
  //       sentMessage: true,
  //     });
  //   }
  // };

  // const mode: 'salary' | 'level' = 'level';
  // ------------ Salary Popup ------------

  return (
    <>
      <div className="mx-auto grid h-screen grid-cols-12 overflow-hidden bg-[#f3f3f3] ">
        <div className="col-span-5 flex flex-1 flex-col pl-8 pr-4">
          <div className="h-[60vh]">
            <EdenAiChat
              aiReplyService={AI_REPLY_SERVICES.EDEN_GPT_REPLY_CHAT_API_V3}
              // aiReplyService={AI_REPLY_SERVICES.EDEN_GPT_REPLY}
              extraNodes={extraNodes}
              handleChangeNodes={(_nodeObj: any) => {
                // console.log("handleChangeNodes:", nodeObj);
                setNodeObj(_nodeObj);
              }}
              // handleChangeChat={(_chat: any) => {
              //   // console.log("handleChangeChat:", _chat);
              //   // setChatN(_chat);
              // }}
              // setShowPopupSalary={setShowPopup}
              sentMessageToEdenAIobj={sentMessageToEdenAIobj}
              setSentMessageToEdenAIobj={setSentMessageToEdenAIobj}
            />
          </div>
          <div className="h-[40vh] py-4">
            <Card border shadow className="h-full overflow-hidden bg-white">
              {/* <p className="pointer-events-none absolute left-0 top-2 w-full text-center leading-tight text-slate-600">
                Click suggested bubbles
                <br /> to connect them to your
                <br /> search
              </p> */}
              <DynamicSearchGraph
                nodesID={Object.keys(nodeObj)}
                activeNodes={Object.values(nodeObj).map(
                  (node: any) => node.active
                )}
                isNewNodes={Object.values(nodeObj).map(
                  (node: any) => node.isNew
                )}
                setActivateNodeEvent={setActivateNodeEvent}
                height={"380"}
                // graphType={"simple"}
                // graphType={"KG_AI_2"}
                graphType={"KG_AI_2_plusIndustry"}
                // zoomGraph={1.1}
                setRelatedNodePopup={handleOpenPopup}
                disableZoom={true}
              />
            </Card>
          </div>
        </div>
      </div>
      {/* </div> */}
      <MultiSelectPopup
        options={optionsPopup}
        isOpen={isOpenPopup}
        onClose={handleClosePopup}
        onSelect={handleSelectPopup}
      />
    </>
  );
};

export default chatEden;

// ---------------- FROM HERE, ELOI'S MESS UwU ------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

import { Maybe } from "graphql/jsutils/Maybe";
import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session || session.error === "RefreshAccessTokenError") {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export interface IUserDiscoverCardProps {
  matchMember?: Maybe<MatchMembersToSkillOutput>;
  project?: Maybe<Project>;
  role?: Maybe<RoleType>;
  invite?: boolean;
  messageUser?: boolean;
  phase?: string;
  nodesID?: string[];
  conversation?: any;
}
