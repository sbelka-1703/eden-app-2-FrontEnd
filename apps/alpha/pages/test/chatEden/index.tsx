/* eslint-disable react-hooks/rules-of-hooks */
import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { MATCH_NODES_MEMBERS } from "@eden/package-graphql";
import { ChatSimple } from "@eden/package-ui";
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
  const [keywordsDiscussion, setKeywordsDiscussion] = useState<any>([""]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nodesN, setNodesN] = useState<any>(nodesExample);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { selectedServerID } = useContext(UserContext);

  const [nodesID] = useState<string[] | null>(null);
  // const [nodesID, setNodesID] = useState<string[] | null>(null);

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
        serverID: selectedServerID,
      },
    },
    skip: !nodesID || !selectedServerID,
    context: { serviceName: "soilservice" },
  });

  console.log("dataMembers = ", dataMembers);

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

  // console.log("keywordsDiscussion =--------- ", keywordsDiscussion);

  const handleSentMessage = (messageN: any, userN: any) => {
    const chatT = [...chatN];

    chatT.push({
      user: userN,
      message: messageN,
    });
    setChatN(chatT);

    setMessageUser(messageN);

    setEdenAIsentMessage(true);

    // console.log("handleSentMessage = ", chatT);
  };

  // console.log("dataEdenGPTReply = ", dataEdenGPTReply);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/2 ">
          <ChatSimple chatN={chatN} handleSentMessage={handleSentMessage} />
        </div>
        {/* <div className="w-1/2">Right Component</div> */}
        <div className="w-1/2">
          {/* <ul>
            {keywordsDiscussion.map((item: any, index: any) => (
              <li key={index}>{item}</li>
            ))}
          </ul> */}
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
