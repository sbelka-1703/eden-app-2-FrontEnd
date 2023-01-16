import { Members } from "@eden/package-graphql/generated";
import { Card, CardGrid, TextHeading3 } from "@eden/package-ui";

import { getUserProgress } from "../../../../utils/user-progress";
import { UserCardOnboardParty } from "../../cards/user/UserCardOnboardParty/UserCardOnboardParty";

export interface OnboardPartyContainerProps {
  members: Members[];
}

export const OnboardPartyContainer = ({
  members = [],
}: OnboardPartyContainerProps) => {
  return (
    <Card
      shadow
      className="h-85 scrollbar-hide overflow-y-scroll bg-white py-3 px-6"
    >
      <TextHeading3 className="mb-2">See Other Profiles</TextHeading3>
      <CardGrid>
        {[...members]
          .sort(
            (a: Members, b: Members) =>
              (getUserProgress(b) || 0) - (getUserProgress(a) || 0)
          )
          .map((member: Members, index: number) => (
            <UserCardOnboardParty key={index} member={member} />
          ))}
      </CardGrid>
    </Card>
  );
};
