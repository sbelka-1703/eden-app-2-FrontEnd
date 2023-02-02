import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GraphVisualisation } from "./GraphVisualisation";

export default {
  title: "Components/GraphVisualisation",
  component: GraphVisualisation,
  argTypes: {},
} as ComponentMeta<typeof GraphVisualisation>;

const Template: ComponentStory<typeof GraphVisualisation> = (args) => {
  return <GraphVisualisation {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  data2: {
    nodes: [
      { id: "node0", size: 50 },
      { id: "node1", size: 30 },
      { id: "node2", size: 30 },
      { id: "node3", size: 30 },
      { id: "node4", size: 30 },
      { id: "node5", size: 30 },
      { id: "node6", size: 15 },
      { id: "node7", size: 15 },
      { id: "node8", size: 15 },
      { id: "node9", size: 15 },
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
    ],
  },
};
