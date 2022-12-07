import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectChampionList } from "./ProjectChampionList";

export default {
  title: "Lists/ProjectChampionList",
  component: ProjectChampionList,
  argTypes: {},
} as ComponentMeta<typeof ProjectChampionList>;

const Template: ComponentStory<typeof ProjectChampionList> = () => {
  return (
    <div className="bg-gray-300 p-6">
      <ProjectChampionList />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
