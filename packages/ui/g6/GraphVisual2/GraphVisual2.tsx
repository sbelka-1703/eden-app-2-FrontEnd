import "./style.css";

import G6 from "@antv/g6";
// import { Edge, Maybe, NodeVisual } from "@eden/package-graphql/generated";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import {
  addNodeAndEdge,
  edgeStrength,
  handleCheckboxChange,
  linkDistance,
  updateNodes,
} from "./settings/graphFunctions";
import { Graph } from "./settings/interfaceGraph";

export interface IGraphVisualisation {
  data2: Graph;
  width: number;
  height: number;
}

//  -------------- Graph Functions ------------

const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  fixToNode: [1, 0.5],
  // the types of items that allow the tooltip show up
  itemTypes: ["node"],
  // custom the tooltip's content
  getContent: (e: any) => {
    const outDiv = document.createElement("div");

    outDiv.style.width = "fit-content";
    outDiv.style.height = "fit-content";
    const model = e.item.getModel();

    if (model.propertise && model.propertise.name != undefined) {
      outDiv.innerHTML = `name：${model.propertise.name}<br/>type：${model.nodeType}`;

      return outDiv;
    } else {
      return "";
    }
  },
});

function refreshDragedNodePosition(e: any) {
  const model = e.item.get("model");

  model.fx = e.x;
  model.fy = e.y;
}

//  -------------- Graph Functions ------------

let graph: any;

export const GraphVisual2 = ({ width, height, data2 }: IGraphVisualisation) => {
  const ref = React.useRef(null);

  //  -------------- Graph Setup ----------------
  useEffect(() => {
    if (!graph) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      graph = new G6.Graph({
        container: ref.current as unknown as string | HTMLElement,
        width: width,
        height: height,
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
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

      updateNodes(
        {
          nodes: [
            {
              id: "node0",
              size: 80,
            },
          ],
          edges: [],
        },
        graph,
        setItems,
        setCheckedItems
      );

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
        const nodeConnectID = e.item._cfg.id;

        addNodeAndEdge(nodeConnectID, {}, graph);
      });
    }
  }, [data2]);

  useEffect(() => {
    setTimeout(function () {
      // protect it for firing the rerender too early

      updateNodes(data2, graph, setItems, setCheckedItems);
    }, 100);
  }, [data2]);
  //  -------------- Graph Setup ----------------

  // ---------- Menue Nodes, Check UnCheck -------------
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const [items, setItems] = useState([]);
  // ---------- Menue Nodes, Check UnCheck -------------

  useEffect(() => {
    if (graph) {
      graph.changeSize(width, height);
      graph.refresh();
    }
  }, [width, height]);

  return (
    <div className="relative w-full">
      {data2?.nodes && data2?.nodes?.length == 1 ? <div>loading</div> : true}
      <div ref={ref}></div>
      <div className="fixed bottom-0 right-0 p-10">
        {/* <div className="absolute right-2 bottom-0 flex flex-col"> */}
        {items.map((item: any, idx: number) => (
          <div key={item.id} className="mb-2 flex items-center justify-end">
            <div className={`ml-2 text-${item.colorsa}-500`}>{item.name}</div>
            <button
              className="ml-2"
              style={{
                backgroundColor: checkedItems[idx].checked
                  ? item.fill
                  : item.fill,
                color: "black",
                fontSize: "small",
                padding: "5px 12px",
                borderRadius: "200px",
                // border: item.stroke,
                border: checkedItems[idx].checked
                  ? `2px solid ${item.stroke}`
                  : `2px solid ${item.stroke}`,
                cursor: "pointer",
                width: "fit-content",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                handleCheckboxChange(
                  idx,
                  data2,
                  checkedItems,
                  setCheckedItems,
                  graph
                )
              }
              value={idx}
            >
              {checkedItems[idx].checked ? (
                // {checkedItems[idx].checked ? (
                <span>&#10003;</span>
              ) : (
                <span style={{ color: item.fill }}>N</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(GraphVisual2), {
  ssr: false,
});
