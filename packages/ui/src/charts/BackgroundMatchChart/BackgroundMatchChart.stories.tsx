import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BackgroundMatchChart } from "./BackgroundMatchChart";
export default {
  title: "Charts/BackgroundMatchChart",
  component: BackgroundMatchChart,
  argTypes: {},
} as ComponentMeta<typeof BackgroundMatchChart>;

const Template: ComponentStory<typeof BackgroundMatchChart> = (args) => (
  <div className="max-w-xl">
    <BackgroundMatchChart {...args} />
  </div>
);

const exampleData = [
  {
    questionID: "1242",
    questionContent: "Experience",
    userPercentage: 75,
    averagePercentage: 55,
  },
  {
    questionID: "9521",
    questionContent: "Work from Home or Office",
    userPercentage: 35,
    averagePercentage: 45,
  },
  {
    questionID: "2222",
    questionContent: "Skill",
    userPercentage: 85,
    averagePercentage: 75,
  },
  {
    questionID: "1211",
    questionContent: "Industry experience",
    userPercentage: 90,
    averagePercentage: 40,
  },
];

export const Default = Template.bind({});
Default.args = {
  memberName: "Melissa",
  backgroundMatchData: exampleData,
};
