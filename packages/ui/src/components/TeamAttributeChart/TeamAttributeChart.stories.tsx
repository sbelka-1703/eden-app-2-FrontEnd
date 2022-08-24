import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockTeamData } from "./mockData";
import { TeamAttributeChart } from "./TeamAttributeChart";

export default {
  title: "Components/TeamAttributeChart",
  component: TeamAttributeChart,
  argTypes: {},
} as ComponentMeta<typeof TeamAttributeChart>;

const Template: ComponentStory<typeof TeamAttributeChart> = (args) => (
  <div className="py-8 px-32">
    <TeamAttributeChart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  members: mockTeamData,
};
