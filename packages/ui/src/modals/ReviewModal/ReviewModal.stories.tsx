import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockData } from "./MockData";
import { ReviewModal } from "./ReviewModal";

export default {
  title: "Modals/ReviewModal",
  component: ReviewModal,
  argTypes: {},
} as ComponentMeta<typeof ReviewModal>;

const Template: ComponentStory<typeof ReviewModal> = (args) => (
  <ReviewModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: mockData,
  openModal: true,
  onClose: () => null,
};
