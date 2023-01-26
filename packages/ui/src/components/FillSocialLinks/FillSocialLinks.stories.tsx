import { getLinkTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FillSocialLinks } from "./FillSocialLinks";

export default {
  title: "Components/FillSocialLinks",
  component: FillSocialLinks,
  argTypes: {},
} as ComponentMeta<typeof FillSocialLinks>;

const Template: ComponentStory<typeof FillSocialLinks> = (args) => (
  <FillSocialLinks {...args} />
);

export const Default = Template.bind({});
Default.args = {
  links: getLinkTypeMock,
};
