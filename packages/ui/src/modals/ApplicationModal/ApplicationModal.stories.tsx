import {
  Maybe,
  PhaseType,
  ProjectMemberType,
} from "@eden/package-graphql/generated";
import { getProject, getRoleTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ApplicationModal } from "./ApplicationModal";

export default {
  title: "Modals/ApplicationModal",
  component: ApplicationModal,
  argTypes: {},
} as ComponentMeta<typeof ApplicationModal>;

const Template: ComponentStory<typeof ApplicationModal> = (args) => (
  <ApplicationModal {...args} />
);

const project: Maybe<ProjectMemberType> = {
  info: getProject(),
  phase: "shortlisted" as Maybe<PhaseType>,
  role: getRoleTypeMock(),
};

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
  project: project,
};
