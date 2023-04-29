import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberProjectGraph } from "./MemberProjectGraph";

export default {
  title: "Components/MemberProjectGraph",
  component: MemberProjectGraph,
  argTypes: {},
} as ComponentMeta<typeof MemberProjectGraph>;

const Template: ComponentStory<typeof MemberProjectGraph> = (args) => {
  return <MemberProjectGraph {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  memberId: getMember()._id!,
  projectID: "63ebca723f7197ebd2adbd21",
};
