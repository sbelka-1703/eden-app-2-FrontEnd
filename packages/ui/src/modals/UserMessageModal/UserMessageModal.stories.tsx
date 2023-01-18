import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserMessageModal } from "./UserMessageModal";

export default {
  title: "Modals/UserMessageModal",
  component: UserMessageModal,
  argTypes: {},
} as ComponentMeta<typeof UserMessageModal>;

const Template: ComponentStory<typeof UserMessageModal> = (args) => (
  <UserMessageModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  member: getMember(),
  // matchPercentage:
  onClose: () => null,
};
