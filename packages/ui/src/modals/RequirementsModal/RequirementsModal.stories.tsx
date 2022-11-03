import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockCompanyData } from "./mockData";
import { RequirementsModal } from "./RequirementsModal";

export default {
  title: "Modals/RequirementsModal",
  component: RequirementsModal,
  argTypes: {},
} as ComponentMeta<typeof RequirementsModal>;

const Template: ComponentStory<typeof RequirementsModal> = (args) => (
  <RequirementsModal {...args} />
);

const rangeNumbers: number[] = [];

for (let i = 0; i < 1000; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 500) + 1);
}

export const Default = Template.bind({});
Default.args = {
  openModal: true,
};
