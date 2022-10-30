import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProfileModal } from "./ProfileModal";

export default {
  title: "Modals/ProfileModal",
  component: ProfileModal,
  argTypes: {},
} as ComponentMeta<typeof ProfileModal>;

const Template: ComponentStory<typeof ProfileModal> = (args) => (
  <ProfileModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  member: getMember(),
  onClose: () => null,
  onInvite: () => null,
};
