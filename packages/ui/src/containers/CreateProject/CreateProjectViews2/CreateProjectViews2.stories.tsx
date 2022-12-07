import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectViews2 } from "./CreateProjectViews2";

export default {
  title: "Containers/CreateProject/CreateProjectViews2",
  component: CreateProjectViews2,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectViews2>;

const Template: ComponentStory<typeof CreateProjectViews2> = (args) => (
  <CreateProjectViews2 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onBack: () => null,
  onNext: (data) => console.info(data),
};
