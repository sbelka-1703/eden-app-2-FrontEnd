import { render } from "../../../utils/jest-apollo";
import { AdminLayout } from "./";
jest.mock("next/router", () => require("next-router-mock"));

describe("AppPublicLayout", () => {
  it("renders without throwing", () => {
    const { container } = render(<AdminLayout>children here</AdminLayout>);

    expect(container).toBeInTheDocument();
  });
});
