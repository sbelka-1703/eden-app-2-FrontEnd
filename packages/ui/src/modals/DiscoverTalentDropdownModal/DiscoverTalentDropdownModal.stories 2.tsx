import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DiscoverTalentDropdownModal } from "./DiscoverTalentDropdownModal";
import mockData from "./mockData";

export default {
  title: "Modals/HackathonTalentDropdownModal",
  component: DiscoverTalentDropdownModal,
  argTypes: {},
} as ComponentMeta<typeof DiscoverTalentDropdownModal>;

const Template: ComponentStory<typeof DiscoverTalentDropdownModal> = (args) => (
  <DiscoverTalentDropdownModal {...args} />
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
