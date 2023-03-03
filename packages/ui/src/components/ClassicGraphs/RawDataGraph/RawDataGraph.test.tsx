import { MockedProvider } from "@apollo/client/testing";
// import { getMember } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { RawDataGraph } from ".";

const rawDataPersonProject: any = {
  nodes: [
    {
      id: "milo",
      size: 80,
      x: 5,
      y: 5,
      label: "milo",

      // ----------- Shwow Avatar User ---------
      type: "image",
      img: "https://cdn.discordapp.com/avatars/961730944170090516/e5844ca759a74e995027a0e50c5cb1bf.png",
      clipCfg: {
        show: true,
        type: "circle",
        r: 25,
      },
      style: {
        height: 50,
        width: 50,
      },
      // ----------- Shwow Avatar User ---------
    },
  ],
  edges: [],
};

describe("SendMessageToUserModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <RawDataGraph rawData={rawDataPersonProject} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
