import { ComponentMeta, ComponentStory } from "@storybook/react";

import { InviteContainer } from "./InviteContainer";

export default {
  title: "Archive/Containers/InviteContainer",
  component: InviteContainer,
  argTypes: {},
} as ComponentMeta<typeof InviteContainer>;

const Template: ComponentStory<typeof InviteContainer> = (args) => (
  <InviteContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
