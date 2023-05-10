import { nodeTypeStyle } from "./nodeTypeStyle";

export const rawDataPersonProject: any = {
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
      id: "Opportunity",
      x: 100,
      y: 150,
      label: "Opportunity",
      ...nodeTypeStyle["Project"],
    },
    {
      id: "Role",
      x: 100,
      y: 150,
      label: "Role",
      ...nodeTypeStyle["expertise"],
    },
    {
      id: "skillFrontEnd1",
      x: 100,
      y: 150,
      label: "skill",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "skillFrontEnd2",
      x: 100,
      y: 150,
      label: "skill",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "skillFrontEnd3",
      x: 100,
      y: 150,
      label: "skill",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "Role2",
      x: 100,
      y: 150,
      label: "Role",
      ...nodeTypeStyle["expertise"],
    },
    {
      id: "skillBackEnd4",
      x: 100,
      y: 150,
      label: "skill",
      ...nodeTypeStyle["sub_expertise"],
    },
    {
      id: "skillBackEnd5",
      x: 100,
      y: 150,
      label: "skill",
      ...nodeTypeStyle["sub_expertise"],
    },
  ],
  edges: [
    { source: "milo", target: "Role", style: { distance: 140 } },
    { source: "Role", target: "skillFrontEnd1", style: { distance: 80 } },
    { source: "Role", target: "skillFrontEnd2", style: { distance: 80 } },
    { source: "Role", target: "skillFrontEnd3", style: { distance: 80 } },

    { source: "milo", target: "Role2", style: { distance: 140 } },
    { source: "Role2", target: "skillBackEnd4", style: { distance: 80 } },
    { source: "Role2", target: "skillBackEnd5", style: { distance: 80 } },

    {
      source: "Opportunity",
      target: "skillFrontEnd1",
      style: { distance: 210 },
    },
    {
      source: "Opportunity",
      target: "skillFrontEnd2",
      style: { distance: 210 },
    },
    {
      source: "Opportunity",
      target: "skillFrontEnd3",
      style: { distance: 210 },
    },

    {
      source: "Opportunity",
      target: "skillBackEnd4",
      style: { distance: 210 },
    },
    {
      source: "Opportunity",
      target: "skillBackEnd5",
      style: { distance: 210 },
    },

    {
      source: "Role2",
      target: "Role",
      style: { distance: 300, stroke: "#FFFFFF" },
    },
    {
      source: "Opportunity",
      target: "milo",
      style: { distance: 450, stroke: "#FFFFFF" },
    },
  ],
};
