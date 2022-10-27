/* eslint-disable camelcase */
import { findProjects_RecommendedToUserMock } from "@eden/package-mock";
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
  Array.from({ length: total }, () => findProjects_RecommendedToUserMock);

export const Default = Template.bind({});
Default.args = {
  projects: getProjectArray(7),
};
