import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { CreateProjectViews2GPT } from ".";
// const mocks = [
//   {
//     request: {
//       query: MESSAGE_TO_GPT,
//       variables: {
//         fields: {
//           message: "example text",
//           category: "skill",
//           prompt: "this is",
//         },
//       },
//     },
//     result: {
//       data: {
//         messageToGPT: {
//           message: "example response",
//         },
//       },
//     },
//   },
// ];

describe("CreateProjectViews2GPT", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <CreateProjectViews2GPT
          onBack={function (): void {
            throw new Error("Function not implemented.");
          }}
          battery={2}
          onNext={function (): void {
            throw new Error("Function not implemented.");
          }}
          setProject={function (data): void {
            console.info({ data });
          }}
        />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
