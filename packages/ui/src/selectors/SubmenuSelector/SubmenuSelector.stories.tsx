import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { SubmenuSelector } from "./SubmenuSelector";

export default {
  title: "Components/SubmenuSelector",
  component: SubmenuSelector,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof SubmenuSelector>;

const Template: ComponentStory<typeof SubmenuSelector> = (args) => (
  <SubmenuSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Good Morning,",
};
