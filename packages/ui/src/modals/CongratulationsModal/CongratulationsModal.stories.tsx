import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CongratulationsModal } from "./CongratulationsModal";

export default {
  title: "Modals/CongratulationsModal",
  component: CongratulationsModal,
  argTypes: {},
} as ComponentMeta<typeof CongratulationsModal>;

const Template: ComponentStory<typeof CongratulationsModal> = (args) => (
  <CongratulationsModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
};
