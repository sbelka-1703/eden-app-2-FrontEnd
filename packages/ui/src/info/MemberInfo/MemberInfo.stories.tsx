import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberInfo } from "./MemberInfo";

export default {
  title: "Info/MemberInfo",
  component: MemberInfo,
  argTypes: {},
} as ComponentMeta<typeof MemberInfo>;

const Template: ComponentStory<typeof MemberInfo> = (args) => (
  <MemberInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  percentage: 83,
};
