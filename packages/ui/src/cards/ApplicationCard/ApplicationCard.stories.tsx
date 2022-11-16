import {
  Maybe,
  PhaseType,
  ProjectMemberType,
} from "@eden/package-graphql/generated";
import { getProject, getRoleTypeMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { ApplicationCard } from "./ApplicationCard";

export default {
  title: "Cards/ApplicationCard",
  component: ApplicationCard,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof ApplicationCard>;

const Template: ComponentStory<typeof ApplicationCard> = (args) => {
  return (
    <div className="p-6">
      <div className="md:w-2/6">
        <ApplicationCard {...args} />
      </div>
    </div>
  );
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
