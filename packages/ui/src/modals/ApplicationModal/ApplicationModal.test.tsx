import { getProject } from "@eden/package-mock";

import { render } from "../../../utils/jest-apollo";
import { ApplicationModal } from ".";

describe("ApplicationModal", () => {
  const project = getProject();

  it("renders without throwing", () => {
    const { container } = render(
      <ApplicationModal
        isModalOpen={true}
        Project={project}
        Role={{
          title: "Scrum Master",
          keyRosponsibilities: "2+ year experience as Scrum Master",
          hoursPerWeek: 10,
          budget: {
            perMonth: "400",
          },
        }}
        ApplicationProgress={{
          reviewed: false,
          applied: true,
          assesment: false,
          induction: false,
          interview: false,
          onboarding: false,
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
