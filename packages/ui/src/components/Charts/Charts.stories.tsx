import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Charts } from "./Charts";

export default {
  title: "Components/Charts",
  component: Charts,
  argTypes: {},
} as ComponentMeta<typeof Charts>;

const Template: ComponentStory<typeof Charts> = (args) => <Charts {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      name: "Page A",
      percentage: 2400,
    },
    {
      name: "Page B",
      percentage: 1398,
    },
    {
      name: "Page C",
      percentage: 9800,
    },
    {
      name: "Page D",
      percentage: 3908,
    },
    {
      name: "Page E",
      percentage: 4800,
    },
    {
      name: "Page F",
      percentage: 3800,
    },
    {
      name: "Page G",
      percentage: 4300,
    },
  ],
  color: "#FF7E5C",
  title: "Skill Match Percentage",
  // width: 100,
  // height: 40,
};
