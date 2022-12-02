import { Members } from "@eden/package-graphql/generated";
import {
  Card,
  TextHeading3,
  UserCardOnboardPartyNodes,
} from "@eden/package-ui";

import { getUserProgressNodes } from "../../../../utils/user-progress-nodes";

export interface INodesOnboardPartyContainerProps {
  members: Members[];
}

export const NodesOnboardPartyContainer = ({
  members = [],
}: INodesOnboardPartyContainerProps) => {
  return (
    <Card
      shadow
      className="scrollbar-hide flex flex-grow overflow-y-scroll bg-white py-3 px-6"
    >
      <div>
        <TextHeading3 className="mb-2">Other People to Know</TextHeading3>
        <section className="grid gap-5 pt-2 pb-6 md:grid-cols-2 2xl:grid-cols-3">
          {[...members]
            .sort(
              (a: Members, b: Members) =>
                (getUserProgressNodes(b) || 0) - (getUserProgressNodes(a) || 0)
            )
            .map((member: Members, index: number) => (
              <UserCardOnboardPartyNodes key={index} member={member} />
            ))}
        </section>
      </div>
    </Card>
  );
};
