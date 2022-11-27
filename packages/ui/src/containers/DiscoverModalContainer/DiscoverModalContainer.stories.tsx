import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DiscoverModalContainer } from "./DiscoverModalContainer";

export default {
  title: "Containers/DiscoverModalContainer",
  component: DiscoverModalContainer,
  argTypes: {},
} as ComponentMeta<typeof DiscoverModalContainer>;

const Template: ComponentStory<typeof DiscoverModalContainer> = (args) => (
  <DiscoverModalContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
