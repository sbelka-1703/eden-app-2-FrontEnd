import G6 from "@antv/g6";

import { Graph, NodeVisualExtended } from "./interfaceGraph";
import { nodeTypeStyle } from "./nodeTypeStyle";

const globalFontSize = 10;

export const remapValue = (
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
) => {
  return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
};

export function afterDrawG6(cfg: any, group: any) {
  const sizeT: any = cfg?.size || 0;

  const r = sizeT / 2.4;
  const back1 = group?.addShape("circle", {
    zIndex: -3,
    attrs: {
      x: 0,
      y: 0,
      r,
      fill: cfg?.color,
      opacity: 0.8,
    },
    // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
    name: "back1-shape",
  });
  const back2 = group?.addShape("circle", {
    zIndex: -2,
    attrs: {
      x: 0,
      y: 0,
      r,
      fill: cfg?.color,
      opacity: 0.8,
    },
    // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
    name: "back2-shape",
  });
  const back3 = group?.addShape("circle", {
    zIndex: -1,
    attrs: {
      x: 0,
      y: 0,
      r,
      fill: cfg?.color,
      opacity: 0.6,
    },
    // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
    name: "back3-shape",
  });

  group?.sort(); // Sort according to the zIndex
  back1?.animate(
    {
      // Magnifying and disappearing
      r: r + 14,
      opacity: 0.3,
    },
    {
      duration: 3000,
      easing: "easeCubic",
      delay: 300,
      repeat: true, // repeat
    }
  ); // no delay
  back2?.animate(
    {
      // Magnifying and disappearing
      r: r + 12,
      opacity: 0.2,
    },
    {
      duration: 3000,
      easing: "easeCubic",
      delay: 900,
      repeat: true, // repeat
    }
  ); // 1s delay
  back3?.animate(
    {
      // Magnifying and disappearing
      r: r + 10,
      opacity: 0.1,
    },
    {
      duration: 3000,
      easing: "easeCubic",
      delay: 1400,
      repeat: true, // repeat
    }
  ); // 3s delay
}

export function addEdge(newEdge: any, graph: any) {
  const model2 = {
    ...newEdge,
    // source: newEdge.source,
    // target: newEdge.target,
    // style: newEdge.style,
  };

  graph.addItem("edge", model2);

  graph.layout();
}

export function addNode(newNode: any, graph: any) {
  const model = {
    ...newNode,
  };

  graph.addItem("node", model);

  graph.layout();
}

export function addNodeAndEdge(nodeConnectID: any, newNode: any, graph: any) {
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

  graph.addItem("node", model);

  const model2 = {
    source: nodeConnectID,
    target: newNodeID,
  };

  graph.addItem("edge", model2);

  graph.layout();
}

export function edgeStrength(d: any) {
  if (d.distanceRation) {
    let extraDistanceRation = 0;

    if (d.source.extraDistanceRation) {
      extraDistanceRation = extraDistanceRation + d.source.extraDistanceRation;
    } else if (d.target.extraDistanceRation) {
      extraDistanceRation = extraDistanceRation + d.target.extraDistanceRation;
    }
    return d.distanceRation + extraDistanceRation;
  }
  return 1;
}

export function linkDistance(d: any) {
  // Change dinamicaloly the distance based on the number of connections
  let numConnections = 0;

  // console.log("d = ", d);
  // SOS 🆘 delete Test
  // console.log("d = ", d);
  if (d.style?.distance) {
    return d.style.distance;
  }
  // if (d.source.id == "node0" && d.target.id == "node11") {
  //   return 600;
  // }

  if (d.source.numberConnections > d.target.numberConnections) {
    numConnections = d.source.numberConnections;
  } else {
    numConnections = d.target.numberConnections;
  }

  let initDistance = 90;

  let randomDistance = 100;

  if (numConnections > 23) {
    initDistance = 130;
  } else if (numConnections > 10) {
    initDistance = 100;
  } else {
    randomDistance = 50;
  }

  if (d.distanceRation) {
    let extraDistanceRation = 0;

    if (d.source.extraDistanceRation) {
      extraDistanceRation = extraDistanceRation + d.source.extraDistanceRation;
    } else if (d.target.extraDistanceRation) {
      extraDistanceRation = extraDistanceRation + d.target.extraDistanceRation;
    }
    return remapValue(d.distanceRation + extraDistanceRation, 0, 1, 25, 230);
  } else {
    return initDistance + Math.floor(Math.random() * randomDistance);
  }
}

export const prepareLabelOfNode = (
  node: NodeVisualExtended,
  fontSize: any,
  graph: any
) => {
  let updateObj = {};

  let flagUpdate = false;

  if (node.label == undefined) return "";

  const words = node.label
    .replace("\n", " ")
    .replace("\n", " ")
    .replace("\n", " ")
    .replace("& ", "")
    .replace("| ", "")
    .split(" ");

  let i = 0;

  let res2 = "";

  if (words.length > 1) {
    let maxEllipsisLength = 0;

    while (i < words.length && i < 3) {
      const word = words[i];

      const ellipsisLength = G6.Util.getTextSize(word, fontSize)[0];

      if (maxEllipsisLength < ellipsisLength) {
        maxEllipsisLength = ellipsisLength;
      }

      res2 = res2 + word + "\n";
      i++;
    }
    res2 = res2.slice(0, -1);

    let parsDiff = node.size - parseInt(maxEllipsisLength.toString());

    let sizeNew = node.size;

    if (parsDiff < 0) {
      parsDiff = parsDiff * 0.16;
      sizeNew = node.size * 1.2;
    } else {
      // parsDiff = parsDiff * 0.03;
      // sizeNew = node.size * 0.95;
      parsDiff = parsDiff * 0;
      sizeNew = node.size * 1;
    }
    const fontSizeNew = (fontSize + parsDiff).toFixed();

    flagUpdate = true;

    if (node?.isNew == true) {
      res2 = `(NEW) \n\n\n ${res2} \n\n\n`;
    }
    updateObj = {
      label: res2,
      size: sizeNew,
      labelCfg: {
        style: {
          fontSize: fontSizeNew,
        },
      },
    };
    // console.log("node,fontSizeNew --1--= ", node.label, fontSizeNew, words);
  } else if (words.length == 1) {
    flagUpdate = true;

    const ellipsisLength = G6.Util.getTextSize(node.label, fontSize)[0];

    let parsDiff = node.size - parseInt(ellipsisLength);

    let sizeNew = node.size;

    if (parsDiff < 0) {
      parsDiff = parsDiff * 0.18;
      sizeNew = node.size * 1.2;
    } else {
      // parsDiff = parsDiff * 0.03;
      // sizeNew = node.size * 0.95;
      parsDiff = parsDiff * 0;
      sizeNew = node.size * 1;
    }

    const fontSizeNew = (fontSize + parsDiff).toFixed();

    if (node?.isNew == true) {
      const res2T = `(NEW) \n\n\n\n ${words} \n\n\n\n`;

      updateObj = {
        label: res2T,
        size: sizeNew,
        labelCfg: {
          style: {
            fontSize: fontSizeNew,
          },
        },
      };
    } else {
      updateObj = {
        size: sizeNew,
        labelCfg: {
          style: {
            fontSize: fontSizeNew,
          },
        },
      };
    }
    // console.log("node,fontSizeNew --2--= ", node.label, fontSizeNew, words);
  }

  // console.log("node TTTTT= " , node)

  // console.log("updateObj = " , updateObj)

  if (flagUpdate == true) {
    graph.updateItem(node.id, {
      ...updateObj,
    });
  }

  return res2;
};

export const handleCheckboxChange = (
  itemId: any,
  data2: Graph,
  checkedItems: any,
  setCheckedItems: any,
  graph: any
) => {
  const flagChange = !checkedItems[itemId].checked;

  const nodeTypeNow = checkedItems[itemId].nodeType;

  const addNodesObj = {};

  data2?.nodes?.forEach(function (node: any) {
    let nodeType = node.nodeType;

    if (node.disabledNode == true) {
      nodeType = "disabledNode";
    }

    if (nodeType == nodeTypeNow) {
      if (flagChange == true) {
        // @ts-ignore
        addNodesObj[node.id] = node;
        addNode(node, graph);
      } else {
        const itemDel = graph.findById(node.id);

        graph.removeItem(itemDel);
      }
    }
  });

  data2?.edges?.forEach(function (edge: any) {
    // @ts-ignore
    if (addNodesObj[edge.source] || addNodesObj[edge.target]) {
      // console.log("edge Change = ", edge);
      addEdge(edge, graph);
    }
  });

  setCheckedItems({
    ...checkedItems,
    [itemId]: {
      ...checkedItems[itemId],
      checked: !checkedItems[itemId].checked,
    },
  });
};

export function updateNodes(
  data: any,
  graph: any,
  setCheckedItems: any,
  setItems: any
) {
  graph.data(data);
  graph.render();

  const items: any[] = [];
  const itemsObj = {};

  // -------- Change stype based on Type of Node -------
  let maxNodeSizeRatio = -0.1; // find max and min sizeRation

  let minNodeSizeRation = 1.1;

  data.nodes.forEach(function (node: any) {
    const nodeType = node.nodeType;

    // @ts-ignore
    if (nodeTypeStyle[nodeType] == undefined) return null;

    // @ts-ignore
    if (nodeTypeStyle[nodeType].sizeRatio > maxNodeSizeRatio) {
      // @ts-ignore
      maxNodeSizeRatio = nodeTypeStyle[nodeType].sizeRatio;
    }
    // @ts-ignore
    if (nodeTypeStyle[nodeType].sizeRatio < minNodeSizeRation) {
      // @ts-ignore
      minNodeSizeRation = nodeTypeStyle[nodeType].sizeRatio;
    }
  });

  data.nodes.forEach(function (node: any) {
    if (!node) return;

    let nodeType = node.nodeType;

    if (node.disabledNode == true) {
      nodeType = "disabledNode";
    }

    // @ts-ignore
    if (nodeType && nodeTypeStyle[nodeType]) {
      // SOS 🆘 you cant chanege the style of the member node because the visualisation breaks
      if (nodeType != "Member") {
        graph.updateItem(node.id, {
          size: remapValue(
            // @ts-ignore
            nodeTypeStyle[nodeType].sizeRatio,
            minNodeSizeRation,
            maxNodeSizeRatio,
            30,
            80
          ),
          // size: nodeTypeStyle[nodeType].size,
          style: {
            // @ts-ignore
            fill: nodeTypeStyle[nodeType].fill,
            // @ts-ignore
            stroke: nodeTypeStyle[nodeType].stroke,
            lineWidth: 1,
          },
        });
      } else {
        graph.updateItem(node.id, {
          label: "",
        });
      }
    }
    // -------- Change stype based on Type of Node -------

    // -------- Change label of Node -------
    if (node) {
      prepareLabelOfNode(node, globalFontSize, graph);
    }
    // -------- Change label of Node -------

    // -------- Create the Menue of Graph -------
    // @ts-ignore
    const typeNowStyle = nodeTypeStyle[nodeType];

    // @ts-ignore
    if (itemsObj[nodeType] == undefined && typeNowStyle != undefined) {
      // @ts-ignore
      itemsObj[nodeType] = {
        res: typeNowStyle,
      };
      items.push({
        id: items.length,
        name: typeNowStyle?.displayName,
        fill: typeNowStyle?.fill,
        stroke: typeNowStyle?.stroke,
        nodeType: nodeType,
        checked: true,
      });
    }
    // -------- Create the Menue of Graph -------
  });

  if (items.length > 1) {
    // Create the Menue of Graph
    setItems(items as any);
    setCheckedItems(items);
  }

  graph.layout();
}

export function updateNodesBackendSettings(
  data: any,
  graph: any,
  setCheckedItems: any,
  setItems: any
) {
  graph.data(data);
  graph.render();

  const items: any[] = [];
  const itemsObj = {};

  data.nodes.forEach(function (node: any) {
    if (!node) return;

    let nodeType = node.nodeType;

    if (node.disabledNode == true) {
      nodeType = "disabledNode";
    }

    // -------- Change label of Node -------
    // console.log("before prepare node  = ", node);
    prepareLabelOfNode(node, globalFontSize, graph);
    // -------- Change label of Node -------

    // -------- Change stype based on Type of Node -------
    if (nodeType) {
      // SOS 🆘 you cant chanege the style of the member node because the visualisation breaks
      if (nodeType != "Member" && nodeType != "dynamicSearch") {
        graph.updateItem(node.id, {
          size: node.style.size,
          style: {
            fill: node.style.fill,
            stroke: node.style.stroke,
            lineWidth: 1,
            // @ts-ignore
            // fill: nodeTypeStyle[nodeType].fill,
            // @ts-ignore
            // stroke: nodeTypeStyle[nodeType].stroke,
          },
          // size: nodeTypeStyle[nodeType].size,
          // style: node.style,
        });
      } else {
        graph.updateItem(node.id, {
          label: "",
        });
      }
    }
    // -------- Change stype based on Type of Node -------

    // -------- Create the Menue of Graph -------
    // @ts-ignore
    const typeNowStyle = nodeTypeStyle[nodeType];

    // @ts-ignore
    if (itemsObj[nodeType] == undefined && typeNowStyle != undefined) {
      // @ts-ignore
      itemsObj[nodeType] = {
        res: typeNowStyle,
      };
      items.push({
        id: items.length,
        name: typeNowStyle?.displayName,
        fill: typeNowStyle?.fill,
        stroke: typeNowStyle?.stroke,
        order: typeNowStyle?.order,
        nodeType: nodeType,
        checked: true,
      });
    }
    // -------- Create the Menue of Graph -------
  });

  // console.log("change = ------------------");

  //Solution
  const itemsNew = items.sort((a, b) => a.order - b.order);

  // console.log("items = ", items);
  // console.log("items_new = ", itemsNew);

  if (itemsNew.length > 1) {
    // Create the Menue of Graph
    setItems(itemsNew as any);
    setCheckedItems(itemsNew);
  }

  graph.layout();
}

export const tooltip = new G6.Tooltip({
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
      // outDiv.innerHTML = `name：${model.propertise.name}<br/>type：${model.nodeType}`;
      outDiv.innerHTML = `name：${model.propertise.name}`;

      return outDiv;
    } else {
      return "";
    }
  },
});

export function focusCenterItem(graph: any) {
  // -------------- focus on Center Item -------------
  let xCenter = 0;
  let yCenter = 0;

  let num = 0;

  const nodes = graph.cfg.nodes;

  if (!graph.cfg.nodes) return {};

  nodes.forEach((node: any) => {
    const xNow = node?._cfg?.bboxCache?.x;
    const yNow = node?._cfg?.bboxCache?.y;

    if (xNow && yNow) {
      xCenter += xNow;
      yCenter += yNow;
      num += 1;
    }
  });

  if (!xCenter) return {};
  if (!yCenter) return {};

  xCenter = xCenter / num;
  yCenter = yCenter / num;

  // console.log("xCenter = ", xCenter);
  // console.log("yCenter = ", yCenter);

  // find the node that is closer to center
  let xMin = 10000;
  let nodeID = "";

  nodes.forEach((node: any) => {
    const xNow = node?._cfg?.bboxCache?.x;
    const yNow = node?._cfg?.bboxCache?.y;

    const distanceX = Math.abs(xNow - xCenter);
    const distanceY = Math.abs(yNow - yCenter);

    const distanceAll = Math.sqrt(
      distanceX * distanceX + distanceY * distanceY
    );

    if (distanceAll < xMin) {
      xMin = distanceAll;
      nodeID = node._cfg.id;
    }
  });

  console.log("nodeID = ", nodeID);
  graph.focusItem(nodeID, true, {
    duration: 200,
  });
  // -------------- focus on Center Item -------------
}

// ---------------------------- Zoom in and center Node Research ----------------

// export function testGraph(graph: any) {

// const randomNum = Math.random() * 1 + 0.2;

// const zoomNow = graph.getZoom();

// let zoomNew;

// if (zoomNow < 1) {
//   zoomNew = 2 - zoomNow;
// } else {
//   zoomNew = 1 / zoomNow;
// }
// console.log("zoomNow = ", zoomNow);
// console.log("zoomNew = ", zoomNew);

// console.log("randomNum = ", randomNum);

// graph.zoom(0.5, { x: 100, y: 100 }, true, {
//   duration: 100,
// });
// console.log("zoomGraph = ", zoomGraph);

// let xMin = 10000;
// let xMax = 0;

// let yMin = 1000;
// let yMax = 0;

// graph.cfg.nodes.forEach((node) => {
//   const xNow = node._cfg.bboxCache.x;
//   const yNow = node._cfg.bboxCache.y;

//   if (xNow < xMin) xMin = xNow;

//   if (xNow > xMax) xMax = xNow;

//   if (yNow < yMin) yMin = yNow;

//   if (yNow > yMax) yMax = yNow;
// });

// // -------------- focus on Center Item -------------
// let xCenter = 0
// let yCenter = 0

// let num = 0

// graph.cfg.nodes.forEach((node: any) => {
//   const xNow = node._cfg.bboxCache.x;
//   const yNow = node._cfg.bboxCache.y;

//   xCenter += xNow
//   yCenter += yNow

//   num += 1
// });

// xCenter = xCenter / num
// yCenter = yCenter / num

// console.log("xCenter = ", xCenter);
// console.log("yCenter = ", yCenter);

// // find the node that is closer to center
// let xMin = 10000;
// let nodeID = "";

// graph.cfg.nodes.forEach((node: any) => {

//   const xNow = node._cfg.bboxCache.x;
//   const yNow = node._cfg.bboxCache.y;

//   const distanceX = Math.abs(xNow - xCenter);
//   const distanceY = Math.abs(yNow - yCenter);

//   const distanceAll = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

//   if (distanceAll < xMin) {
//     xMin = distanceAll;
//     nodeID = node._cfg.id;
//   }
// });

// console.log("nodeID = ", nodeID);
// graph.focusItem(nodeID);
// // -------------- focus on Center Item -------------

// console.log("xMax,xMin,yMin,yMax = ", xMax, xMin, yMin, yMax);

// console.log("graph = ", graph);
// console.log("graph = ", graph.cfg);
// console.log("graph = ", graph.cfg.layoutController);
// console.log("graph = ", graph.cfg.layoutController.layoutCfg);
// console.log("graph = ", graph.cfg.layoutController.layoutCfg.center);
// graph.zoom(0.5, true, {
//   duration: 100,
// });

// graph.zoom(zoomGraph, { x: 0, y: 300 }, true, {
//   duration: 200,
// });
// graph.zoom(0.5, { x: 250, y: 250 }, true, {
//   duration: 200,
// });

// graph.moveTo(250, 250, true, {
//   duration: 100,
// });

// graph.fitView(2);
// graph.fitCenter();

// setTimeout(function () {
//   console.log(
//     "graph MOOOVE= ",
//     graph.cfg.layoutController.layoutCfg.center
//   );
//   const graphCenterX = graph.cfg.layoutController.layoutCfg.center[0];
//   const graphCenterY = graph.cfg.layoutController.layoutCfg.center[1];

//   let widthU = width.toString();

//   widthU = parseInt(widthU / 2);

//   const heightU = parseInt(parseInt(height) / 2);

//   console.log("widthU,heightU = ", widthU, heightU);

//   const moveX = widthU - graphCenterX;
//   const moveY = heightU - graphCenterY;

//   console.log("moveX,moveY = ", moveX, moveY);

//   graph.translate(moveX, moveY, true, {
//     duration: 200,
//   });
// }, 600);

// setTimeout(function () {
//   console.log(
//     "graph MOOOVE= ",
//     graph.cfg.layoutController.layoutCfg.center
//   );
//   const graphCenterX = graph.cfg.layoutController.layoutCfg.center[0];
//   const graphCenterY = graph.cfg.layoutController.layoutCfg.center[1];

//   let widthU = width.toString();

//   widthU = parseInt(widthU / 2);

//   const heightU = parseInt(parseInt(height) / 2);

//   console.log("widthU,heightU = ", widthU, heightU);

//   const moveX = widthU - graphCenterX;
//   const moveY = heightU - graphCenterY;

//   console.log("moveX,moveY = ", moveX, moveY);

//   graph.translate(moveX, moveY, true, {
//     duration: 200,
//   });
//   // graph.moveTo(250, 250, true, {
//   //   duration: 200,
//   // });
// }, 100);

// console.log("graph.getWidth() = ", graph.get("canvas"));
// console.log("graph.group() = ", graph.get("group"));
// console.log("graph.autoPaint() = ", graph.get("autoPaint"));

// setTimeout(function () {
//   console.log(
//     "graph ZOOM= ",
//     graph.cfg.layoutController.layoutCfg.center
//   );
//   // graph.zoom(1 / zoomNow, { x: graphCenterX, y: graphCenterY }, true, {
//   //   duration: 200,
//   // });
//   const widthU = parseInt(parseInt(width) / 2);

//   const heightU = parseInt(parseInt(height) / 2);

//   // graph.zoom(1 / zoomNow, { x: widthU, y: heightU }, true, {
//   //   duration: 200,
//   // });
//   graph.zoomTo(1, { x: 250, y: 250 }, true, {
//     duration: 200,
//   });
// }, 600);

// await graph.zoom(0.5, { x: graphCenterX, y: graphCenterY }, true, {
//   duration: 200,
// });

// graph.fitView(2);
// // graph.fitView([250, 250, 250, 250]);
// graph.fitView([10, 10, 250, 10]);
// // graph.fitView(-20, { onlyOutOfViewPort: true, direction: "y" });

// console.log("graph.getZoom() = ", graph.getZoom());

// await graph.zoom(23.5, { x: graphCenterX, y: graphCenterY }, true, {
//   duration: 200,
// });

// console.log("graph.getZoom() = ", graph.getZoom());

// graph.fitCenter();
// graph.focusItem("961730944170090516");
// graph.fitCenter();
// graph.translate(100, 100, true, {
//   duration: 100,
// });

// if a node is inactive you can activate it
// if (e.item._cfg?.model?.activate == false) {
// setActivateNodeEvent(nodeConnectID);
// }

// focusCenterItem(graph)

// graph.zoom(1.3,
//   // { x: 250, y: 250 },
//   true, {
//     duration: 200,
// });
// }
// ---------------------------- Zoom in and center Node Research ----------------

// ---------------------------- Create New Design of Node from scratch ----------------
// / root node
// G6.registerNode("root", {
//   draw: (cfg, group) => {
//     const size = [80, 30];
//     const keyShape = group.addShape("rect", {
//       attrs: {
//         width: size[0],
//         height: size[1],
//         x: -size[0] / 2,
//         y: -size[1] / 2,
//         fill: "rgb(19, 33, 92)",
//         radius: 5,
//       },
//       draggable: true,
//       name: "root-keyshape",
//     });

//     group.addShape("text", {
//       attrs: {
//         text: `${cfg.ratio}%`,
//         fill: "rgba(255, 255, 255, 0.85)",
//         fontSize: 6,
//         x: 10 - size[0] / 2,
//         y: 3,
//       },
//       draggable: true,
//       name: "ratio-shape",
//     });
//     group.addShape("text", {
//       attrs: {
//         text: `${cfg.label}`,
//         fill: "rgba(120, 120, 120, 0.85)",
//         fontSize: 9,
//         x: -6,
//         y: 0,
//       },
//       draggable: true,
//       name: "label-shape",
//     });
//     group.addShape("line", {
//       attrs: {
//         x1: -6,
//         x2: 35,
//         y1: 2,
//         y2: 2,
//         stroke: "rgba(255, 255, 255, 0.85)",
//         lineWidth: 0.5,
//       },
//       draggable: true,
//       name: "divider-shape",
//     });
//     group.addShape("text", {
//       attrs: {
//         text: `${cfg.subLabel}`,
//         fill: "rgba(255, 255, 255, 0.65)",
//         fontSize: 6,
//         x: -6,
//         y: 10,
//       },
//       draggable: true,
//       name: "sublabel-shape",
//     });
//     group.addShape("circle", {
//       attrs: {
//         x: 30,
//         y: 10,
//         r: 10,
//         fill: "blue",
//       },
//       // In G6 3.3 and later versions, the name must be specified, which can be any string, but must be unique in the same custom element type
//       name: "circle-shape",
//     });

//     return keyShape;
//   },
// });
// ---------------------------- Create New Design of Node from scratch ----------------
