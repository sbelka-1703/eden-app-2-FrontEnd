/* eslint-disable camelcase */
import { Maybe, RoleType } from "@graphql/eden/generated";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Button, RoleSmallCard } from "ui";

export interface RoleListProps {
  roles: Maybe<Array<Maybe<RoleType>>>;
  // eslint-disable-next-line no-unused-vars
  handleAddRole?: () => void;
}
export const RoleList: React.FC<RoleListProps> = ({ roles, handleAddRole }) => {
  const [seeMore, setSeeMore] = useState(false);

  const cards = roles?.map((role: Maybe<RoleType>, index: number) => (
    <RoleSmallCard
      key={index}
      role={role}
      isSelected={false}
      skills={role?.skills ? role.skills : []}
    />
  ));

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {cards?.slice(0, 3)}
        {seeMore ? cards?.slice(3) : null}
        <div className=" flex flex-row items-center justify-center">
          <Button radius="rounded" variant="secondary" onClick={handleAddRole}>
            <h1 className="text-soilBody">Add role</h1>
          </Button>
        </div>
      </div>
      {cards && cards.length > 4 && (
        <p
          className="cursor-pointer text-center text-sm"
          onClick={() => setSeeMore(!seeMore)}
        >
          {`see ${seeMore ? "less" : "more"} roles`}
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
