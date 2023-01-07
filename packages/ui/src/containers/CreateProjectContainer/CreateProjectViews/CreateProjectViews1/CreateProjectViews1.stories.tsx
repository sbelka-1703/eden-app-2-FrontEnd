import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews1 } from "./CreateProjectViews1";

export default {
  title: "Containers/CreateProjectContainer/CreateProjectViews1",
  component: CreateProjectViews1,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews1>;

const Template: ComponentStory<typeof CreateProjectViews1> = (args) => (
  <CreateProjectViews1 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onBack: () => null,
  onNext: (data) => console.info(data),
};
