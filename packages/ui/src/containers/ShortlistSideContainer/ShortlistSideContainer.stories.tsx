import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShortlistSideContainer } from "./ShortlistSideContainer";

export default {
  title: "Containers/ShortlistSideContainer",
  component: ShortlistSideContainer,
  argTypes: {},
} as ComponentMeta<typeof ShortlistSideContainer>;

const Template: ComponentStory<typeof ShortlistSideContainer> = (args) => (
  <ShortlistSideContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
