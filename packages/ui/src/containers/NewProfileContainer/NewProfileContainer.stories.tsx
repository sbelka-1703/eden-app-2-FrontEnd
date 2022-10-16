import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NewProfileContainer } from "./NewProfileContainer";

export default {
  title: "Containers/NewProfileContainer",
  component: NewProfileContainer,
  argTypes: {},
} as ComponentMeta<typeof NewProfileContainer>;

const Template: ComponentStory<typeof NewProfileContainer> = () => (
  <NewProfileContainer />
);

export const Default = Template.bind({});
