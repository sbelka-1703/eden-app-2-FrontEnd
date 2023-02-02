import dynamic from "next/dynamic";
import React from "react";

import type { NextPageWithLayout } from "../../_app";

const GraphVisualisation = dynamic(
  () => import("@eden/package-ui/g6/GraphVisualisation/GraphVisualisation"),
  {
    ssr: false,
  }
);

const GraphVisualPage: NextPageWithLayout = () => {
  return (
    <>
      <GraphVisualisation />
    </>
  );
};

export default GraphVisualPage;
