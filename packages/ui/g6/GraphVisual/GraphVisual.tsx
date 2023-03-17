import "./style.css";

import G6 from "@antv/g6";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import GraphMenu from "./graphMenu";
import {
  afterDrawG6,
  edgeStrength,
  focusCenterItem,
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
  centerGraph?: boolean;
  zoomGraph?: number;
}

const loadingNode: Graph = {
  nodes: [
    {
      id: "node0",
      size: 80,
    },
  ],
  edges: [],
  combos: [],
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
  centerGraph,
  zoomGraph,
}: IGraphVisualisation) => {
  const ref = React.useRef(null);

  //  -------------- Graph Setup ----------------
  useEffect(() => {
    let modes = ["drag-canvas", "drag-combo", "zoom-canvas"];

    if (disableZoom == true) {
      modes = ["drag-canvas", "drag-combo"];
    }
    if (!graph) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      graph = new G6.Graph({
        container: ref.current as unknown as string | HTMLElement,
        width: width,
        height: height,
        fitCenter: true,
        modes: {
          default: modes,
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
            console.log("d source= ", d.source);
            console.log("d target = ", d.target);
            return linkDistance(d);
          },
          edgeStrength: (d: any) => {
            return edgeStrength(d);
          },
        },
        plugins: [tooltip],
      });

      setGraph(graph);

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
      graph.on("node:click", async (e: any) => {
        const nodeConnectID = e.item?._cfg?.id;

        if (setActivateNodeEvent) {
          setActivateNodeEvent(nodeConnectID);
        }
      });
    }
  }, [data2]);

  useEffect(() => {
    setTimeout(function () {
      // protect it for firing the rerender too early
      console.log("data2 = ", data2);
      updateNodesBackendSettings(data2, graph, setItems, setCheckedItems);
    }, 100);
  }, [data2]);

  // ------------- Center and Zoom Graph ----------------
  useEffect(() => {
    if (centerGraph == true) {
      if (zoomGraph) {
        setTimeout(function () {
          graph.zoom(
            zoomGraph,
            { x: graph.getWidth() / 2, y: graph.getHeight() / 2 },
            true,
            {
              duration: 200,
            }
          );
        }, 1000);
      }

      setTimeout(function () {
        focusCenterItem(graph);
      }, 300);
    }
  }, [centerGraph]);
  // ------------- Center and Zoom Graph ----------------

  // ---------- Menue Nodes, Check UnCheck -------------
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const [items, setItems] = useState([]);
  // ---------- Menue Nodes, Check UnCheck -------------

  useEffect(() => {
    if (graph) {
      if (width != undefined && height != undefined) {
        if (width != 0 && height != 0) {
          graph.changeSize(width, height);
          graph.refresh();
        }
      }
    }
  }, [width, height]);

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
