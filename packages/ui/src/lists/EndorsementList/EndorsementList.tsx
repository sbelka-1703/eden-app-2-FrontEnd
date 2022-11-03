/* eslint-disable camelcase */
import { AvatarList, EndorsementCard } from "@eden/package-ui";
import React from "react";

export interface EndorsementListProps {
  endorsements: any[];
}
export const EndorsementList: React.FC<EndorsementListProps> = ({
  endorsements,
}) => {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold tracking-widest subpixel-antialiased">
        🫱🏾‍🫲🏼 Endorsed by
      </p>
      <div className="grid grid-cols-3 gap-6">
        {endorsements.slice(0, 3).map((endorsement, index) => (
          <div key={index} className="col-span-1">
            <EndorsementCard
              member={endorsement?.member}
              text={endorsement?.text}
              level={endorsement?.level}
            />
          </div>
        ))}
      </div>
      {endorsements.slice(3, 8).length > 0 && (
        <div className="mt-4 flex items-center">
          <AvatarList
            className="inline-block !w-auto !justify-start"
            avatars={endorsements.slice(3, 8).map((endorsement) => ({
              size: "sm",
              src: endorsement.member.discordAvatar,
            }))}
          />
          {endorsements.slice(8).length > 0 && (
            <p className="text-soilGray ml-6 inline">
              +{endorsements.slice(5).length} more{" "}
              {endorsements.slice(5).length === 1
                ? "endorsement"
                : "endorsements"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
