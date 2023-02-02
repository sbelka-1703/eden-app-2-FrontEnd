import { Maybe, NodesType } from "@eden/package-graphql/generated";
import { Badge, TextLabel1 } from "@eden/package-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useState } from "react";

import { trimParentheses } from "../../../utils/trim-parentheses";

export interface INodeListProps {
  nodes?: Maybe<NodesType>[];
  label?: string;
  colorRGB?: string;
  closeButton?: boolean;
  overflowNumber?: number;
  // eslint-disable-next-line no-unused-vars
  handleDeleteNode?: (val: Maybe<NodesType> | undefined) => void;
}
export const NodeList = ({
  nodes,
  label,
  colorRGB,
  closeButton = false,
  overflowNumber = 6,
  handleDeleteNode,
}: INodeListProps) => {
  const [seeMore, setSeeMore] = useState(false);

  const badges = nodes?.map(
    (node: Maybe<NodesType> | undefined, index: number) => (
      <Badge
        key={index}
        text={trimParentheses(node?.nodeData?.name || "")}
        colorRGB={colorRGB}
        className={`font-Inter text-sm`}
        closeButton={closeButton}
        onClose={() => {
          if (handleDeleteNode) handleDeleteNode(node);
        }}
        cutText={16}
      />
    )
  );

  return (
    <div>
      <TextLabel1>{label}</TextLabel1>
      <div className={`my-2`}>
        {badges?.slice(0, overflowNumber)}
        {seeMore ? badges?.slice(overflowNumber) : null}
      </div>
      {badges && badges.length > overflowNumber && (
        <p
          className="cursor-pointer text-center text-sm"
          onClick={() => setSeeMore(!seeMore)}
        >
          {`see ${seeMore ? "less" : "more"}`}
          <span>
            {seeMore ? (
              <ChevronUpIcon width={16} className="ml-2 inline" />
            ) : (
              <ChevronDownIcon width={16} className="ml-2 inline" />
            )}
          </span>
        </p>
      )}
    </div>
  );
};
