import { Maybe, RoleType, TeamType } from "@graphql/eden/generated";
import React from "react";
import { Button, CandidateProfileCard, Modal, TextHeading2 } from "ui";

export interface ShortlistMemberModal {
  isModalOpen: boolean;
  roles: Maybe<Array<Maybe<RoleType>>>;
  members: Maybe<Maybe<TeamType>[]>;
  onClickNext?: () => void;
}

export const ShortlistMemberModal = ({
  isModalOpen,
  roles,
  members,
  onClickNext,
}: ShortlistMemberModal) => {
  return (
    <Modal
      open={isModalOpen}
      title="Almost done! Review your roles & people you want to invite!"
    >
      <TextHeading2 className="w-max "></TextHeading2>
      <div className="border-soilGray flex items-start justify-center">
        {roles?.map((role, index) => (
          <div
            key={index}
            className="h-full border-r-2 border-gray-300 text-center last:border-none"
          >
            <TextHeading2 className="mb-2 border-b-2 border-gray-300">
              {role?.title}
            </TextHeading2>
            {members!
              .filter((member: any) => member?.roleID === role?._id)
              .map((member: any) => (
                <div
                  key={member?.memberInfo?._id}
                  className="mb-2 h-full rounded-lg border-[2px] border-gray-400"
                >
                  <CandidateProfileCard
                    member={member?.memberInfo}
                    percentage={member?.percentage}
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
      <Button className="mx-auto" onClick={onClickNext}>
        next
      </Button>
    </Modal>
  );
};
