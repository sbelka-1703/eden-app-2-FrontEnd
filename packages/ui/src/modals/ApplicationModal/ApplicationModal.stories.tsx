import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ApplicationModal } from "./ApplicationModal";

const Project = getProject();

export default {
  title: "Modals/ApplicationModal",
  component: ApplicationModal,
  argTypes: {},
} as ComponentMeta<typeof ApplicationModal>;

const Template: ComponentStory<typeof ApplicationModal> = (args) => (
  <ApplicationModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
  Project: Project,
  Role: {
    title: "Scrum Master",
    keyRosponsibilities: "2+ year experience as Scrum Master",
    hoursPerWeek: 10,
    budget: {
      perMonth: "400",
    },
  },
  ApplicationProgress: {
    reviewed: false,
    applied: true,
    assesment: false,
    induction: false,
    interview: false,
    onboarding: false,
  },
};
