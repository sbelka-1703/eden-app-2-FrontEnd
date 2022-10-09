import { faker } from "@faker-js/faker";
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
  sender: "Milo",
  senderId: 3787,
  openModal: true,
  receiver: "MelonMusk",
  onSubmit: (message) => {
    console.log(message);
  },
  avatar: faker.internet.avatar(),
};
