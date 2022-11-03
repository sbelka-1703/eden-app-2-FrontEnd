import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FindTalentDropdownModal } from "./FindTalentDropdownModal";
import mockData from "./mockData";

export default {
  title: "Modals/FindTalentDropdownModal",
  component: FindTalentDropdownModal,
  argTypes: {},
} as ComponentMeta<typeof FindTalentDropdownModal>;

const Template: ComponentStory<typeof FindTalentDropdownModal> = (args) => (
  <FindTalentDropdownModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  mockData: mockData,
  onClose: () => null,
  onSubmit: (data) => {
    console.log(data);
  },
};
