import { ComponentMeta, ComponentStory } from "@storybook/react";

import mockData from "./mockData";
import { SelectNodesModal } from "./SelectNodesModal";

export default {
  title: "Modals/SelectNodesModal",
  component: SelectNodesModal,
  argTypes: {},
} as ComponentMeta<typeof SelectNodesModal>;

const Template: ComponentStory<typeof SelectNodesModal> = (args) => (
  <SelectNodesModal {...args} />
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
