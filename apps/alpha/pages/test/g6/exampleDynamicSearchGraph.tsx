import {
  DynamicSearchGraph,
  // MemberGraph
} from "@eden/package-ui";
import React, { useEffect, useState } from "react";

import type { NextPageWithLayout } from "../../_app";

const GraphVisualPage: NextPageWithLayout = () => {
  const [num, setNum] = useState<number>(0);
  const presetNodesID = [
    "63eaefebdf71c82f61c177eb",
    "63eaf018df71c82f61c178ac",
    "63eaefeedf71c82f61c177f3",
    "63eaf009df71c82f61c1784b",
  ];

  const [nodesIDt, setNodesIDt] = useState<any>([
    "6425213bfd005e8c789ceaca",
    "6416b6e1a57032640bd813aa",
  ]);
  const [activeNodes, setActiveNodes] = useState<any>([false, false]);

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
    const matchingIndex = nodesIDt.indexOf(nodeID);

    if (matchingIndex != -1) {
      const newActiveNodes = [...activeNodes];

      newActiveNodes[matchingIndex] = true;
      setActiveNodes(newActiveNodes);
    }
  };
  //  ------------- change activation nodes when click ----

  const addNodes = () => {
    const activateB = Math.random() < 0.3 ? true : false;

    if (nodesIDt) {
      const newNode = presetNodesID[num];

      // only add newNode if it is not already on ndoesIDt
      if (nodesIDt.indexOf(newNode) == -1) {
        setNodesIDt([...nodesIDt, newNode]);
        setActiveNodes([...activeNodes, activateB]);
      }
    } else {
      setNodesIDt([presetNodesID[num]]);
      setActiveNodes([activateB]);
    }
    setNum(num + 1);
  };

  return (
    <>
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: "10",
          width: "100%",
        }}
      >
        <div>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white shadow hover:bg-blue-700"
            onClick={() => addNodes()}
          >
            Add Nodes
          </button>
        </div>

        <div className={`flex h-screen w-full gap-4`}>
          <div className="h-full w-full">
            <DynamicSearchGraph
              nodesID={nodesIDt}
              activeNodes={activeNodes}
              setActivateNodeEvent={setActivateNodeEvent}
              graphType={"KG_AI_2_plusIndustry"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphVisualPage;
