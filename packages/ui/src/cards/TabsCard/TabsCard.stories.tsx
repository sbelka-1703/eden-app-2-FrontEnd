import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TabsCard } from "./TabsCard";

export default {
  title: "Cards/TabsCard",
  component: TabsCard,
  argTypes: {},
} as ComponentMeta<typeof TabsCard>;

const Template: ComponentStory<typeof TabsCard> = (args) => (
  <TabsCard {...args} />
);

const tabs = [
  {
    title: "General",
    fullTitle: "General",
  },
  {
    title: "Background",
    fullTitle: "Background",
  },
  {
    title: "Endorsements",
    fullTitle: "Endorsements",
  },
];

export const Default = Template.bind({});
Default.args = {
  tabs,
};
