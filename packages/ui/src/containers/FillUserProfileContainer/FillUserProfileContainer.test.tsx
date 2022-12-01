import { SetStateAction } from "react";

import { STEPS } from "../../../utils";
import { render } from "../../../utils/jest-apollo";
import { FillUserProfileContainer } from ".";

describe("FillUserProfileContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <FillUserProfileContainer
        state={undefined}
        // eslint-disable-next-line no-unused-vars
        setState={function (value: any): void {
          throw new Error("Function not implemented.");
        }}
        // eslint-disable-next-line no-unused-vars
        setStep={function (value: SetStateAction<STEPS>): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
