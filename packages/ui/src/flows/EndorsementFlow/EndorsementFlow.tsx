import { UserContext } from "@eden/package-context";
import {
  CandidateProfileCard,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
} from "@eden/package-ui";
import { useContext } from "react";

import { EndorsementMemberContainer } from "./components";

/* eslint-disable no-unused-vars */
// export enum ENDORSEMENT_FLOW_STEPS {
//   START = "START",
//   DESCRIPTION = "DESCRIPTION",
//   ADD_ROLE = "ADD_ROLE",
//   ADD_ANOTHER_ROLE = "ADD_ANOTHER_ROLE",
// }

export const EndorsementFlow = ({}) => {
  const { currentUser } = useContext(UserContext);
  // const [step, setStep] = useState(ENDORSEMENT_FLOW_STEPS.START);

  return (
    <GridLayout>
      <GridItemThree>
        <Card shadow className={"bg-white"}>
          <CandidateProfileCard member={currentUser} />
          <div className={`p-4 font-semibold uppercase text-neutral-800`}>
            My Endorsements
          </div>
        </Card>
      </GridItemThree>
      <GridItemNine>
        <Card
          shadow
          className={"scrollbar-hide h-85 overflow-scroll bg-white p-4"}
        >
          <EndorsementMemberContainer />
        </Card>
      </GridItemNine>
    </GridLayout>
  );
};
