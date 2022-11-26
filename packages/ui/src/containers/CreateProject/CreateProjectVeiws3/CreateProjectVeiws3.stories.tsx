import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectVeiws3 } from "./CreateProjectVeiws3";

export default {
  title: "Containers/CreateProjectVeiws3",
  component: CreateProjectVeiws3,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectVeiws3>;

const Template: ComponentStory<typeof CreateProjectVeiws3> = (args) => (
  <CreateProjectVeiws3 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onBack: () => null,
  onSkip: () => null,
  onNext: (data) => console.info(data),
};
