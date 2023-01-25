import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PreferencesModal } from "./PreferencesModal";

export default {
  title: "Modals/PreferencesModal",
  component: PreferencesModal,
  argTypes: {},
} as ComponentMeta<typeof PreferencesModal>;

const Template: ComponentStory<typeof PreferencesModal> = (args) => (
  <PreferencesModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  numMatches: 29,
  battery: false,
  batteryPercentage: 75,
  openModal: true,
  onClose: () => null,
  onSubmit: (data) => {
    console.log(data);
  },
};
