import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Badge } from "./Badge";

export default {
  title: "Elements/Badge",
  component: Badge,
  argTypes: {},
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  colorRGB: "236, 240, 71",
  text: "Art",
};
