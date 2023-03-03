import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DynamicSearchGraph } from "./DynamicSearchGraph";

export default {
  title: "Components/DynamicSearchGraph",
  component: DynamicSearchGraph,
  argTypes: {},
} as ComponentMeta<typeof DynamicSearchGraph>;

const Template: ComponentStory<typeof DynamicSearchGraph> = (args) => {
  return <DynamicSearchGraph {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  nodesID: [""],
};
