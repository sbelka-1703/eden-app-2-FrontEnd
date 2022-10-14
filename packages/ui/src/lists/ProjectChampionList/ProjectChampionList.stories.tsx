import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { ProjectChampionList } from "./ProjectChampionList";

export default {
  title: "Lists/ProjectChampionList",
  component: ProjectChampionList,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof ProjectChampionList>;

const Template: ComponentStory<typeof ProjectChampionList> = () => {
  return (
    <div className="bg-gray-300 p-6">
      <div className="w-2/5">
        <ProjectChampionList />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
