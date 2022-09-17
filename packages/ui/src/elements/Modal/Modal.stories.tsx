import { ComponentMeta, ComponentStory } from "@storybook/react";

import Modal from "./Modal";

export default {
  title: "Elements/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  open: false,
  title: "Modal Title",
  children: "Modal Content",
  closeOnEsc: true,
};

export const Open = Template.bind({});
Open.args = {
  open: true,
  title: "Modal title",
  children: "Modal content",
};
