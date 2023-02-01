import { Maybe, RoleType, TeamType } from "@eden/package-graphql/generated";
import { AvatarProps, Button, RoleSmallCard, TextBody } from "@eden/package-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

export interface RoleListProps {
  roles: Maybe<Array<Maybe<RoleType>>>;
  members?: Maybe<TeamType>[];
  selectedRole?: Maybe<RoleType> | null;
  // eslint-disable-next-line no-unused-vars
  handleAddRole?: () => void;
  // eslint-disable-next-line no-unused-vars
  handleEditRole?: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleSelectRole?: (val: Maybe<RoleType>) => void;
  addRole?: boolean;
}
export const RoleList: React.FC<RoleListProps> = ({
  roles,
  handleAddRole,
  handleSelectRole,
  // handleEditRole,
  selectedRole,
  members,
  addRole = true,
}) => {
  const [seeMore, setSeeMore] = useState(false);

  const cards = roles?.map((role: Maybe<RoleType>, index: number) => (
    <div key={index} className="col-span-1">
      <RoleSmallCard
        role={role}
        isSelected={selectedRole?._id === role?._id}
        onClick={() => {
          if (handleSelectRole) handleSelectRole(role);
        }}
        // handleEdit={() => handleEditRole!(role?._id!)}
        avatars={
          members
            ?.filter((member) => member?.roleID === role?._id)
            .map((member) => ({
              src: member?.memberInfo?.discordAvatar,
              size: "xs",
              alt: member?.memberInfo?.discordName,
            })) as unknown as AvatarProps[]
        }
      />
    </div>
  ));

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {cards?.slice(0, 3)}
        {seeMore ? cards?.slice(3) : null}
        {addRole && (
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
        )}
      </div>
      {cards && cards.length >= 4 && (
        <p
          className="mt-2 cursor-pointer text-center text-sm"
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
