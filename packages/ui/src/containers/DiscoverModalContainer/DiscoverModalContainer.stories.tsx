import { DiscoverProvider } from "@eden/package-context";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DiscoverModalContainer } from "./DiscoverModalContainer";

export default {
  title: "Containers/DiscoverModalContainer",
  component: DiscoverModalContainer,
  argTypes: {},
} as ComponentMeta<typeof DiscoverModalContainer>;

const Template: ComponentStory<typeof DiscoverModalContainer> = (args) => {
  return (
    <DiscoverProvider>
      <DiscoverModalContainer {...args} />
    </DiscoverProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
