import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberInfoWithDynamicGraph } from "./MemberInfoWithDynamicGraph";

export default {
  title: "Info/MemberInfoWithDynamicGraph",
  component: MemberInfoWithDynamicGraph,
  argTypes: {},
} as ComponentMeta<typeof MemberInfoWithDynamicGraph>;

const Template: ComponentStory<typeof MemberInfoWithDynamicGraph> = (args) => {
  return <MemberInfoWithDynamicGraph {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  percentage: 83,
};
