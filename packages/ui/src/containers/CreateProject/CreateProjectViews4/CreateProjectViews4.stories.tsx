import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews4 } from "./CreateProjectViews4";

export default {
  title: "Containers/CreateProject/CreateProjectViews4",
  component: CreateProjectViews4,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews4>;

const Template: ComponentStory<typeof CreateProjectViews4> = (args) => (
  <CreateProjectViews4 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onBack: () => null,
  onNext: (data) => console.info(data),
};
