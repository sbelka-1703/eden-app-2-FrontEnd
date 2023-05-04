import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CandidateInfo } from "./CandidateInfo";

export default {
  title: "Info/CandidateInfo",
  component: CandidateInfo,
  argTypes: {},
} as ComponentMeta<typeof CandidateInfo>;

const Template: ComponentStory<typeof CandidateInfo> = (args) => {
  return <CandidateInfo {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
  percentage: 83,
};
