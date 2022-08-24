import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TeamAttributeChart } from "./TeamAttributeChart";

export default {
  title: "Components/TeamAttributeChart",
  component: TeamAttributeChart,
  argTypes: {},
} as ComponentMeta<typeof TeamAttributeChart>;

const Template: ComponentStory<typeof TeamAttributeChart> = (args) => (
  <TeamAttributeChart {...args} />
);

export const Default = Template.bind({});
Default.args = {};
