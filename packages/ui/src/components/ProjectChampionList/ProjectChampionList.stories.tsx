import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { ProjectChampionList } from "./ProjectChampionList";

export default {
  title: "Components/ProjectChampionList",
  component: ProjectChampionList,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof ProjectChampionList>;

const Template: ComponentStory<typeof ProjectChampionList> = () => {
  return <ProjectChampionList />;
};

export const Default = Template.bind({});
Default.args = {};
