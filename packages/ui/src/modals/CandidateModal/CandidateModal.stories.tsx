import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CandidateModal } from "./CandidateModal";

export default {
  title: "Modals/CandidateModal",
  component: CandidateModal,
  argTypes: {},
} as ComponentMeta<typeof CandidateModal>;

const Template: ComponentStory<typeof CandidateModal> = (args) => (
  <CandidateModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  member: getMember(),
  percentage: 83,
  onClose: () => null,
};
