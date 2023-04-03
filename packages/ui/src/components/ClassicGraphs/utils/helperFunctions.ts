export const backendGraphToVisualGraph = (
  dataGraphAPI: any,
  useAvatar: boolean,
  randomPosition: boolean,
  nodeIDsObj?: any
) => {
  if (dataGraphAPI == undefined) return {};

  // // console.log("nodeIDsObj = ", nodeIDsObj);

  const nodeDataObj: any = {};
  const edgesDataGraph = dataGraphAPI.edges.map(
    (edge: { source: any; target: any; distanceRation: any; style: any }) => {
      if (!nodeDataObj[edge.source]) {
        nodeDataObj[edge.source] = {
          numberConnections: 1,
        };
      } else {
        nodeDataObj[edge.source].numberConnections += 1;
      }
      if (!nodeDataObj[edge.target]) {
        nodeDataObj[edge.target] = {
          numberConnections: 1,
        };
      } else {
        nodeDataObj[edge.target].numberConnections += 1;
      }

      // // console.log("------ssssss------------");
      // // console.log(edge.source, edge.target);
      // // console.log(nodeIDsObj[edge.source], nodeIDsObj[edge.target]);
      if (
        nodeIDsObj &&
        (nodeIDsObj[edge.source]?.active == false ||
          nodeIDsObj[edge.target]?.active == false)
      ) {
        // this means that this node is not active

        return {
          source: edge.source,
          target: edge.target,
          distanceRation: edge.distanceRation,
          style: {
            ...edge.style,
            stroke: "#FFFFFF",
            fill: "#FFFFFF",
          },
        };
      } else {
        // // console.log("show", edge.style);

        return {
          source: edge.source,
          target: edge.target,
          distanceRation: edge.distanceRation,
          style: edge.style,
        };
      }
    }
  );

  let idx = 0;
  const nodesDataGraph = dataGraphAPI.nodesVisual.map(
    (node: {
      _id: any;
      name: any;
      comboId: string;
      type: string;
      avatar: string;
      extraDistanceRation: Number;
      style: any;
    }) => {
      let extraStyle = {};

      if (useAvatar == true && node.avatar != undefined) {
        // console.log("change = TT1", node.style);

        if (node.type == "dynamicSearch") {
          extraStyle = {
            // type: "root",
            // type: "customNode",
            // size: [80, 60],
            icon: {
              /* whether show the icon, false by default */
              show: true,
              /* icon's img address, string type */
              img: node.avatar,
              /* icon's size, 20 * 20 by default: */
              width: node.style.size - 20,
              height: node.style.size - 20,
            },
          };
        } else {
          extraStyle = {
            // ----------- Shwow Avatar User ---------
            type: "image",
            img: node.avatar,
            // img: "https://picsum.photos/id/4/536/354",
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
          };
        }
      }
      if (useAvatar == false && node.avatar != undefined) {
        extraStyle = {
          // ----------- Shwow Avatar User ---------
          type: node.type,
          // img: "",
          clipCfg: {},
          style: {},
          // ----------- Shwow Avatar User ---------
        };
      }

      if (randomPosition == true) {
        // console.log("change =aaaaaaaaaaaaaaaaaaaaaa ");
        extraStyle = {
          ...extraStyle,
          x: idx * Math.floor(Math.random() * 800) + 50,
          y: idx * Math.floor(Math.random() * 800) + 50,
        };
      }

      if (nodeIDsObj && nodeIDsObj[node._id]?.active == false) {
        // this means that this node is not active
        extraStyle = {
          ...extraStyle,
          activate: false,
          style: {
            size: 58,

            fill: "#ECECEC",
            stroke: "#8777A6",
          },

          type: "background-animate",
          color: "#40a9ff",
        };
      }

      if (nodeIDsObj && nodeIDsObj[node._id]?.isNew == true) {
        extraStyle = {
          ...extraStyle,
          isNew: true,
        };
      }

      // if (node._id == "640a738ec5d61b4bae0ee079" || node._id == "640a7381c5d61b4bae0ee065"){
      //   extraStyle = {
      //     ...extraStyle,
      //     comboId: "combo1"
      //   };

      // }

      return {
        id: node._id,
        label: node.name,
        comboId: node.comboId,
        nodeType: node.type,
        extraDistanceRation: node.extraDistanceRation,
        size: 50,
        numberConnections: nodeDataObj[node._id]
          ? nodeDataObj[node._id].numberConnections
          : 0,
        propertise: {
          name: node.name,
        },
        style: node.style,
        ...extraStyle,
      };

      idx += 1;
    }
  );

  let combosDataGraph;

  if (dataGraphAPI.combos) {
    combosDataGraph = dataGraphAPI.combos.map(
      (combo: { id: any; label: any; style: any }) => {
        return {
          id: combo.id,
          // label: combo.label,
          label: "",
          padding: 3,
          style: combo.style,
        };
      }
    );
  } else {
    combosDataGraph = [];
  }

  // console.log("nodesDataGraph = ", nodesDataGraph);
  return {
    nodes: nodesDataGraph,
    edges: edgesDataGraph,
    combos: combosDataGraph,
    // combos: [
    //   {
    //     id: "combo1",
    //     label: "Combo1",
    //     // style:{
    //     //   fill: '#f00',
    //     //   stroke: '#f00',
    //     // }
    //   },
    // ],
  };
};
