import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SendMessageToUserModal } from "./SendMessageToUserModal";

export default {
  title: "Modals/SendMessageToUserModal",
  component: SendMessageToUserModal,
  argTypes: {},
} as ComponentMeta<typeof SendMessageToUserModal>;

const Template: ComponentStory<typeof SendMessageToUserModal> = (args) => {
  return <SendMessageToUserModal {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  member: getMember(),
  onSubmit: (message) => {
    console.log(message);
  },
};
