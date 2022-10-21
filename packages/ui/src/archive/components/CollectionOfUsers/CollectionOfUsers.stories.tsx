import { getMemberArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CollectionOfUsers } from "./CollectionOfUsers";

export default {
  title: "Archive/Components/CollectionOfUsers",
  component: CollectionOfUsers,
  argTypes: {},
} as ComponentMeta<typeof CollectionOfUsers>;

const Template: ComponentStory<typeof CollectionOfUsers> = (args) => (
  <CollectionOfUsers {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "title here",
  members: getMemberArray(9),
};
