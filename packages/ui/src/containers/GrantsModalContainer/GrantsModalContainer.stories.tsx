import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GrantsModalContainer } from "./GrantsModalContainer";

export default {
  title: "Containers/GrantsModalContainer",
  component: GrantsModalContainer,
  argTypes: {},
} as ComponentMeta<typeof GrantsModalContainer>;

const Template: ComponentStory<typeof GrantsModalContainer> = (args) => (
  <GrantsModalContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
