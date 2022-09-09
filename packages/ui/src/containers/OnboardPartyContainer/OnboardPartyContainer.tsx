import { Members } from "@graphql/eden/generated";
import { Card, TextHeading3 } from "ui";

import { UserCardOnboardParty } from "../../cards/UserCardOnboardParty";

export interface OnboardPartyContainerProps {
  members: Members[];
}

export const OnboardPartyContainer = ({
  members = [],
}: OnboardPartyContainerProps) => {
  return (
    <Card
      shadow
      className="h-8/10 scrollbar-hide overflow-y-scroll bg-white p-3"
    >
      <TextHeading3 className="mb-2">See Other Profiles</TextHeading3>
      <section className="grid grid-cols-2 gap-3">
        {[...members]
          .sort(
            (a: Members, b: Members) =>
              (b.skills?.length || 0) - (a.skills?.length || 0)
          )
          .map((member: Members, index: number) => (
            <UserCardOnboardParty key={index} member={member} />
          ))}
      </section>
    </Card>
  );
};
