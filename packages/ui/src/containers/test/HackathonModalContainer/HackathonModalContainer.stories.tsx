HackathonModalContainer;
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { HackathonModalContainer } from "./HackathonModalContainer";

export default {
  title: "Containers/HackathonModalContainer",
  component: HackathonModalContainer,
  argTypes: {},
} as ComponentMeta<typeof HackathonModalContainer>;

const Template: ComponentStory<typeof HackathonModalContainer> = (args) => (
  <HackathonModalContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
