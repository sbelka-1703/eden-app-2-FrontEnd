import "./style.css";

import G6 from "@antv/g6";
// import insertCss from "insert-css";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import GraphMenu from "./graphMenu";
import {
  afterDrawG6,
  edgeStrength,
  focusCenterItem,
  handleCheckboxChange,
  linkDistance,
  // tooltip,
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
  setRelatedNodePopup?: any;
}

const css = `
  .g6-component-contextmenu {
    position: absolute;
    z-index: 2;
    list-style-type: none;
    background-color: #363b40;
    border-radius: 6px;
    font-size: 14px;
    color: hsla(0,0%,100%,.85);
    width: fit-content;
    transition: opacity .2s;
    text-align: center;
    padding: 0px 20px 0px 20px;
		box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.6);
		border: 0px;
  }
  .g6-component-contextmenu ul {
		padding-left: 0px;
		margin: 0;
  }
  .g6-component-contextmenu li {
    cursor: pointer;
    list-style-type: none;
    list-style: none;
    margin-left: 0;
    line-height: 38px;
  }
  .g6-component-contextmenu li:hover {
    color: #aaaaaa;
	}
`;

const style = document.createElement("style");

style.innerHTML = css;
document.head.appendChild(style);

// insertCss(`
//   .g6-component-contextmenu {
//     position: absolute;
//     z-index: 2;
//     list-style-type: none;
//     background-color: #363b40;
//     border-radius: 6px;
//     font-size: 14px;
//     color: hsla(0,0%,100%,.85);
//     width: fit-content;
//     transition: opacity .2s;
//     text-align: center;
//     padding: 0px 20px 0px 20px;
// 		box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.6);
// 		border: 0px;
//   }
//   .g6-component-contextmenu ul {
// 		padding-left: 0px;
// 		margin: 0;
//   }
//   .g6-component-contextmenu li {
//     cursor: pointer;
//     list-style-type: none;
//     list-style: none;
//     margin-left: 0;
//     line-height: 38px;
//   }
//   .g6-component-contextmenu li:hover {
//     color: #aaaaaa;
// 	}
// `);

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
  setRelatedNodePopup,
}: IGraphVisualisation) => {
  const ref = React.useRef(null);

  const contextMenu = new G6.Menu({
    shouldBegin(evt: any) {
      if (evt.target && evt.target.isCanvas && evt.target.isCanvas())
        return true;
      if (evt.item) return true;
      return false;
    },
    getContent() {
      return `<ul>
              <li id='relatedNodes'>Related Nodes</li>
              <li id='deleteNode'>Delete Node</li>
            </ul>`;
    },
    handleMenuClick: (target: any, item: any) => {
      const model = item && item.getModel();
      const liIdStrs = target.id.split("-");

      console.log("HEEEYYY", target, item, liIdStrs[0], model);

      if (liIdStrs[0] == "relatedNodes") {
        setRelatedNodePopup(model.id);
      } else if (liIdStrs[0] == "deleteNode") {
        console.log("change = ", "deleteNode");
      }
    },
    offsetX: 16 + 10,
    offsetY: 0,
  });

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
            // console.log("d source= ", d.source);
            // console.log("d target = ", d.target);
            return linkDistance(d);
          },
          edgeStrength: (d: any) => {
            return edgeStrength(d);
          },
        },
        // plugins: [tooltip,contextMenu],
        plugins: [contextMenu],
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
