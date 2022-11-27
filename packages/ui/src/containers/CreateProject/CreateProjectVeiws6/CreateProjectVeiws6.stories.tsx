import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectVeiws6 } from "./CreateProjectVeiws6";

export default {
  title: "Containers/CreateProjectVeiws6",
  component: CreateProjectVeiws6,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectVeiws6>;

const Template: ComponentStory<typeof CreateProjectVeiws6> = (args) => (
  <CreateProjectVeiws6 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onBack: () => null,
  onNext: () => null,
  onLaunch: () => null,
  onNewPosition: () => null,
};
