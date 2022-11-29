import { getGrantTemplateTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GrantsInfo } from "./GrantsInfo";

export default {
  title: "Info/GrantsInfo",
  component: GrantsInfo,
  argTypes: {},
} as ComponentMeta<typeof GrantsInfo>;

const Template: ComponentStory<typeof GrantsInfo> = (args) => (
  <GrantsInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  grant: getGrantTemplateTypeMock(),
};
