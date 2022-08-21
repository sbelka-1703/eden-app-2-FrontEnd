import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BioComponent } from "./BioComponent";

export default {
  title: "Components/BioComponent",
  component: BioComponent,
  argTypes: {},
} as ComponentMeta<typeof BioComponent>;

const Template: ComponentStory<typeof BioComponent> = (args) => (
  <BioComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Short Bio",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  isEditable: true,
};
