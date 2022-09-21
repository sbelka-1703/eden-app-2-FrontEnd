/* eslint-disable camelcase */
import { Maybe, RoleType } from "@graphql/eden/generated";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Button, RoleSmallCard, TextBody } from "ui";

export interface RoleListProps {
  roles: Maybe<Array<Maybe<RoleType>>>;
  selectedRole?: Maybe<RoleType> | null;
  // eslint-disable-next-line no-unused-vars
  handleAddRole?: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSelectRole?: (val: Maybe<RoleType>) => void;
}
export const RoleList: React.FC<RoleListProps> = ({
  roles,
  handleAddRole,
  handleSelectRole,
  selectedRole,
}) => {
  const [seeMore, setSeeMore] = useState(false);

  const cards = roles?.map((role: Maybe<RoleType>, index: number) => (
    <div key={index} className="col-span-1">
      <RoleSmallCard
        role={role}
        isSelected={selectedRole?._id === role?._id}
        skills={role?.skills ? role.skills : []}
        onClick={() => {
          if (handleSelectRole) handleSelectRole(role);
        }}
      />
    </div>
  ));

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {cards?.slice(0, 3)}
        {seeMore ? cards?.slice(3) : null}
        <div className="col-span-1 flex items-center justify-center">
          <Button
            radius="rounded"
            variant="secondary"
            onClick={handleAddRole}
            className="mx-auto"
          >
            <TextBody>Add role</TextBody>
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
