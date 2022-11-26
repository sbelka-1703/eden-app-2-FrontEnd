import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectContainer } from "./CreateProjectContainer";

export default {
  title: "Containers/CreateProjectContainer",
  component: CreateProjectContainer,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectContainer>;

const Template: ComponentStory<typeof CreateProjectContainer> = (args) => (
  <CreateProjectContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
