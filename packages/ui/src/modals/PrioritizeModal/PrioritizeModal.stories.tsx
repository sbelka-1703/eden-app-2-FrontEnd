import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PrioritizeModal } from "./PrioritizeModal";

export default {
  title: "Modals/PrioritizeModal",
  component: PrioritizeModal,
  argTypes: {},
} as ComponentMeta<typeof PrioritizeModal>;

const Template: ComponentStory<typeof PrioritizeModal> = (args) => (
  <PrioritizeModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  onClose: () => null,
  onSubmit: (data) => {
    console.log(data);
  },
};
