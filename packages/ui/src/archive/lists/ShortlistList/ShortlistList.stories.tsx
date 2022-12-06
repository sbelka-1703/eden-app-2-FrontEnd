import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShortlistList } from "./ShortlistList";

export default {
  title: "Lists/ShortlistList",
  component: ShortlistList,
  argTypes: {},
} as ComponentMeta<typeof ShortlistList>;

const Template: ComponentStory<typeof ShortlistList> = (args) => (
  <div className={``}>
    <ShortlistList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
};
