import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import { DateCardProps } from "../../elements/Date";

import { OpenOrClosed, ProjectStatusCard } from "./";

const kickOffDate: DateCardProps = {
  type: "secondary",
  dayOfMonth: 22,
  month: "AUG",
  year: 22,
};

const appliedDate: DateCardProps = {
  type: "secondary",
  dayOfMonth: 22,
  month: "AUG",
  year: 22,
};

const progressSteps = [
  {
    name: "Applied",
    completed: true,
  },
  {
    name: "Application Reviewed",
    completed: true,
  },
  {
    name: "Application Shortlisted",
    completed: false,
  },
  {
    name: "Application Shortlisted",
    completed: false,
  },
];

describe("ProjectStatusCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ProjectStatusCard
        projectImg={faker.internet.avatar()}
        projectName={faker.company.name()}
        roleName="BackEnd Developer"
        status={OpenOrClosed.OPEN}
        appliedDateData={appliedDate}
        kickoffDateData={kickOffDate}
        progressSteps={progressSteps}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
