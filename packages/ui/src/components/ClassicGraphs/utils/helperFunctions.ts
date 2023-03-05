export const backendGraphToVisualGraph = (
  dataGraphAPI: any,
  useAvatar: boolean,
  randomPosition: boolean,
  nodeIDsObj?: any
) => {
  if (dataGraphAPI == undefined) return {};

  console.log("nodeIDsObj = ", nodeIDsObj);

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

      // console.log("------ssssss------------");
      // console.log(edge.source, edge.target);
      // console.log(nodeIDsObj[edge.source], nodeIDsObj[edge.target]);
      if (
        nodeIDsObj[edge.source] == false ||
        nodeIDsObj[edge.target] == false
      ) {
        // this means that this node is not active

        // console.log("hide");
        // console.log("------ssssss------------");

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
        // console.log("show", edge.style);

        // console.log("------ssssss------------");

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
      type: string;
      avatar: string;
      extraDistanceRation: Number;
      style: any;
    }) => {
      let extraStyle = {};

      if (useAvatar == true && node.avatar != undefined) {
        extraStyle = {
          // ----------- Shwow Avatar User ---------
          type: "image",
          img: node.avatar,
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
        console.log("change =aaaaaaaaaaaaaaaaaaaaaa ");
        extraStyle = {
          ...extraStyle,
          x: idx * Math.floor(Math.random() * 800) + 50,
          y: idx * Math.floor(Math.random() * 800) + 50,
        };
      }

      if (nodeIDsObj[node._id] == false) {
        // this means that this node is not active
        extraStyle = {
          ...extraStyle,
          activate: false,
          style: {
            size: 48,

            fill: "#ECECEC",
            stroke: "#A9A9A9",
          },

          type: "background-animate",
          color: "#40a9ff",
        };
      }

      return {
        id: node._id,
        label: node.name,
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

  console.log("nodesDataGraph = ", nodesDataGraph);
  return {
    nodes: nodesDataGraph,
    edges: edgesDataGraph,
  };
};
