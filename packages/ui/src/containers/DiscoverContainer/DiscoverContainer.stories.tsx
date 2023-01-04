import { DiscoverProvider } from "@eden/package-context";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { DiscoverContainer } from "./DiscoverContainer";

export default {
  title: "Containers/DiscoverContainer",
  component: DiscoverContainer,
  argTypes: {},
} as ComponentMeta<typeof DiscoverContainer>;

const Template: ComponentStory<typeof DiscoverContainer> = (args) => {
  return (
    <DiscoverProvider>
      <DiscoverContainer {...args} />
    </DiscoverProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
