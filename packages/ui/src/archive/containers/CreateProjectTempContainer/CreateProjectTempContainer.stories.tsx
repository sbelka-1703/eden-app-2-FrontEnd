import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectTempContainer } from "./CreateProjectTempContainer";

export default {
  title: "Archive/Containers/CreateProjectTempContainer",
  component: CreateProjectTempContainer,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectTempContainer>;

const Template: ComponentStory<typeof CreateProjectTempContainer> = (args) => (
  <CreateProjectTempContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
