import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RawDataGraph } from "./RawDataGraph";

export default {
  title: "Components/RawDataGraph",
  component: RawDataGraph,
  argTypes: {},
} as ComponentMeta<typeof RawDataGraph>;

const Template: ComponentStory<typeof RawDataGraph> = (args) => {
  return <RawDataGraph {...args} />;
};

const rawDataPersonProject: any = {
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
  ],
  edges: [],
};

export const Default = Template.bind({});
Default.args = {
  rawData: rawDataPersonProject,
};
