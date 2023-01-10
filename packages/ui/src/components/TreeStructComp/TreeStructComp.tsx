/* eslint-disable camelcase */
import "./style.css";

import { useEffect, useState } from "react";
export interface TreeStructCompProps {
  tree?: any;
  color?: any;
}
export const TreeStructComp: React.FC<TreeStructCompProps> = ({
  tree,
  color,
}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <ul className="tree">
        <div
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          <div
            className="mr-2 mb-1 inline-block cursor-default rounded-full px-4 py-2"
            style={{ background: `${color?.top}` }}
          >
            {tree?.node?.name}
          </div>
          <span>{tree?.node?.star ? "⭐️" : ""}</span>
        </div>
        <li>
          <ul>
            {tree?.middle?.map((middle: any, index: number) => (
              <MiddleTreeComp
                key={index}
                middle={middle}
                color={color}
                showAll={showAll}
                index={index}
              />
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
};

const MiddleTreeComp: React.FC<any> = ({ middle, color, showAll, index }) => {
  const [showMiddle, setShowMiddle] = useState(false);

  useEffect(() => {
    console.log("showAll", showAll);
    if (index == 0) {
      setShowMiddle(showAll);
    }
    if (!showAll) {
      setShowMiddle(false);
    }
  }, [showAll]);

  return (
    <>
      <li>
        <div className="tree_label">
          <ul className="tree">
            <div>
              <div
                className="mr-2 mb-1 inline-block cursor-default rounded-full px-4 py-2"
                style={{
                  background: `${color?.middle}`,
                  marginTop: "-20px",
                }}
                onClick={() => {
                  if (middle?.node?.open) {
                    setShowMiddle(!showMiddle);
                  }
                }}
              >
                {middle?.node?.name}
              </div>
              <span>{middle?.node?.star ? "⭐️" : ""}</span>
            </div>
            {middle?.node?.open && showMiddle && (
              <li>
                <ul>
                  {middle?.bottom?.map((last: any) => (
                    <>
                      <li>
                        <div className="tree_label">
                          <div>
                            <div
                              className="mr-2 mb-1 inline-block cursor-default rounded-full px-4 py-2"
                              style={{
                                background: `${color?.bottom}`,
                                marginTop: "-20px",
                              }}
                            >
                              {last?.name}
                            </div>
                            <span>{last?.star ? "⭐️" : ""}</span>
                          </div>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
      </li>
    </>
  );
};
