import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews3 } from "./CreateProjectViews3";

export default {
  title: "Containers/CreateProjectViews3",
  component: CreateProjectViews3,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews3>;

const Template: ComponentStory<typeof CreateProjectViews3> = (args) => (
  <CreateProjectViews3 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onBack: () => null,
  onSkip: () => null,
  onNext: (data) => console.info(data),
};
