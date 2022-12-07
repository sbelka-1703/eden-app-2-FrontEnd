import {
  Maybe,
  PhaseType,
  ProjectMemberType,
} from "@eden/package-graphql/generated";
import { getProject, getRoleTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ReviewCard } from "./ReviewCard";

export default {
  title: "Cards/ReviewCard",
  component: ReviewCard,
  argTypes: {},
} as ComponentMeta<typeof ReviewCard>;

const Template: ComponentStory<typeof ReviewCard> = (args) => {
  return <ReviewCard {...args} />;
};

// export type ProjectMemberType = {
//   __typename?: "projectMemberType";
//   champion?: Maybe<Scalars["Boolean"]>;
//   favorite?: Maybe<Scalars["Boolean"]>;
//   info?: Maybe<Project>;
//   phase?: Maybe<PhaseType>;
//   role?: Maybe<RoleType>;
// };

const project: Maybe<ProjectMemberType> = {
  info: getProject(),
  phase: "shortlisted" as Maybe<PhaseType>,
  role: getRoleTypeMock(),
};

export const Default = Template.bind({});
Default.args = {
  project,
};
