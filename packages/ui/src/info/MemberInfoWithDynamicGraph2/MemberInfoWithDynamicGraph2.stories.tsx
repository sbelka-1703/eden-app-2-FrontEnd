import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberInfoWithDynamicGraph2 } from "./MemberInfoWithDynamicGraph2";

export default {
  title: "Info/MemberInfoWithDynamicGraph2",
  component: MemberInfoWithDynamicGraph2,
  argTypes: {},
} as ComponentMeta<typeof MemberInfoWithDynamicGraph2>;

const Template: ComponentStory<typeof MemberInfoWithDynamicGraph2> = (args) => {
  return <MemberInfoWithDynamicGraph2 {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  percentage: 83,
};
