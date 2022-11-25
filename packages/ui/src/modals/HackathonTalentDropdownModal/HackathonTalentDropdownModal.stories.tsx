import { ComponentMeta, ComponentStory } from "@storybook/react";

import { HackathonTalentDropdownModal } from "./HackathonTalentDropdownModal";
import mockData from "./mockData";

export default {
  title: "Modals/HackathonTalentDropdownModal",
  component: HackathonTalentDropdownModal,
  argTypes: {},
} as ComponentMeta<typeof HackathonTalentDropdownModal>;

const Template: ComponentStory<typeof HackathonTalentDropdownModal> = (
  args
) => <HackathonTalentDropdownModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  mockData: mockData,
  onClose: () => null,
  onSubmit: (data) => {
    console.log(data);
  },
};
