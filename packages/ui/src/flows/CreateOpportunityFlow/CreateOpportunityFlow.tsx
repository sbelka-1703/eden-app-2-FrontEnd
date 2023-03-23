import { Card, GridItemSix, GridLayout } from "@eden/package-ui";
import { useState } from "react";

/* eslint-disable no-unused-vars */
export enum OPPORTUNITY_FLOW_STEPS {
  START = "START",
  DESCRIPTION = "DESCRIPTION",
  ADD_ROLE = "ADD_ROLE",
  ADD_ANOTHER_ROLE = "ADD_ANOTHER_ROLE",
}

export const CreateOpportunityFlow = ({}) => {
  const [step, setStep] = useState(OPPORTUNITY_FLOW_STEPS.START);

  return (
    <GridLayout>
      <GridItemSix>
        <Card shadow className={"h-85 bg-white"}>
          opporturnity
        </Card>
      </GridItemSix>
      <GridItemSix>
        <Card shadow className={"h-85 bg-white"}>
          right
        </Card>
      </GridItemSix>
    </GridLayout>
  );
};
