import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShortlistMemberContainer } from "./ShortlistMemberContainer";

export default {
  title: "Archive/Containers/ShortlistMemberContainer",
  component: ShortlistMemberContainer,
  argTypes: {},
} as ComponentMeta<typeof ShortlistMemberContainer>;

const Template: ComponentStory<typeof ShortlistMemberContainer> = (args) => (
  <ShortlistMemberContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  matchingMembers: [],
};
