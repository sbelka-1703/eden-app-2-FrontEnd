import { nodeTypeStyle } from "./nodeTypeStyle";

export const rawDataBigGraph: any = {
  nodes: [
    {
      id: "milo",
      size: 80,
      x: 5,
      y: 5,
      label: "milo",

      // ----------- Shwow Avatar User ---------
      type: "image",
      img: "https://cdn.discordapp.com/avatars/961730944170090516/e5844ca759a74e995027a0e50c5cb1bf.png",
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
    },
    {
      id: "Miltos",
      size: 80,
      x: 5,
      y: 5,
      label: "milo",

      // ----------- Shwow Avatar User ---------
      type: "image",
      img: "https://cdn.discordapp.com/avatars/574927766512861194/9669f3f8ab98bf75da2c7ee2c38af363.png",
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
    },
    {
      id: "BluePanda",
      size: 80,
      x: 5,
      y: 5,
      label: "milo",

      // ----------- Shwow Avatar User ---------
      type: "image",
      img: "https://cdn.discordapp.com/avatars/908392557258604544/5472104b88b4876e3ad06803da45bee6.png",
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
    },
    {
      id: "Nala",
      size: 80,
      x: 5,
      y: 5,
      label: "milo",

      // ----------- Shwow Avatar User ---------
      type: "image",
      img: "https://cdn.discordapp.com/avatars/971147333414842408/4af3b2d4f773b0970f9fbc15d7eb7787.png",
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
    },
    {
      id: "Product Design",
      x: 100,
      y: 150,
      label: "Product Design",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "UX/UI",
      x: 100,
      y: 150,
      label: "UX/UI",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Blockchain",
      x: 100,
      y: 150,
      label: "Blockchain",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Graph Database",
      x: 100,
      y: 150,
      label: "Graph Database",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Statistics",
      x: 100,
      y: 150,
      label: "Statistics",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Tokenoimics",
      x: 100,
      y: 150,
      label: "Tokenoimics",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "GraphQL",
      x: 100,
      y: 150,
      label: "GraphQL",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Nagotiation",
      x: 100,
      y: 150,
      label: "Nagotiation",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Product Development",
      x: 100,
      y: 150,
      label: "Product Development",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Legal",
      x: 100,
      y: 150,
      label: "Legal",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Solidity",
      x: 100,
      y: 150,
      label: "Solidity",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "User Research",
      x: 100,
      y: 150,
      label: "User Research",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Statistical Analysis",
      x: 100,
      y: 150,
      label: "Statistical Analysis",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Managment 101",
      x: 100,
      y: 150,
      label: "Managment 101",
      ...nodeTypeStyle["Project"],
    },
    {
      id: "Eden Product Development",
      x: 100,
      y: 150,
      label: "Eden Product Development",
      ...nodeTypeStyle["Project"],
    },
    {
      id: "School of Code",
      x: 100,
      y: 150,
      label: "School of Code",
      ...nodeTypeStyle["Project"],
    },
    {
      id: "Design Academy",
      x: 100,
      y: 150,
      label: "Design Academy",
      ...nodeTypeStyle["Project"],
    },
    {
      id: "Tesla",
      x: 100,
      y: 150,
      label: "Tesla",
      ...nodeTypeStyle["Project"],
    },
  ],
  edges: [
    { source: "milo", target: "Product Design", style: { distance: 140 } },
    { source: "milo", target: "UX/UI", style: { distance: 140 } },
    { source: "milo", target: "User Research", style: { distance: 140 } },
    {
      source: "Product Design",
      target: "Statistical Analysis",
      style: { distance: 100 },
    },

    { source: "UX/UI", target: "Managment 101", style: { distance: 140 } },
    {
      source: "Product Design",
      target: "Managment 101",
      style: { distance: 140 },
    },
    {
      source: "Statistical Analysis",
      target: "Eden Product Development",
      style: { distance: 140 },
    },

    {
      source: "Legal",
      target: "Eden Product Development",
      style: { distance: 140 },
    },
    {
      source: "Nagotiation",
      target: "Eden Product Development",
      style: { distance: 140 },
    },

    {
      source: "Miltos",
      target: "Product Development",
      style: { distance: 140 },
    },
    {
      source: "Design Academy",
      target: "Product Development",
      style: { distance: 140 },
    },

    { source: "Nagotiation", target: "Miltos", style: { distance: 140 } },
    { source: "Legal", target: "Miltos", style: { distance: 140 } },

    { source: "BluePanda", target: "Graph Database", style: { distance: 140 } },
    { source: "BluePanda", target: "Statistics", style: { distance: 140 } },
    { source: "BluePanda", target: "Managment 101", style: { distance: 140 } },

    { source: "Nala", target: "User Research", style: { distance: 140 } },

    { source: "Nala", target: "School of Code", style: { distance: 140 } },
    { source: "Solidity", target: "School of Code", style: { distance: 140 } },
    { source: "Solidity", target: "GraphQL", style: { distance: 140 } },
    { source: "Tokenoimics", target: "GraphQL", style: { distance: 140 } },
    {
      source: "Blockchain",
      target: "School of Code",
      style: { distance: 140 },
    },

    { source: "Tokenoimics", target: "Tesla", style: { distance: 140 } },
    { source: "Tesla", target: "GraphQL", style: { distance: 140 } },

    {
      source: "School of Code",
      target: "Tesla",
      style: { distance: 540, stroke: "#FFFFFF" },
    },
    {
      source: "Managment 101",
      target: "Tesla",
      style: { distance: 740, stroke: "#FFFFFF" },
    },
    {
      source: "Eden Product Development",
      target: "Tesla",
      style: { distance: 440, stroke: "#FFFFFF" },
    },

    {
      source: "Managment 101",
      target: "milo",
      style: { distance: 450, stroke: "#FFFFFF" },
    },
    {
      source: "Miltos",
      target: "milo",
      style: { distance: 650, stroke: "#FFFFFF" },
    },
    {
      source: "Design Academy",
      target: "milo",
      style: { distance: 800, stroke: "#FFFFFF" },
    },
    {
      source: "Eden Product Development",
      target: "milo",
      style: { distance: 450, stroke: "#FFFFFF" },
    },
    {
      source: "School of Code",
      target: "milo",
      style: { distance: 450, stroke: "#FFFFFF" },
    },
    {
      source: "School of Code",
      target: "Managment 101",
      style: { distance: 450, stroke: "#FFFFFF" },
    },
    {
      source: "Eden Product Development",
      target: "Managment 101",
      style: { distance: 450, stroke: "#FFFFFF" },
    },
    {
      source: "Eden Product Development",
      target: "School of Code",
      style: { distance: 450, stroke: "#FFFFFF" },
    },
    // { source: "Eden Product Developments", target: "School of Code",style: {distance: 450,stroke: "#FFFFFF",} },
    // { source: "milo", target: "BluePanda",style: {distance: 450,stroke: "#FFFFFF",} },
    // { source: "Nala", target: "BluePanda",style: {distance: 350,stroke: "#FFFFFF",} },
  ],
};
