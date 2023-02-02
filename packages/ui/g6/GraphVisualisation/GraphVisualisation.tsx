import "./style.css";

import G6 from "@antv/g6";
import { Members } from "@eden/package-graphql/generated";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

// const G6 = dynamic(() => import("@antv/g6"), { ssr: false });

// export default dynamic(() => Promise.resolve(GraphVisualisation), {
//   ssr: false,
// });

export interface IGraphVisualisation {
  member?: Members;
  data2?: any;
}

const data = {
  nodes: [
    { id: "node0", size: 50 },
    { id: "node1", size: 30 },
    { id: "node2", size: 30 },
    { id: "node3", size: 30 },
    { id: "node4", size: 30 },
    { id: "node5", size: 30 },
    { id: "node6", size: 15 },
    { id: "node7", size: 15 },
    { id: "node8", size: 15 },
    { id: "node9", size: 15 },
  ],
  edges: [
    { source: "node0", target: "node1" },
    { source: "node0", target: "node2" },
    { source: "node0", target: "node3" },
    { source: "node0", target: "node4" },
    { source: "node0", target: "node5" },
    { source: "node1", target: "node6" },
    { source: "node1", target: "node7" },
    { source: "node2", target: "node8" },
    { source: "node2", target: "node9" },
  ],
};

// const data = {};

export const GraphVisualisation = ({ data2 }: IGraphVisualisation) => {
  // export const GraphVisualisation = ({ member, data }: IGraphVisualisation) => {
  const ref = React.useRef(null);
  let graph: any;

  // console.log("data = ", data);
  // console.log("data2 = ", data2);

  const refreshDragedNodePosition = (e: any) => {
    const model = e.item.get("model");

    model.fx = e.x;
    model.fy = e.y;
  };

  useEffect(() => {
    if (!graph) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      graph = new G6.Graph({
        container: ref.current as unknown as string | HTMLElement,
        width: 600,
        height: 400,
        // plugins: [minimap],
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
        defaultNode: {
          type: "circle",
          labelCfg: {
            position: "center",
            style: {
              fill: "#000000A6",
              fontSize: 10,
            },
          },
          style: {
            stroke: "#72CC4A",
            width: 150,
          },
        },
        defaultEdge: {
          type: "line",
        },
        layout: {
          type: "force",
          preventOverlap: true,
          linkDistance: (d: any) => {
            if (d.source.id === "node0") {
              return 100;
            }
            return 30;
          },
        },
      });

      graph.data(data);

      graph.render();

      // function refreshDragedNodePosition(e: any) {
      //   const model = e.item.get("model");

      //   model.fx = e.x;
      //   model.fy = e.y;
      // }
      graph.on("node:dragstart", (e: any) => {
        graph.layout();
        refreshDragedNodePosition(e);
      });
      graph.on("node:drag", (e: any) => {
        refreshDragedNodePosition(e);
      });
    }
  }, [data]);

  return (
    <div>
      {/* <p className="pc-text-head ">🏆 Champion</p> */}
      <div ref={ref}></div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(GraphVisualisation), {
  ssr: false,
});
