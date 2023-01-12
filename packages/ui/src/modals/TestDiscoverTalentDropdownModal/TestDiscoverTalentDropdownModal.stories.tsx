import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TestDiscoverTalentDropdownModal } from "./TestDiscoverTalentDropdownModal";

export default {
  title: "Modals/TestDiscoverTalentDropdownModal",
  component: TestDiscoverTalentDropdownModal,
  argTypes: {},
} as ComponentMeta<typeof TestDiscoverTalentDropdownModal>;

const Template: ComponentStory<typeof TestDiscoverTalentDropdownModal> = (
  args
) => <TestDiscoverTalentDropdownModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  nodeType: "expertise",
  title: `Who are you looking for?`,
  subTitle: `Select what you want them to help you with.`,
  matchType: "People",
  batteryPercentage: 50,
  onPrev: () => null,
  onNext: (data) => {
    console.log(data);
  },
};
