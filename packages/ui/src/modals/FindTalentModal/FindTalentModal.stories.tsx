import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FindTalentModal } from "./FindTalentModal";

export default {
  title: "Modals/FindTalentModal",
  component: FindTalentModal,
  argTypes: {},
} as ComponentMeta<typeof FindTalentModal>;

const Template: ComponentStory<typeof FindTalentModal> = (args) => (
  <FindTalentModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  onClose: () => null,
  onSubmit: (data) => {
    console.log(data);
  },
};
