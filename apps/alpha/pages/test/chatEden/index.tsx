import { gql, useQuery } from "@apollo/client";
import { ChatSimple } from "@eden/package-ui";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

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
    // { id: "node1", x: 100, y: 150, size: 50, label: "sbelka" },
    // { id: "node2", x: 10, y: 10, size: 50, label: "waxy" },
    // { id: "node3", x: 20, y: 10, size: 50, label: "figma" },
    // { id: "node4", x: 30, y: 10, size: 50, label: "UX" },
    // { id: "node5", x: 40, y: 10, size: 50, label: "ImpactBilli" },
    // { id: "node6", x: 500, y: 100, size: 30 },
    // { id: "node7", x: 600, y: 100, size: 30 },
    // { id: "node8", x: 700, y: 100, size: 30 },
    // { id: "node9", x: 800, y: 100, size: 30 },
    // { id: "node10", x: 900, y: 100, size: 30 },
    // { id: "node11", x: 1000, y: 100, size: 30 },
  ],
  edges: [
    // { source: "node0", target: "node1" },
    // { source: "node0", target: "node2" },
    // { source: "node0", target: "node3" },
    // { source: "node0", target: "node4" },
    // { source: "node0", target: "node5" },
    // { source: "node1", target: "node6" },
    // { source: "node1", target: "node7" },
    // { source: "node2", target: "node8" },
    // { source: "node2", target: "node9" },
    // { source: "node9", target: "node10" },
    // { source: "node9", target: "node11" },
  ],
};

const chatEden: NextPageWithLayout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [messageUser, setMessageUser] = useState<string>("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [edenAIsentMessage, setEdenAIsentMessage] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [keywordsDiscussion, setKeywordsDiscussion] = useState<any>([""]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nodesN, setNodesN] = useState<any>(nodesExample);

  const {
    data: dataEdenGPTReply,
    // refetch: refetchEdenGPTReply,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery(EDEN_GPT_REPLY, {
    variables: {
      fields: {
        message: messageUser,
      },
    },
    skip: messageUser == "",
    context: { serviceName: "soilservice" },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [chatN, setChatN] = useState([
    {
      user: "02",
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

    console.log("newKeywords = ", newKeywords);
    return Array.from(uniqueKeywords);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (dataEdenGPTReply && edenAIsentMessage == true) {
      const chatT = [...chatN];

      chatT.push({
        user: "02",
        message: dataEdenGPTReply.edenGPTreply.reply,
      });
      setChatN(chatT);

      setEdenAIsentMessage(false);

      // if the dataEdenGPTReply.edenGPTreply.keywords are new then add them to keywordsDiscussion
      if (dataEdenGPTReply.edenGPTreply.keywords.length > 0) {
        setKeywordsDiscussion(
          mergeUniqueKeywords(
            keywordsDiscussion,
            dataEdenGPTReply.edenGPTreply.keywords
          )
        );
      }
    }
  }, [dataEdenGPTReply]);

  console.log("keywordsDiscussion =--------- ", keywordsDiscussion);

  const handleSentMessage = (messageN: any, userN: any) => {
    const chatT = [...chatN];

    chatT.push({
      user: userN,
      message: messageN,
    });
    setChatN(chatT);

    setMessageUser(messageN);

    setEdenAIsentMessage(true);

    console.log("handleSentMessage = ", chatT);
  };

  console.log("dataEdenGPTReply = ", dataEdenGPTReply);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/2 ">
          <ChatSimple chatN={chatN} handleSentMessage={handleSentMessage} />
        </div>
        {/* <div className="w-1/2">Right Component</div> */}
        <div className="w-1/2">
          <ul>
            {keywordsDiscussion.map((item: any, index: any) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {nodesExample &&
          nodesExample.nodes &&
          nodesExample.nodes.length > 0 ? (
            <GraphVisual data2={nodesN} width={500} height={500} />
          ) : (
            <p>Dont have Graph Data Yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default chatEden;
