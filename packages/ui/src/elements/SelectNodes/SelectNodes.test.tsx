import { MockedProvider } from "@apollo/client/testing";
import { FIND_NODES } from "@eden/package-graphql";
import { render } from "@testing-library/react";

import { SelectNodes } from ".";
const mocks = [
  {
    request: {
      query: FIND_NODES,
      variable: {
        fields: { node: "expertise" },
      },
    },
    result: {
      data: {
        findNodes: [
          {
            _id: "637a912ab8953f12f501e0b8",
            name: "Design",
            node: "expertise",
            selected: null,
            subNodes: [
              {
                _id: "637a9133b8953f12f501e0d3",
                name: "UX/UI",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0b8",
                    name: "Design",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9134b8953f12f501e0f7",
                name: "Graphic Design",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0b8",
                    name: "Design",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9135b8953f12f501e115",
                name: "Web Design",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0b8",
                    name: "Design",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9136b8953f12f501e136",
                name: "Game Design",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0b8",
                    name: "Design",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9137b8953f12f501e156",
                name: "Animation",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0b8",
                    name: "Design",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9138b8953f12f501e16e",
                name: "General Design support from A-Z",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0b8",
                    name: "Design",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9139b8953f12f501e17f",
                name: "NFT Design",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0b8",
                    name: "Design",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a913ab8953f12f501e190",
                name: "Brand Design",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0b8",
                    name: "Design",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
            ],
            __typename: "Node",
          },
          {
            _id: "637a912ab8953f12f501e0bb",
            name: "Frontend Developer",
            node: "expertise",
            selected: null,
            subNodes: [
              {
                _id: "637a9133b8953f12f501e0d6",
                name: "UI Implementation",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0bb",
                    name: "Frontend Developer",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9134b8953f12f501e0f4",
                name: "Frontend Architecture",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0bb",
                    name: "Frontend Developer",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9135b8953f12f501e118",
                name: "General Frontend Support",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0bb",
                    name: "Frontend Developer",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9136b8953f12f501e139",
                name: "Web Development",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0bb",
                    name: "Frontend Developer",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
              {
                _id: "637a9137b8953f12f501e159",
                name: "App Development",
                node: "sub_expertise",
                selected: null,
                aboveNodes: [
                  {
                    _id: "637a912ab8953f12f501e0bb",
                    name: "Frontend Developer",
                    node: "expertise",
                    __typename: "Node",
                  },
                ],
                __typename: "Node",
              },
            ],
            __typename: "Node",
          },
        ],
      },
    },
  },
];

describe("SelectNodes", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SelectNodes nodeType={"expertise"} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
