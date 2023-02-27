/* eslint-disable react-hooks/rules-of-hooks */
import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { MATCH_NODES_MEMBERS } from "@eden/package-graphql";
import { MatchMembersToSkillOutput } from "@eden/package-graphql/generated";
import {
  Card,
  CardGrid,
  ChatSimple,
  // GridItemNine,
  // GridLayout,
  UserDiscoverCard,
} from "@eden/package-ui";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";

import type { NextPageWithLayout } from "../../_app";

const GraphVisual = dynamic(
  () => import("@eden/package-ui/g6/GraphVisual/GraphVisual"),
  {
    ssr: false,
  }
);

const EDEN_GPT_REPLY = gql`
  query ($fields: edenGPTreplyInput!) {
    edenGPTreply(fields: $fields) {
      reply
      keywords
    }
  }
`;

const FIND_NODES_NAME = gql`
  query ($fields: findNodesInput!) {
    findNodes(fields: $fields) {
      _id
      name
      node
    }
  }
`;

const nodesExample = {
  nodes: [
    {
      id: "node0",
      size: 80,
      x: 5,
      y: 5,
      label: "eloi",
      // ----------- Shwow Avatar User ---------
      type: "image",
      img: "https://cdn.discordapp.com/avatars/961730944170090516/e5844ca759a74e995027a0e50c5cb1bf.png",
      clipCfg: {
        show: true,
        type: "circle",
        r: 25,
      },
      style: {
        height: 50,
        width: 50,
      },
      // ----------- Shwow Avatar User ---------
    },
  ],
  edges: [],
};

const chatEden: NextPageWithLayout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [messageUser, setMessageUser] = useState<string>("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [edenAIsentMessage, setEdenAIsentMessage] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [keywordsDiscussion, setKeywordsDiscussion] = useState<any>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nodesN, setNodesN] = useState<any>(nodesExample);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { selectedServerID } = useContext(UserContext);

  // const [nodesID] = useState<string[] | null>(null);
  const [nodesID, setNodesID] = useState<string[] | null>(null);

  // const [nodeNames]

  const { data: dataFindNodesName } = useQuery(FIND_NODES_NAME, {
    variables: {
      fields: {
        // Continue here with -> keywordsDiscussion
        names: keywordsDiscussion,
        // names: [
        //   'Design User Interfaces', 'UX/UI Design'
        // ],
      },
    },
    skip: keywordsDiscussion.length == 0,
    context: { serviceName: "soilservice" },
  });

  console.log("dataFindNodesName = ", dataFindNodesName);
  console.log("keywordsDiscussion = ", keywordsDiscussion);

  const { data: dataEdenGPTReply } = useQuery(EDEN_GPT_REPLY, {
    variables: {
      fields: {
        message: messageUser,
      },
    },
    skip: messageUser == "",
    context: { serviceName: "soilservice" },
  });

  const { data: dataMembers } = useQuery(MATCH_NODES_MEMBERS, {
    variables: {
      fields: {
        nodesID: nodesID,
        // nodesID: ["63eaefc44862b62edc3037b4"],
        // nodesID: ["63eaefb14862b62edc303768", "63eaefc44862b62edc3037b4"],
        serverID: selectedServerID,
      },
    },
    // skip: !nodesID || !selectedServerID,
    context: { serviceName: "soilservice" },
  });

  console.log("dataMembers = ", dataMembers);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [chatN, setChatN] = useState([
    {
      user: "01",
      message: "Hey I am Eden AI, how can I help you?",
    },
  ]);

  const mergeUniqueKeywords = (arr1: any, arr2: any) => {
    const uniqueKeywords = new Set([...arr1, ...arr2]);

    // const newKeywords = Array.from(arr2.filter(keyword => !uniqueKeywords.has(keyword)));
    const newKeywords = arr2.filter((keyword: any) => !arr1.includes(keyword));

    const nodesNew = [...nodesN.nodes];

    const edgesNew = [...nodesN.edges];

    newKeywords.forEach((keyword: any) => {
      if (keyword != "") {
        nodesNew.push({
          id: keyword,
          label: keyword,
          size: 40,
        });
        edgesNew.push({
          source: "node0",
          target: keyword,
        });
      }
    });

    setNodesN({
      nodes: nodesNew,
      edges: edgesNew,
    });

    const mergeUniqueK = Array.from(uniqueKeywords);

    const mergeUniqueKNew = [];

    for (let i = 0; i < mergeUniqueK.length; i++) {
      if (mergeUniqueK[i] !== "") {
        mergeUniqueKNew.push(mergeUniqueK[i]);
      }
    }

    // console.log(mergeUniqueKNew);

    return mergeUniqueKNew;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (dataEdenGPTReply && edenAIsentMessage == true) {
      const chatT = [...chatN];

      chatT.push({
        user: "01",
        message: dataEdenGPTReply.edenGPTreply.reply,
      });
      setChatN(chatT);

      setEdenAIsentMessage(false);

      // if the dataEdenGPTReply.edenGPTreply.keywords are new then add them to keywordsDiscussion

      const keywordsAI = dataEdenGPTReply.edenGPTreply.keywords;

      const newKeywords = mergeUniqueKeywords(keywordsDiscussion, keywordsAI);

      if (keywordsAI.length > 0) {
        setKeywordsDiscussion(newKeywords);
      }
    }
  }, [dataEdenGPTReply]);

  useEffect(() => {
    if (dataFindNodesName?.findNodes?.length > 0) {
      const newNodesID: any = [];

      dataFindNodesName.findNodes.map((nodes: any) => {
        console.log("nodes = ", nodes);

        newNodesID.push(nodes._id);
      });

      setNodesID(newNodesID);
    }
  }, [dataFindNodesName]);

  console.log("nodesID = ", nodesID);

  // console.log("keywordsDiscussion =--------- ", keywordsDiscussion);

  const handleSentMessage = (messageN: any, userN: any) => {
    const chatT = [...chatN];

    chatT.push({
      user: userN,
      message: messageN,
    });
    setChatN(chatT);

    console.log("messageN ==------- ", messageN);

    setMessageUser(messageN);

    setEdenAIsentMessage(true);

    // console.log("handleSentMessage = ", chatT);
  };

  console.log("messageUser = ", messageUser);

  // console.log("dataEdenGPTReply = ", dataEdenGPTReply);

  //   return ( <div className="h-full flex flex-col justify-between">
  //   <div className="p-4 bg-white h-full overflow-y-auto">
  //     <p className="text-lg font-bold">Message Title</p>
  //     <div className="my-4">
  //       <p>Message 1</p>
  //       <p>Message 2</p>
  //       <p>Message 3</p>
  //     </div>
  //   </div>
  //   <div className="p-4 bg-white flex justify-between items-center">
  //     <input type="text" className="w-full mr-4 py-2 px-4 rounded border border-gray-400" placeholder="Type your message here..."/>
  //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
  //   </div>
  // </div>)

  // return (
  //   <>
  //   <div className="flex h-screen">

  //     <div className="w-1/2 h-1/2 bg-gray-200">
  //       <div className="h-full flex flex-col justify-between">
  //         <div className="p-4 bg-white h-full overflow-y-auto">
  //           <p className="text-lg font-bold">Message Title</p>
  //           <div className="my-4">
  //             <p>Message 1</p>
  //             <p>Message 2</p>
  //             <p>Message 3</p>
  //           </div>
  //         </div>
  //         <div className="p-4 bg-white flex justify-between items-center">
  //           <input type="text" className="w-full mr-4 py-2 px-4 rounded border border-gray-400" placeholder="Type your message here..."/>
  //           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="w-1/2 h-1/2 bg-gray-300"></div>

  //     <div className="w-1/2 h-screen bg-gray-400"></div>

  //     </div>

  //   </>
  // )

  // return (<>
  //   <div className="flex flex-wrap h-screen">

  //       <div className="w-1/2 h-1/2 bg-gray-200">
  //         <div className="h-full flex flex-col justify-between">
  //           <div className="p-4 bg-white h-full overflow-y-auto">
  //             <p className="text-lg font-bold">Message Title</p>
  //             <div className="my-4">
  //               <p>Message 1</p>
  //               <p>Message 2</p>
  //               <p>Message 3</p>
  //             </div>
  //           </div>
  //           <div className="p-4 bg-white flex justify-between items-center">
  //             <input type="text" className="w-full mr-4 py-2 px-4 rounded border border-gray-400" placeholder="Type your message here..."/>
  //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="w-1/2 h-full bg-gray-300">X1</div>
  //       <div className="w-1/2 h-1/2 bg-gray-400">Y2</div>

  //     </div>

  // </>)

  // return (
  //   <>
  //           <ChatSimple chatN={chatN} handleSentMessage={handleSentMessage} />
  //   </>
  // )

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col">
          <div className="h-1/2 bg-gray-100">
            <ChatSimple chatN={chatN} handleSentMessage={handleSentMessage} />
          </div>
          <div className="h-1/2 bg-gray-50">
            {nodesExample &&
            nodesExample.nodes &&
            nodesExample.nodes.length > 0 ? (
              <GraphVisual data2={nodesN} width={500} height={500} />
            ) : (
              <p>Dont have Graph Data Yet</p>
            )}
          </div>
        </div>
        <div className="h-full flex-1 ">
          {/* <GridLayout> */}
          {/* <GridItemNine> */}
          <Card
            shadow
            className="scrollbar-hide h-full overflow-scroll bg-white p-4"
          >
            <CardGrid>
              {dataMembers?.matchNodesToMembers?.map(
                (member: MatchMembersToSkillOutput, index: number) => (
                  <UserDiscoverCard
                    key={index}
                    matchMember={member}
                    // role={selectedRole}
                    // project={dataProject?.findProject}
                    invite
                    phase={``}
                  />
                )
              )}
            </CardGrid>
          </Card>
          {/* </GridItemNine> */}
          {/* </GridLayout> */}
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     {/* <div className="flex h-screen">
  //       <div className="w-1/2 ">
  //         <ChatSimple chatN={chatN} handleSentMessage={handleSentMessage} />
  //       </div>
  //       <div className="w-1/2">
  //         {nodesExample &&
  //         nodesExample.nodes &&
  //         nodesExample.nodes.length > 0 ? (
  //           <GraphVisual data2={nodesN} width={500} height={500} />
  //         ) : (
  //           <p>Dont have Graph Data Yet</p>
  //         )}
  //       </div>
  //     </div> */}
  //     <div className="flex h-screen">
  //       <div className="flex flex-1 flex-col">
  //         <div className="h-1/2 bg-gray-100">
  //           <ChatSimple chatN={chatN} handleSentMessage={handleSentMessage} />
  //         </div>
  //         <div className="h-1/2 bg-gray-200">
  //           T
  //           {/* {nodesExample &&
  //           nodesExample.nodes &&
  //           nodesExample.nodes.length > 0 ? (
  //             <GraphVisual data2={nodesN} width={500} height={500} />
  //           ) : (
  //             <p>Dont have Graph Data Yet</p>
  //           )} */}
  //         </div>
  //       </div>
  //       <div className="h-full flex-1 bg-gray-400">Z</div>
  //     </div>
  //   </>
  // );
};

export default chatEden;
