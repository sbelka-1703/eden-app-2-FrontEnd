import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TabsSelector } from "./TabsSelector";

export default {
  title: "Selector/TabsSelector",
  component: TabsSelector,
  argTypes: {},
} as ComponentMeta<typeof TabsSelector>;

const Template: ComponentStory<typeof TabsSelector> = (args) => (
  <TabsSelector {...args} />
);

const tabs = ["General", "Background", "Endorsements"];

export const Default = Template.bind({});
Default.args = {
  tabs,
};
