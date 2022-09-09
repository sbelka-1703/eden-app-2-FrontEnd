import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MyProjectContainer } from "./MyProjectContainer";

export default {
  title: "Containers/MyProjectContainer",
  component: MyProjectContainer,
  argTypes: {},
} as ComponentMeta<typeof MyProjectContainer>;

const Template: ComponentStory<typeof MyProjectContainer> = (args) => (
  <MyProjectContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
