import { ComponentMeta, ComponentStory } from "@storybook/react";

import welcome from "./welcome.png";
import { WelcomeModal } from "./WelcomeModal";

export default {
  title: "Modals/WelcomeModal",
  component: WelcomeModal,
  argTypes: {},
} as ComponentMeta<typeof WelcomeModal>;

const Template: ComponentStory<typeof WelcomeModal> = (args) => (
  <WelcomeModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  image: welcome,
  profilePercentage: 20,
  canProjectsSee: true,
  canSeeProjects: true,
  openModal: true,
  onNext: () => null,
};
