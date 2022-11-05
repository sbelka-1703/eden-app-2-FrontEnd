import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectEditSelectorCard } from "./ProjectEditSelectorCard";

export default {
  title: "Cards/Project/ProjectEditSelectorCard",
  component: ProjectEditSelectorCard,
  argTypes: {},
} as ComponentMeta<typeof ProjectEditSelectorCard>;

const Template: ComponentStory<typeof ProjectEditSelectorCard> = (args) => (
  <ProjectEditSelectorCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  handleSelectRole: () => {
    (val: any) => console.log("handleSelectRole", val);
  },
};
