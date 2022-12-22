import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DiscoverTalentDropdownModal } from "./DiscoverTalentDropdownModal";

export default {
  title: "Modals/DiscoverTalentDropdownModal",
  component: DiscoverTalentDropdownModal,
  argTypes: {},
} as ComponentMeta<typeof DiscoverTalentDropdownModal>;

const Template: ComponentStory<typeof DiscoverTalentDropdownModal> = (args) => (
  <DiscoverTalentDropdownModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  nodeType: "expertise",
  title: `Who are you looking for?`,
  subTitle: `Select what you want them to help you with.`,
  matchType: "People",
  batteryPercentage: 50,
  onClose: () => null,
  onSubmit: (data) => {
    console.log(data);
  },
};
