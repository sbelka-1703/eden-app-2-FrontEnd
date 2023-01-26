import { findProjectsRecommendedToUserMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RecommendedList } from "./RecommendedList";

export default {
  title: "Archive/Lists/RecommendedList",
  component: RecommendedList,
  argTypes: {},
} as ComponentMeta<typeof RecommendedList>;

const Template: ComponentStory<typeof RecommendedList> = (args) => (
  <RecommendedList {...args} />
);

const getProjectArray = (total: number) =>
  Array.from({ length: total }, () => findProjectsRecommendedToUserMock);

export const Default = Template.bind({});
Default.args = {
  projects: getProjectArray(7),
};
