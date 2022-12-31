import { ComponentMeta, ComponentStory } from "@storybook/react";

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
  onClose: () => null,
  onSubmit: (data) => {
    console.log(data);
  },
  welcomeMessage: "Welcome to the Select Nodes Modal",
  title: "Select Nodes",
  subTitle: "Select the nodes you want to add",
};
