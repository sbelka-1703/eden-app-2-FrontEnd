// import { getProject } from "@eden/package-mock";
// import { DateCardProps } from "@eden/package-ui";
// import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

import { ProjectStatusCard } from "./";

// const appliedDate: DateCardProps = {
//   type: "secondary",
//   dayOfMonth: 22,
//   month: "AUG",
//   year: 22,
// };

// const progressSteps = [
//   {
//     name: "Applied",
//     completed: true,
//   },
//   {
//     name: "Application Reviewed",
//     completed: true,
//   },
//   {
//     name: "Application Shortlisted",
//     completed: false,
//   },
//   {
//     name: "Application Shortlisted",
//     completed: false,
//   },
// ];

describe("ProjectStatusCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ProjectStatusCard
      // project={getProject()}
      // projectImg={faker.internet.avatar()}
      // roleName="BackEnd Developer"
      // appliedDateData={appliedDate}
      // progressSteps={progressSteps}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
