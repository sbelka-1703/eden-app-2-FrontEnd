import {
  getMatchProjectRolesTypeMockArray,
  getProject,
} from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { OpenPositions } from "./OpenPositions";

export default {
  title: "Components/OpenPositions",
  component: OpenPositions,
  argTypes: {},
} as ComponentMeta<typeof OpenPositions>;

const Template: ComponentStory<typeof OpenPositions> = (args) => {
  return <OpenPositions {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  matchPercentage: 84,
  projectRoles: getMatchProjectRolesTypeMockArray(8),
};
