import { RawDataGraph } from "@eden/package-ui";
import React, { RefObject, useRef } from "react";

import type { NextPageWithLayout } from "../../_app";
// import { rawDataPersonProject } from "./data/rawDataPersonProject";
import { rawDataBigGraph } from "./data/rawDataBigGraph";

const GraphVisualPage: NextPageWithLayout = () => {
  const refContainer = useRef<HTMLDivElement>();

  return (
    <>
      <div
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: "10",
          width: "100%",
        }}
      >
        <div className={`flex h-screen w-full gap-4`}>
          <div
            className={`h-screen
             py-1 text-center`}
          ></div>

          {refContainer && (
            <div
              className="w-full"
              ref={refContainer as RefObject<HTMLDivElement>}
            >
              <RawDataGraph rawData={rawDataBigGraph} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GraphVisualPage;
