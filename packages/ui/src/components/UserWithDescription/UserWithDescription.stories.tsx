import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserWithDescription } from "./UserWithDescription";

export default {
  title: "Components/UserWithDescription",
  component: UserWithDescription,
  argTypes: {},
} as ComponentMeta<typeof UserWithDescription>;

const Template: ComponentStory<typeof UserWithDescription> = (args) => (
  <UserWithDescription {...args} />
);

export const Default = Template.bind({});
Default.args = {};
