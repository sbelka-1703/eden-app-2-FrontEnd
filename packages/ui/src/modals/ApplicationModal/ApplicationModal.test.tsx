import {
  Maybe,
  PhaseType,
  ProjectMemberType,
} from "@eden/package-graphql/generated";
import { getProject, getRoleTypeMock } from "@eden/package-mock";

import { render } from "../../../utils/jest-apollo";
import { ApplicationModal } from ".";

describe("ApplicationModal", () => {
  const project: Maybe<ProjectMemberType> = {
    info: getProject(),
    phase: "shortlisted" as Maybe<PhaseType>,
    role: getRoleTypeMock(),
  };

  it("renders without throwing", () => {
    const { container } = render(
      <ApplicationModal isModalOpen={true} project={project} />
    );

    expect(container).toBeInTheDocument();
  });
});
