import { Maybe, PhaseType } from "@eden/package-graphql/generated";

import { getProgressFrom } from "./ProjectStatusCard";

describe("getProgressFrom", () => {
  type TestCase = [
    phase: Maybe<PhaseType> | undefined,
    completedSteps: (
      | "Applied"
      | "Invited to Project"
      | "Application Reviewed"
      | "Application Accepted"
    )[]
  ];

  test.each<TestCase>([
    [undefined, []],
    [null, []],
    [PhaseType.Engaged, ["Applied"]],
    [PhaseType.Invited, ["Applied", "Invited to Project"]],
    [
      PhaseType.Shortlisted,
      ["Applied", "Invited to Project", "Application Reviewed"],
    ],
    [
      PhaseType.Committed,
      [
        "Applied",
        "Invited to Project",
        "Application Reviewed",
        "Application Accepted",
      ],
    ],
  ])("%s -> %O", (phase, completedSteps) => {
    const result = getProgressFrom(phase);

    for (const step of result) {
      if (step.completed) {
        // if completed, should be in the completed steps
        expect(completedSteps).toContain(step.name);
      } else {
        // if incomplete, should not be in the completed steps
        expect(completedSteps).not.toContain(step.name);
      }
    }
  });
});
