import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews6 } from "./CreateProjectViews6";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViews6",
  component: CreateProjectViews6,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews6>;

const Template: ComponentStory<typeof CreateProjectViews6> = (args) => (
  <CreateProjectViews6 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onBack: () => null,
  onLaunch: () => null,
  onNewPosition: () => null,
};
