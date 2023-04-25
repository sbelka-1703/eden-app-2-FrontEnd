/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@apollo/client";
import {
  // FIND_MEMBER_INFO,
  MATCH_NODES_MEMBERS_AI4,
} from "@eden/package-graphql";
import {
  MatchMembersToSkillOutput,
  MatchPercentage,
  Members,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  AI_REPLY_SERVICES,
  AppUserSubmenuLayout,
  // AvatarList,
  Badge,
  Button,
  Card,
  CardGrid,
  ChatMessage,
  // CommonServerAvatarList,
  DynamicSearchGraph,
  EdenAiChat,
  GridItemSix,
  GridLayout,
  LongText,
  // MemberInfoWithDynamicGraph,
  MemberInfoWithDynamicGraph2,
  SendMessageUserToUser,
  SocialMediaComp,
  TextHeading3,
  // TextLabel1,
  UserInviteModal,
  UserWithDescription,
} from "@eden/package-ui";
// import dynamic from "next/dynamic";
import React, { Fragment, useEffect, useState } from "react";

import { FIND_RELATED_NODE } from "../../../utils/data/GQLfuncitons";
import type { NextPageWithLayout } from "../../_app";
import ExperienceCreateProfileChatTalentSearch from "./components/ExperienceCreateProfileChatTalentSearch";
import MultiSelectPopup from "./components/MultiSelectPopup";
import SalaryPopup from "./components/SalaryPopup";

interface NodeObj {
  [key: string]: {
    active: boolean;
    confidence: number;
    isNew: boolean;
  };
}

type Budget = {
  minPerHour: number;
  maxPerHour: number;
};

type Availability = {
  minHourPerWeek: number;
  maxHourPerWeek: number;
};

type FilterStateType = {
  budget: Budget;
  availability: Availability;
  experienceLevel: number;
};

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

  const [setExtraNodes] = useState<any>([]);
  // const [extraNodes, setExtraNodes] = useState<any>([]);

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

  const [chatN] = useState<ChatMessage>([]);
  // const [chatN, setChatN] = useState<ChatMessage>([]);

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

  const [filterState, setFilterState] = useState<FilterStateType>({
    budget: {
      minPerHour: -1,
      maxPerHour: -1,
    },
    availability: {
      minHourPerWeek: -1,
      maxHourPerWeek: -1,
    },
    experienceLevel: -1,
  });

  const [dataMembersA, setDataMembersA] = useState<any>(null);

  const {} = useQuery(MATCH_NODES_MEMBERS_AI4, {
    variables: {
      fields: {
        nodesID: Object.keys(nodeObj).filter((key) => nodeObj[key].active),
        // nodesID: nodesID.filter((node, index) => activeNodes[index]),
        ...filterState,
        weightModules: [
          {
            type: "node_Skill",
            weight: 70,
          },
          {
            type: "node_Category",
            weight: 20,
          },
          {
            type: "node_Group",
            weight: 5,
          },
          {
            type: "node_total",
            weight: 50,
          },
          {
            type: "budget_total",
            weight: 80,
          },
          {
            type: "availability_total",
            weight: 85,
          },
          {
            type: "experience_total",
            weight: 85,
          },
          {
            type: "everythingElse_total",
            weight: 50,
          },
          // {
          //   type: "node_Skill",
          //   weight: 70,
          // },
          // {
          //   type: "node_Category",
          //   weight: 20,
          // },
          // {
          //   type: "node_Group",
          //   weight: 5,
          // },
          // {
          //   type: "node_total",
          //   weight: 5,
          // },
          // {
          //   type: "everything_else",
          //   weight: 50,
          // },
        ],
      },
    },
    // skip: !nodesID
    skip: Object.keys(nodeObj).length == 0,

    onCompleted: (data) => {
      setDataMembersA(data.matchNodesToMembers_AI4);
    },
  });

  console.log("dataMembersA = ", dataMembersA);
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
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<{
    minSalary?: number;
    maxSalary?: number;
    level?: string;
    minHours?: number;
    maxHours?: number;
  }>({ minSalary: 0, maxSalary: 0, level: "", minHours: 0, maxHours: 0 });

  // interface MessageObject {
  //   message: string;
  //   sentMessage: boolean;
  // }
  // const [sentMessageToEdenAIobj, setSentMessageToEdenAIobj] =
  //   useState<MessageObject>({ message: "", sentMessage: false });

  const experienceToNumberMap: Record<string, number> = {
    Junior: 3,
    Mid: 6,
    Senior: 9,
  };

  const handleDone = (data: {
    minSalary?: number;
    maxSalary?: number;
    level?: string;
    minHours?: number;
    maxHours?: number;
    sentMessageToEdenAI?: string;
  }) => {
    setPopupData(data);
    setShowPopup(false);

    const filterState = {
      budget: {
        minPerHour: data?.minSalary ? data.minSalary : -1,
        maxPerHour: data?.maxSalary ? data.maxSalary : -1,
      },
      availability: {
        minHourPerWeek: data?.minHours ? data.minHours : -1,
        maxHourPerWeek: data?.maxHours ? data.maxHours : -1,
      },
      experienceLevel: -1,
    };

    if (data?.level) {
      filterState["experienceLevel"] = experienceToNumberMap[data.level];
    }
    setFilterState(filterState);

    console.log("sentMessageToEdenAI = ", data.sentMessageToEdenAI);

    // if (data.sentMessageToEdenAI) {
    //   setSentMessageToEdenAIobj({
    //     message: data.sentMessageToEdenAI,
    //     sentMessage: true,
    //   });
    // }
  };

  const [mode, setMode] = useState<"salary" | "level" | "availability">(
    "salary"
  );

  // const mode: 'salary' | 'level' = 'level';
  // ------------ Salary Popup ------------

  return (
    <AppUserSubmenuLayout showSubmenu={false}>
      <GridLayout>
        <GridItemSix>
          <div className="h-[88vh] w-full">
            <div className="relative h-[60%]">
              {/* <EdenAiChat
              aiReplyService={AI_REPLY_SERVICES.EDEN_GPT_REPLY_CHAT_API_V3}
              // aiReplyService={AI_REPLY_SERVICES.EDEN_GPT_REPLY}
              extraNodes={extraNodes}
              handleChangeNodes={(_nodeObj: any) => {
                // console.log("handleChangeNodes:", nodeObj);
                setNodeObj(_nodeObj);
              }}
              handleChangeChat={(_chat: any) => {
                // console.log("handleChangeChat:", _chat);
                setChatN(_chat);
              }}
              setShowPopupSalary={setShowPopup}
              setMode={setMode}
              sentMessageToEdenAIobj={sentMessageToEdenAIobj}
              setSentMessageToEdenAIobj={setSentMessageToEdenAIobj}
            /> */}
              <ExperienceCreateProfileChatTalentSearch
                handleChangeNodes={(val) => {
                  console.log("val = ", val);
                  setNodeObj({ ...val });
                  // setNodesIDs(Object.keys(val));
                }}
              />
              <div className="absolute left-0 bottom-5 flex justify-center">
                <button
                  type="button"
                  className={
                    "hover:border-accentColor mr-2 h-8 w-8 rounded-full border bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  }
                  onClick={() => {
                    setShowPopup(true);
                    setMode("salary");
                  }}
                >
                  💰
                </button>
                <button
                  type="button"
                  className={
                    "hover:border-accentColor mr-2 h-8 w-8 rounded-full border bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  }
                  onClick={() => {
                    setShowPopup(true);
                    setMode("level");
                  }}
                >
                  🧑‍🚀
                </button>
                <button
                  type="button"
                  className={
                    "hover:border-accentColor mr-2 h-8 w-8 rounded-full border bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  }
                  onClick={() => {
                    setShowPopup(true);
                    setMode("availability");
                  }}
                >
                  ⏳
                </button>
              </div>
            </div>
            {
              <div className="absolute bottom-8 left-8 z-10 flex justify-center">
                <ul className="text-xs text-gray-400">
                  <li>{`Salary min: ${popupData.minSalary} `}</li>
                  <li>{`Salary max: ${popupData.maxSalary}`}</li>
                  <li>{`level: ${popupData.level}`}</li>
                  <li>{`Availability min: ${popupData.minHours} `}</li>
                  <li>{`Availability min: ${popupData.maxHours} `}</li>
                </ul>
              </div>
            }

            {showPopup && (
              <SalaryPopup
                mode={mode}
                minSalary={popupData.minSalary}
                maxSalary={popupData.maxSalary}
                level={popupData.level}
                minHours={popupData.minHours}
                maxHours={popupData.maxHours}
                onDone={handleDone}
              />
            )}
            <div className="h-[40%] py-4">
              {/* {nodesID?.length > 0 && dataMembersA?.length == 0 && (
              <div className="flex justify-center py-4">
                <h1 className="h-16 rounded-lg bg-gray-200 px-6 py-2 text-center text-sm shadow-md sm:h-16 sm:text-lg">
                  <span className="block leading-tight">
                    Click Grey Bubbles to{" "}
                  </span>
                  <span className="block leading-tight">
                    Connect them to your search
                  </span>
                </h1>
              </div>
            )} */}
              <Card border shadow className="h-full overflow-hidden bg-white">
                <p className="pointer-events-none absolute left-0 top-2 w-full text-center leading-tight text-slate-600">
                  Click suggested bubbles
                  <br /> to connect them to your
                  <br /> search
                </p>
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
        </GridItemSix>
        <GridItemSix>
          {/* <GridLayout> */}
          {/* <GridItemNine> */}
          <Card className="scrollbar-hide -mt-4 h-[calc(100%+2rem)] w-[calc(50vw-0.5rem)] overflow-scroll rounded-none border-l bg-white p-4">
            {dataMembersA && dataMembersA.length > 0 ? (
              <CardGrid>
                {dataMembersA?.map(
                  (member: MatchMembersToSkillOutput, index: number) => (
                    <UserDiscoverCard
                      key={index}
                      matchMember={member}
                      // nodesPercentage={dataMembersA}
                      // role={selectedRole}
                      // project={dataProject?.findProject}
                      invite
                      phase={``}
                      nodesID={Object.keys(nodeObj).filter(
                        (key) => nodeObj[key].active
                      )}
                      conversation={chatN
                        .map((obj: any) => {
                          if (obj.user === "01") {
                            return {
                              role: "assistant",
                              content: obj.message,
                            };
                          } else {
                            return { role: "user", content: obj.message };
                          }
                        })
                        .slice(-6)}
                      // nodesID={Object.keys(nodeObj)}
                    />
                  )
                )}
              </CardGrid>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-center">
                  Your matches will come up here.
                  <br />
                  You can DM, favourite & shortlist them!
                </p>
              </div>
            )}
          </Card>
          {/* </GridItemNine> */}
          {/* </GridLayout> */}
        </GridItemSix>
      </GridLayout>
      {/* <div className="relative mx-auto grid h-screen grid-cols-12 overflow-hidden bg-[#f3f3f3] "> */}
      {/* <div className="col-span-6 flex flex-1 flex-col pl-8 pr-4"> */}

      {/* </div> */}

      {/* </div> */}
      <MultiSelectPopup
        options={optionsPopup}
        isOpen={isOpenPopup}
        onClose={handleClosePopup}
        onSelect={handleSelectPopup}
      />
    </AppUserSubmenuLayout>
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

import { round } from "@eden/package-ui/utils";
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

const UserDiscoverCard = ({
  matchMember,
  project,
  role,
  invite,
  phase,
  nodesID,
  conversation,
}: IUserDiscoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const member = matchMember?.member;
  const matchPercentage = matchMember?.matchPercentage;
  const nodesPercentage = matchMember?.nodesPercentage;

  console.log("nodesPercentage = ", nodesPercentage);

  const [relatedNodesMemberToMatch, setRelatedNodesMemberToMatch] =
    useState<any>([]);

  useEffect(() => {
    if (nodesPercentage?.length == 0 || nodesPercentage == undefined) return;

    interface RelevantMemberObj {
      [key: string]: boolean;
    }
    const mostRelevantMemberObj: RelevantMemberObj = {};

    const mostRelevantMemberNodes = [];

    for (let i = 0; i < nodesPercentage?.length; i++) {
      const node = nodesPercentage[i];

      // Take only the first mostRelevantMemberNodes, which has the heighers probability, later I can be more creative
      let mostRelevantMemberNode = null;

      if (
        node?.mostRelevantMemberNodes != undefined &&
        node?.mostRelevantMemberNodes?.length > 0
      ) {
        let i = 0;
        let relNode;

        while (
          mostRelevantMemberNode == null &&
          i < node?.mostRelevantMemberNodes.length
        ) {
          relNode = node?.mostRelevantMemberNodes[i];

          if (
            relNode?.node?._id != undefined &&
            !mostRelevantMemberObj[relNode?.node?._id]
          ) {
            mostRelevantMemberNode = relNode;
            mostRelevantMemberObj[relNode?.node?._id] = true;
          } else {
            i++;
          }
        }

        if (mostRelevantMemberNode == null) continue;
      }

      let colorT = "bg-purple-100";

      if (
        mostRelevantMemberNode?.score != null &&
        mostRelevantMemberNode?.score != undefined
      ) {
        if (mostRelevantMemberNode?.score > 60) {
          colorT = "bg-purple-500";
        } else if (mostRelevantMemberNode?.score > 30) {
          colorT = "bg-purple-400";
        } else if (mostRelevantMemberNode?.score > 13) {
          colorT = "bg-purple-300";
        } else if (mostRelevantMemberNode?.score > 5) {
          colorT = "bg-purple-200";
        }
      }

      mostRelevantMemberNodes.push({
        searchNode: node?.node,
        MemberRelevantnode: mostRelevantMemberNode?.node,
        score: mostRelevantMemberNode?.score,
        color: colorT,
      });
    }

    setRelatedNodesMemberToMatch(mostRelevantMemberNodes);
  }, [nodesPercentage]);

  console.log("relatedNodesMemberToMatch = ", relatedNodesMemberToMatch);

  if (!member) return null;

  return (
    <Card border>
      <div className={`flex justify-center`}>
        <div>
          <div className={`relative flex flex-col items-center`}>
            <UserWithDescription
              member={member}
              percentage={
                member.bio &&
                member.budget?.perHour !== undefined &&
                member.budget?.perHour !== null
                  ? round(Number(matchPercentage?.totalPercentage), 0)
                  : undefined
              }
            />

            {member?.links && (
              <div className="flex justify-center">
                <SocialMediaComp size="sm" title="" links={member?.links} />
              </div>
            )}
          </div>
        </div>
        <div className="absolute right-2 top-2">
          <Button onClick={() => setIsOpen(!isOpen)}>More</Button>
        </div>
      </div>

      <div className="flex">
        <LongText
          cutText={100}
          text={(member?.bio as string) || ""}
          className={`text-darkGreen font-Inter my-2 text-sm`}
        />
      </div>
      <div className="grid grid-cols-6">
        <div className="col-span-3">
          {/* {member?.serverID && (
            <CommonServerAvatarList
              label={`common servers`}
              size={`xs`}
              serverID={member?.serverID as string[]}
            />
          )} */}

          {nodesPercentage && (
            <div>
              <p className="font-Inter mb-1 text-sm font-bold text-zinc-500">
                🪄 Relevant skills
              </p>
              <div>
                {relatedNodesMemberToMatch
                  .slice(0, 4)
                  .map((info: any, index: number) => (
                    <Badge
                      text={info?.MemberRelevantnode?.name || ""}
                      key={index}
                      // className={`bg-soilPurple/20 py-px text-xs`}
                      // className={`px-2 py-1 text-white rounded ${getBackgroundColorClass(info.score)}`}
                      // className={`px-2 py-1 text-white rounded bg-purple-400`}
                      className={`rounded px-1 py-1 text-xs text-white ${info.color}`}
                      cutText={10}
                    />
                  ))}
                {/* {nodesPercentage.slice(0, 6).map((node, index) => (
              <Badge
                text={node?.node?.name || ""}
                key={index}
                className={`bg-soilPurple/20 py-px text-xs`}
              />
            ))} */}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-3">
          <section className="text-right">
            {member.experienceLevel?.total && (
              <p className="font-bold text-slate-600">
                <span className="text-xl">
                  {member.experienceLevel?.total === 3 && "Junior"}
                  {member.experienceLevel?.total === 6 && "Mid"}
                  {member.experienceLevel?.total === 9 && "Senior"}
                </span>
              </p>
            )}
            {member.budget?.perHour && (
              <p className="">
                <span className="text-2xl font-bold text-[#fcba03]">
                  ${member.budget?.perHour}
                </span>{" "}
                per hour
              </p>
            )}
            {member.hoursPerWeek && (
              <p className="">
                <span className="text-2xl font-bold text-slate-600">
                  {member.hoursPerWeek}
                </span>{" "}
                hours/week
              </p>
            )}
          </section>
        </div>
      </div>

      {/* MEMEBER.ENDORSEMENT NO LONGER EXISTS */}

      {/* {member?.endorsements && member?.endorsements.length > 0 && (
        <div className="mt-4">
          <TextLabel1>🎙 ENDORSEMENTS</TextLabel1>
          <div className={`flex`}>
            <AvatarList
              className="inline-block !w-auto !justify-start"
              avatars={member?.endorsements
                .slice(0, 5)
                .map((endorsement: any) => ({
                  size: "xs",
                  src: endorsement?.endorser?.discordAvatar,
                }))}
            />
            {member?.endorsements.slice(5).length > 0 && (
              <p className="text-soilGray ml-6 mt-1 inline">
                +{member?.endorsements.slice(8).length} more
              </p>
            )}
          </div>
        </div>
      )} */}

      {/* {(item.lifetimeStakeTRST || item.totalTRST) && (
        <div className="-mx-2 mt-3 -mb-3 flex">
          {item.lifetimeStakeTRST && (
            <LifetimeTRST
              member={item}
              lifetimeStakeTRST={item?.lifetimeStakeTRST}
              averageMonthlyReturnTRST={
                Math.round((item?.lifetimeStakeTRST / 100) * 10) / 10
              }
            />
          )}
          {item.totalTRST && (
            <div className="bg-soilPurple ml-auto mr-0 whitespace-nowrap rounded-xl px-2 text-sm text-white">{`${item.totalTRST} $TRST`}</div>
          )}
        </div>
      )} */}

      {invite && project && role ? (
        <UserInviteModal
          open={isOpen}
          member={member}
          project={project}
          role={role}
          phase={phase}
          matchPercentage={matchPercentage}
          onClose={() => setIsOpen(!isOpen)}
        />
      ) : (
        <>
          <UserMessageModal
            open={isOpen}
            member={member}
            matchPercentage={matchPercentage}
            nodesPercentage={nodesPercentage}
            nodesID={nodesID}
            onClose={() => setIsOpen(!isOpen)}
            conversation={conversation}
            relatedNodesMemberToMatch={relatedNodesMemberToMatch}
          />
        </>
      )}
    </Card>
  );
};

// import { toast } from "react-toastify";

// const SET_APPLY_TO_PROJECT = gql`
//   mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
//     changeTeamMember_Phase_Project(fields: $fields) {
//       _id
//     }
//   }
// `;

export interface IUserMessageModalProps {
  member?: Members;
  matchPercentage?: Maybe<MatchPercentage>;
  open?: boolean;
  nodesPercentage?: any;
  conversation?: any;
  relatedNodesMemberToMatch?: any;
  nodesID?: string[];
  onClose?: () => void;
}

const UserMessageModal = ({
  member,
  matchPercentage,
  open,
  // conversation,
  relatedNodesMemberToMatch,
  nodesID,
  onClose,
}: IUserMessageModalProps) => {
  // const { data: dataMemberInfo } = useQuery(FIND_MEMBER_INFO, {
  //   variables: {
  //     fields: {
  //       _id: member?._id,
  //     },
  //   },
  //   skip: !member?._id || !open,
  // });

  // const findMember = dataMemberInfo?.findMember;
  const [showMessage, setShowMessage] = useState(false);

  console.log("member = xixix", member);

  // const [changeTeamMemberPhaseProject, {}] = useMutation(SET_APPLY_TO_PROJECT, {
  //   onCompleted: () => {
  //     // console.log(changeTeamMemberPhaseProject);
  //     toast.success("success");
  //     onClose && onClose();
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });
  const [chatN, setChatN] = useState([
    {
      user: "01",
      message: `Do you have any questions about ${member?.discordName}?`,
    },
    {
      user: "01",
      message: `In the profile I only have only basic info, you can now dig deeper with me ✌️`,
    },
  ]);

  // const mergeUniqueKeywords = (arr1: any, arr2: any) => {
  //   const uniqueKeywords = new Set([...arr1, ...arr2]);

  // const newKeywords = Array.from(arr2.filter(keyword => !uniqueKeywords.has(keyword)));
  // const newKeywords = arr2.filter((keyword: any) => !arr1.includes(keyword));

  // const nodesNew = [...nodesN.nodes];

  // const edgesNew = [...nodesN.edges];

  // newKeywords.forEach((keyword: any) => {
  //   if (keyword != "") {
  //     nodesNew.push({
  //       id: keyword,
  //       label: keyword,
  //       size: 40,
  //     });
  //     edgesNew.push({
  //       source: "node0",
  //       target: keyword,
  //     });
  //   }
  // });

  // setNodesN({
  //   nodes: nodesNew,
  //   edges: edgesNew,
  // });

  // const mergeUniqueK = Array.from(uniqueKeywords);

  // const mergeUniqueKNew = [];

  // for (let i = 0; i < mergeUniqueK.length; i++) {
  //   if (mergeUniqueK[i] !== "") {
  //     mergeUniqueKNew.push(mergeUniqueK[i]);
  //   }
  // }

  // // console.log(mergeUniqueKNew);

  //   return mergeUniqueKNew;
  // };

  if (!member) return null;
  // if (!findMember) return null;

  // console.log("nodesID", nodesID);

  return (
    <ChatModal open={open} onClose={onClose}>
      {open && (
        <div
          className="h-8/10 fixed -right-[340px] bottom-0 z-50 w-[300px] rounded-lg"
          onClick={(e) => {
            // console.log("this event :)");

            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <EdenAiChat
            placeholder={
              <div className="p-4">
                <p>Do you have any questions about {member.discordName}?</p>
              </div>
            }
            aiReplyService={AI_REPLY_SERVICES.EDEN_GPT_REPLY}
            extraNodes={[]}
            // handleChangeNodes={(_nodeObj: any) => {
            //   // console.log("handleChangeNodes:", nodeObj);
            //   setNodeObj(_nodeObj);
            // }}
            handleChangeChat={(_chat: any) => {
              // console.log("handleChangeChat:", _chat);
              setChatN(_chat);
            }}
          />
        </div>
      )}
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <div className={`mt-4 grid grid-cols-5`}>
          <div className={`col-span-2 flex justify-end`}></div>
          <div className={`col-span-1 h-8`}></div>
          <div className={`col-span-2`}>
            {/* {!showMessage && (
              <Button onClick={() => setShowMessage(!showMessage)}>
                Connect with {member?.discordName}
              </Button>
            )} */}
            {showMessage && (
              <Button onClick={() => setShowMessage(!showMessage)}>
                Cancel Message
              </Button>
            )}
          </div>
        </div>
        <div className={`-mt-12`}>
          {showMessage ? (
            <div>
              <div>
                <UserWithDescription
                  member={member}
                  percentage={matchPercentage?.totalPercentage || undefined}
                />
              </div>
              <div className={`my-4`}>
                <TextHeading3 className={`text-md text-gray-500`}>
                  Start a converstation with @{member?.discordName}.
                </TextHeading3>
              </div>
              <SendMessageUserToUser member={member} />
            </div>
          ) : (
            // <MemberInfo
            //   member={findMember || member}
            //   percentage={matchPercentage?.totalPercentage || undefined}
            // />
            // <MemberInfoWithGraph
            //   member={findMember || member}
            //   percentage={matchPercentage?.totalPercentage || undefined}
            //   hasGraph
            // />
            // <MemberInfoWithGraph
            //   member={findMember || member}
            //   // nodesID={nodesPercentage
            //   //   .flatMap((obj: { conn_nodeIDs: any }) => obj.conn_nodeIDs)
            //   //   .slice(0, 4)}
            //   // nodesID={nodesPercentage.map((node: { node: { _id: any; }; }) => node.node._id)}
            //   percentage={matchPercentage?.totalPercentage || undefined}
            //   hasGraph
            // />
            <MemberInfoWithDynamicGraph2
              member={member}
              percentage={matchPercentage?.totalPercentage || undefined}
              nodesID={nodesID}
              relatedNodesMemberToMatch={relatedNodesMemberToMatch}
              conversation={chatN
                .map((obj) => {
                  if (obj.user === "01") {
                    return { role: "assistant", content: obj.message };
                  } else {
                    return { role: "user", content: obj.message };
                  }
                })
                .slice(-6)}
            />
          )}
        </div>
      </div>
    </ChatModal>
  );
};

import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

export type ChatModalProps = {
  title?: string;
  children?: React.ReactNode;
  open?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
};

const ChatModal = ({
  title = "",
  children,
  open = false,
  closeOnEsc = true,
  onClose,
}: ChatModalProps) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const onCloseModal = () => {
    if (onClose) onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={"fixed inset-0 z-50 overflow-y-auto"}
        onClose={() => {
          if (onClose) {
            onCloseModal();
          }
          if (closeOnEsc) setIsOpen(false);
          onClose && onClose();
        }}
      >
        <div
          className={
            "flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
          }
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={
                "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              }
            />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className={"hidden sm:inline-block sm:h-screen sm:align-middle"}
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={
                "relative z-50 inline-block rounded-lg bg-white p-2 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 sm:align-middle"
              }
            >
              <div
                className={"absolute right-0 top-0 hidden pr-4 pt-4 sm:block"}
              >
                {closeOnEsc && (
                  <button
                    type="button"
                    className={
                      "rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    }
                    onClick={() => {
                      setIsOpen(false);
                      onClose && onClose();
                    }}
                  >
                    <span className={"sr-only"}>Close</span>
                    <XIcon className={"h-6 w-6"} aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className={"sm:flex"}>
                <div className={"mt-3 w-full sm:mt-0"}>
                  <Dialog.Title
                    as="h3"
                    className={`text-lg font-medium leading-6 text-gray-900 ${
                      closeOnEsc ? "mr-12" : ""
                    }`}
                  >
                    {title}
                  </Dialog.Title>
                  <div className={"mt-2"}>{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
