import { render } from "../../../../utils/jest-apollo";
import { UserExperienceCard } from "./";

describe("UserExperienceCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <UserExperienceCard
        roles={[]}
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (data): void {
          console.log(data);
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
