import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NewProfileContainer } from "./NewProfileContainer";

const member = getMember();

export default {
  title: "Containers/NewProfileContainer",
  component: NewProfileContainer,
  argTypes: {},
} as ComponentMeta<typeof NewProfileContainer>;

const Template: ComponentStory<typeof NewProfileContainer> = () => (
  <NewProfileContainer user={member} />
);

export const Default = Template.bind({});
