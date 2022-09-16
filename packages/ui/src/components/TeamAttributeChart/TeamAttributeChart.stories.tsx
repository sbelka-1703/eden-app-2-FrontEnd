import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockTeamData } from "./mockData";
import { TeamAttributeChart } from "./TeamAttributeChart";

export default {
  title: "Components/TeamAttributeChart",
  component: TeamAttributeChart,
  argTypes: {},
} as ComponentMeta<typeof TeamAttributeChart>;

const Template: ComponentStory<typeof TeamAttributeChart> = (args) => (
  <div className="m-auto max-w-2xl p-8">
    <TeamAttributeChart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  members: mockTeamData,
};
