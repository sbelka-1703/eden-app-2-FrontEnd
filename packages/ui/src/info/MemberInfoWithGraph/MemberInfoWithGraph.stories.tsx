import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberInfoWithGraph } from "./MemberInfoWithGraph";

export default {
  title: "Info/MemberInfoWithGraph",
  component: MemberInfoWithGraph,
  argTypes: {},
} as ComponentMeta<typeof MemberInfoWithGraph>;

const Template: ComponentStory<typeof MemberInfoWithGraph> = (args) => {
  return <MemberInfoWithGraph {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  percentage: 83,
};
