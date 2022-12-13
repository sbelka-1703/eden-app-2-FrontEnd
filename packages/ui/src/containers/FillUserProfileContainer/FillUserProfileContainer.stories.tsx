import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FillUserProfileContainer } from "./FillUserProfileContainer";

export default {
  title: "Containers/FillUserProfileContainer",
  component: FillUserProfileContainer,
  argTypes: {},
} as ComponentMeta<typeof FillUserProfileContainer>;

const Template: ComponentStory<typeof FillUserProfileContainer> = (args) => (
  <FillUserProfileContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  setState: () => {},
};
