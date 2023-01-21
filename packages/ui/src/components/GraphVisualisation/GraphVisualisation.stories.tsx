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
};
