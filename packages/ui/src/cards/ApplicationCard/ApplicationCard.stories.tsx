import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { ApplicationCard } from "./ApplicationCard";

export default {
  title: "Cards/ApplicationCard",
  component: ApplicationCard,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof ApplicationCard>;

const Template: ComponentStory<typeof ApplicationCard> = (args) => {
  return (
    <div className="p-6">
      <div className="w-2/6">
        <ApplicationCard {...args} />
      </div>
    </div>
  );
};

const project = getProject();

export const Default = Template.bind({});
Default.args = {
  project,
  role: project.role?.length ? project.role[0] : {},
};
