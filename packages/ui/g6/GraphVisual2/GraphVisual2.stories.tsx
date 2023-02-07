// import { getMember } from "@eden/package-mock";
import { Edge, Maybe, NodeVisual } from "@eden/package-graphql/generated";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GraphVisual2 } from "./GraphVisual2";

interface clipCfg {
  show?: boolean;
  type?: string;
  r?: number;
}

interface style {
  fill?: string;
  stroke?: string;
  height?: number;
  width?: number;
}

interface NodeVisualExtended extends NodeVisual {
  id?: string;
  x?: number;
  y?: number;
  size?: number;
  label?: string;
  img?: string;
  clipCfg?: clipCfg;
  style?: style;
}

export interface Graph {
  edges?: Maybe<Array<Maybe<Edge>>>;
  nodes?: Maybe<Array<Maybe<NodeVisualExtended>>>;
}

export default {
  title: "G6/GraphVisual2",
  component: GraphVisual2,
  argTypes: {},
} as ComponentMeta<typeof GraphVisual2>;

const Template: ComponentStory<typeof GraphVisual2> = (args) => {
  return <GraphVisual2 {...args} />;
};

const data2: Graph = {
  nodes: [
    {
      id: "node0",
      size: 80,
      x: 5,
      y: 5,
      label: "eloi",
      // style: {
      //   fill: "#bae637",
      //   stroke: "#eaff8f",
      //   lineWidth: 5,
      // },

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
    { id: "node1", x: 100, y: 150, size: 50, label: "sbelka" },
    { id: "node2", x: 10, y: 10, size: 50, label: "waxy" },
    { id: "node3", x: 20, y: 10, size: 50, label: "figma" },
    { id: "node4", x: 30, y: 10, size: 50, label: "UX" },
    { id: "node5", x: 40, y: 10, size: 50, label: "ImpactBilli" },
    { id: "node6", x: 500, y: 100, size: 30 },
    { id: "node7", x: 600, y: 100, size: 30 },
    { id: "node8", x: 700, y: 100, size: 30 },
    { id: "node9", x: 800, y: 100, size: 30 },
    { id: "node10", x: 900, y: 100, size: 30 },
    { id: "node11", x: 1000, y: 100, size: 30 },
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

export const Default = Template.bind({});
Default.args = {
  // member: getMember(),
  data2: data2,
  width: 500,
  height: 500,
};
