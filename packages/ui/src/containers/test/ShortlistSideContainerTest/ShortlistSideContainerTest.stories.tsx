import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShortlistSideContainerTest } from "./ShortlistSideContainerTest";

export default {
  title: "Containers/ShortlistSideContainerTest",
  component: ShortlistSideContainerTest,
  argTypes: {},
} as ComponentMeta<typeof ShortlistSideContainerTest>;

const Template: ComponentStory<typeof ShortlistSideContainerTest> = (args) => (
  <ShortlistSideContainerTest {...args} />
);

export const Default = Template.bind({});
Default.args = {
  matchingMembers: [],
};
