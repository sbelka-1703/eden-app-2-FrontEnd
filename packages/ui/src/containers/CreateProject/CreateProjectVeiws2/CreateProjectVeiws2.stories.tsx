import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateProjectVeiws2 } from "./CreateProjectVeiws2";

export default {
  title: "Containers/CreateProjectVeiws2",
  component: CreateProjectVeiws2,
  argTypes: {},
} as ComponentMeta<typeof CreateProjectVeiws2>;

const Template: ComponentStory<typeof CreateProjectVeiws2> = (args) => (
  <CreateProjectVeiws2 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onBack: () => null,
  onNext: (data) => console.info(data),
};
