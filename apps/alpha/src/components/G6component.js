//src// components // G6component.js
import G6 from "@antv/g6";
import React, { useEffect } from "react";
// import ReactDOM from "react-dom";

const globalFontSize = 10;

const data2 = {
  nodes: [
    {
      id: "node0",
      size: 70,
      label: "eloi",
      style: {
        fill: "#bae637",
        stroke: "#eaff8f",
        lineWidth: 5,
      },
    },
    { id: "node1", size: 50, label: "sbelka" },
    { id: "node2", size: 50, label: "waxy" },
    { id: "node3", size: 50, label: "figma" },
    { id: "node4", size: 50, label: "UX" },
    { id: "node5", size: 50, label: "ImpactBilli" },
    { id: "node6", size: 30 },
    { id: "node7", size: 30 },
    { id: "node8", size: 30 },
    { id: "node9", size: 30 },
    { id: "node10", size: 30 },
    { id: "node11", size: 30 },
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
    { source: "node9", target: "node10" },
    { source: "node9", target: "node11" },
  ],
};

const G6component = () => {
  // return <p>asdf</p>;
  const ref = React.useRef(null);

  let graph = null;

  const fittingString = (nodeID, str, maxWidth, fontSize) => {
    const ellipsis = "...";
    const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];

    let currentWidth = 0;

    let res = str;
    const pattern = new RegExp("[\u4E00-\u9FA5]+"); // distinguish the Chinese charactors and letters

    str.split("").forEach((letter, i) => {
      if (currentWidth > maxWidth - ellipsisLength) return;
      if (pattern.test(letter)) {
        // Chinese charactors
        currentWidth += fontSize;
      } else {
        // get the width of single letter according to the fontSize
        currentWidth += G6.Util.getLetterWidth(letter, fontSize);
      }
      if (currentWidth > maxWidth - ellipsisLength) {
        res = `${str.substr(0, i)}${ellipsis}`;
      }
    });

    if (res.substr(-3) === "...") {
      graph.updateItem(nodeID, {
        label: res,
      });
    }

    return res;
  };

  useEffect(() => {
    if (!graph) {
      // const minimap = new G6.Minimap();

      console.log("G6 = ", G6);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      graph = new G6.Graph({
        container: ref.current,
        width: 600,
        height: 400,
        // plugins: [minimap],
        modes: {
          default: ["drag-canvas", "zoom-canvas"],
        },
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
          linkDistance: (d) => {
            if (d.source.id === "node0") {
              return 100;
            }
            return 60;
          },
        },
      });

      // console.log("data = ", data);
      // console.log("data2 = ", data2);

      graph.data(data2);
      graph.render();

      function refreshDragedNodePosition(e) {
        const model = e.item.get("model");

        model.fx = e.x;
        model.fy = e.y;
      }
      graph.on("node:dragstart", (e) => {
        console.log("change = ", e);
        graph.layout();
        refreshDragedNodePosition(e);
      });
      graph.on("node:drag", (e) => {
        refreshDragedNodePosition(e);
      });
      graph.on("node:click", (e) => {
        console.log("e = ", e.item._cfg.id);

        const nodeConnectID = e.item._cfg.id;

        addNode(nodeConnectID, {});
        // addNode(nodeConnectID, { id: "node88", size: 55 } as Node);
      });

      data2.nodes.forEach(function (node) {
        console.log("node = ", node);
        if (node && node.id && node.label && node.size)
          fittingString(node.id, node.label, node.size, globalFontSize);
      });
    }
  }, []);

  function addNode(nodeConnectID, newNode) {
    const nodeOrigin = graph.findById(nodeConnectID);

    let newNodeID;

    if (newNode == undefined || newNode.id == undefined) {
      newNodeID = Math.random().toString(36).substr(2, 9);
    } else {
      newNodeID = newNode.id;
    }

    const model = {
      id: newNodeID,
      x: nodeOrigin._cfg.bboxCache.x + Math.random() * 70 + 40,
      y: nodeOrigin._cfg.bboxCache.y + Math.random() * 70 + 40,

      size: newNode.size != undefined ? newNode.size : 15,
    };

    console.log("model = ", model);

    graph.addItem("node", model);

    const model2 = {
      source: nodeConnectID,
      target: newNodeID,
    };

    graph.addItem("edge", model2);

    graph.layout();
  }

  return (
    <>
      <button
        onClick={() => {
          console.log("dataAPI = ");
        }}
      >
        Get Graph
      </button>
      {/* <p>boyanda</p> */}
      <div ref={ref}></div>
    </>
  );
};

export default G6component;
