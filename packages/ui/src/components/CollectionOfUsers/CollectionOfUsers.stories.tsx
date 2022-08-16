import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CollectionOfUsers } from "./CollectionOfUsers";

export default {
  title: "Components/CollectionOfUsers",
  component: CollectionOfUsers,
  argTypes: {},
} as ComponentMeta<typeof CollectionOfUsers>;

const Template: ComponentStory<typeof CollectionOfUsers> = (args) => (
  <CollectionOfUsers {...args} />
);

export const Default = Template.bind({});
Default.args = {};
