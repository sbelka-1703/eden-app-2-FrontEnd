import {
  DynamicSearchGraph,
  // MemberGraph
} from "@eden/package-ui";
import React, { RefObject, useRef, useState } from "react";

import type { NextPageWithLayout } from "../../_app";

const GraphVisualPage: NextPageWithLayout = () => {
  const refContainer = useRef<HTMLDivElement>();

  const presetNodesID = [
    "63eaefebdf71c82f61c177eb",
    "63eaf018df71c82f61c178ac",
    "63eaefeedf71c82f61c177f3",
    "63eaefb64862b62edc303774",
    "63eaf009df71c82f61c1784b",
  ];

  const [nodesIDt, setNodesIDt] = useState<any>();

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
            onClick={() => {
              if (nodesIDt) {
                setNodesIDt(
                  nodesIDt.concat(presetNodesID[nodesIDt.length - 1])
                );
              } else {
                setNodesIDt([presetNodesID[0]]);
              }
            }}
          >
            Add Nodes
          </button>
        </div>

        <div className={`flex h-screen w-full gap-4`}>
          <div
            className={`h-screen
             py-1 text-center`}
          ></div>

          {refContainer && (
            <div
              className="w-full"
              ref={refContainer as RefObject<HTMLDivElement>}
            >
              <DynamicSearchGraph nodesID={nodesIDt} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GraphVisualPage;
