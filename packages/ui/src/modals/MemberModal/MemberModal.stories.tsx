import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemberModal } from "./MemberModal";

export default {
  title: "Modals/MemberModal",
  component: MemberModal,
  argTypes: {},
} as ComponentMeta<typeof MemberModal>;

const Template: ComponentStory<typeof MemberModal> = (args) => (
  <MemberModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  member: getMember(),
  percentage: 83,
  onClose: () => null,
};
