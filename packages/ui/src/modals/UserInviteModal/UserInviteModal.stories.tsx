import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserInviteModal } from "./UserInviteModal";

export default {
  title: "Modals/UserInviteModal",
  component: UserInviteModal,
  argTypes: {},
} as ComponentMeta<typeof UserInviteModal>;

const Template: ComponentStory<typeof UserInviteModal> = (args) => (
  <UserInviteModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  member: getMember(),
  onClose: () => null,
};
