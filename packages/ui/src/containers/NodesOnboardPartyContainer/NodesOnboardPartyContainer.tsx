import { Members } from "@eden/package-graphql/generated";
import {
  Card,
  CardGrid,
  TextHeading3,
  UserCardOnboardPartyNodes,
} from "@eden/package-ui";

import { getFillProfilePercentage } from "../../../utils/fill-profile-percentage";

export interface INodesOnboardPartyContainerProps {
  members: Members[];
}

export const NodesOnboardPartyContainer = ({
  members = [],
}: INodesOnboardPartyContainerProps) => {
  return (
    <Card
      shadow
      className="scrollbar-hide flex flex-grow overflow-y-scroll bg-white py-3 px-4 md:px-6"
    >
      <div>
        <TextHeading3 className="mb-2">Members on this Call</TextHeading3>
        <CardGrid>
          {[...members]
            .sort(
              (a: Members, b: Members) =>
                (getFillProfilePercentage(b) || 0) -
                (getFillProfilePercentage(a) || 0)
            )
            .map((member: Members, index: number) => (
              <UserCardOnboardPartyNodes key={index} member={member} />
            ))}
        </CardGrid>
      </div>
    </Card>
  );
};
