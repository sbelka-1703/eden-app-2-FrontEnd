import "./style.css";

import G6 from "@antv/g6";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import GraphMenu from "./graphMenu";
import {
  afterDrawG6,
  edgeStrength,
  handleCheckboxChange,
  linkDistance,
  tooltip,
  // updateNodes,
  updateNodesBackendSettings,
} from "./settings/graphFunctions";
import { Graph } from "./settings/interfaceGraph";

export interface IGraphVisualisation {
  data2: Graph;
  width: number;
  height: number;
  settingsGraphs?: any;
  updateSettings?: any;
  hasMenu?: boolean;
  graph?: any;
  setGraph?: any;
  setActivateNodeEvent?: any;
  disableZoom?: boolean;
}

const loadingNode: Graph = {
  nodes: [
    {
      id: "node0",
      size: 80,
    },
  ],
  edges: [],
};

//  -------------- Graph Functions ------------

function refreshDragedNodePosition(e: any) {
  const model = e.item.get("model");

  model.fx = e.x;
  model.fy = e.y;
}
//  -------------- Graph Functions ------------

G6.registerNode(
  "background-animate",
  {
    afterDraw(cfg, group) {
      afterDrawG6(cfg, group);
    },
  },
  "circle"
);

export const GraphVisual = ({
  width,
  height,
  data2,
  settingsGraphs = undefined,
  updateSettings = undefined,
  hasMenu = true,
  graph,
  setGraph,
  setActivateNodeEvent,
  disableZoom,
}: IGraphVisualisation) => {
  const ref = React.useRef(null);

  //  -------------- Graph Setup ----------------
  useEffect(() => {
    let modes = ["drag-canvas", "zoom-canvas"];

    if (disableZoom == true) {
      modes = ["drag-canvas"];
    }
    if (!graph) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      graph = new G6.Graph({
        container: ref.current as unknown as string | HTMLElement,
        width: width,
        height: height,
        modes: {
          default: modes,
          // default: ["drag-canvas"],
          // default: ["drag-canvas", "zoom-canvas"],
          // default: ["drag-canvas", "zoom-canvas", "activate-relations"],
        },
        animate: true, // Boolean, whether to activate the animation when global changes happen
        defaultNode: {
          type: "circle",
          labelCfg: {
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
          strictRadial: true,
          linkDistance: (d: any) => {
            return linkDistance(d);
          },
          edgeStrength: (d: any) => {
            return edgeStrength(d);
          },
        },
        plugins: [tooltip],
      });

      setGraph(graph);

      // updateNodes(loadingNode, graph, setItems, setCheckedItems);
      // updateNodesBackendSettings(loadingNode, graph);
      updateNodesBackendSettings(loadingNode, graph, setItems, setCheckedItems);

      graph.on("node:dragstart", (e: any) => {
        graph.layout();
        refreshDragedNodePosition(e);
      });
      graph.on("node:drag", (e: any) => {
        const forceLayout = graph.get("layoutController").layoutMethods[0];

        forceLayout.execute();
        refreshDragedNodePosition(e);
      });
      graph.on("node:dragend", function (e: any) {
        e.item.get("model").fx = null;
        e.item.get("model").fy = null;
      });
      graph.on("node:click", (e: any) => {
        const nodeConnectID = e.item?._cfg?.id;

        // if a node is inactive you can activate it
        if (e.item._cfg?.model?.activate == false) {
          setActivateNodeEvent(nodeConnectID);
        }
      });
    }
  }, [data2]);

  // console.log("data2 = =3=34=2432=34432=24=2=4 ", data2);

  useEffect(() => {
    setTimeout(function () {
      // protect it for firing the rerender too early
      updateNodesBackendSettings(data2, graph, setItems, setCheckedItems);
    }, 100);
  }, [data2]);
  //  -------------- Graph Setup ----------------

  // ---------- Menue Nodes, Check UnCheck -------------
  const [checkedItems, setCheckedItems] = useState<any>([]);
  // const [items] = useState([]);
  const [items, setItems] = useState([]);
  // ---------- Menue Nodes, Check UnCheck -------------

  useEffect(() => {
    if (graph) {
      // // console.log("width, height = ", width, height);
      if (width != undefined && height != undefined) {
        if (width != 0 && height != 0) {
          graph.changeSize(width, height);
          graph.refresh();
        }
      }
    }
  }, [width, height]);

  // // console.log("settingsGraphs = ", settingsGraphs);

  return (
    <div className="relative w-full">
      <div ref={ref} className="flex justify-center"></div>

      {hasMenu && (
        <GraphMenu
          items={items}
          checkedItems={checkedItems}
          handleCheckboxChange={handleCheckboxChange}
          data2={data2}
          setCheckedItems={setCheckedItems}
          graph={graph}
          settingsGraphs={settingsGraphs}
          updateSettings={updateSettings}
        />
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(GraphVisual), {
  ssr: false,
});
