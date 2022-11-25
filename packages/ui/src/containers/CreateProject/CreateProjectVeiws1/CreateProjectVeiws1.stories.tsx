import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectVeiws1 } from "./CreateProjectVeiws1";

export default {
  title: "Containers/CreateProjectVeiws1",
  component: CreateProjectVeiws1,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectVeiws1>;

const Template: ComponentStory<typeof CreateProjectVeiws1> = (args) => (
  <CreateProjectVeiws1 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onBack: () => null,
  onNext: (data) => console.info(data),
};
