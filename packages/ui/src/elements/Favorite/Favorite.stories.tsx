import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Favorite } from "./Favorite";

export default {
  title: "Elements/Favorite",
  component: Favorite,
  argTypes: {},
} as ComponentMeta<typeof Favorite>;

const Template: ComponentStory<typeof Favorite> = (args) => (
  <Favorite {...args} />
);

export const Default = Template.bind({});
Default.args = {
  favorite: true,
};
