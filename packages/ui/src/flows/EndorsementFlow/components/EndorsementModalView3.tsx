import { Members, Project } from "@eden/package-graphql/generated";
import { membersWorkedWithMock } from "@eden/package-mock";
import { useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

import { EndorseMemberCard } from "./";

interface IEndorsementModalView3Props {
  member?: Members;
  project?: Project;
  onNext: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSelectMember: (member: Members, project: Project) => void;
}

export const EndorsementModalView3 = ({
  member,

  handleSelectMember,
}: IEndorsementModalView3Props) => {
  const [newMemberWorkedWith, setNewMemberWorkedWith] = useState<any>();

  useEffect(() => {
    setNewMemberWorkedWith(membersWorkedWithMock() as any);
  }, []);

  return (
    <div>
      <div className={`flex flex-col text-center`}>
        <div className={`mx-auto`}>
          <BsFillPatchCheckFill className={`h-32 w-32 text-green-400`} />
        </div>
        <div className={`text-2xl font-medium text-neutral-800`}>
          Thank you for endorsing @{member?.discordName}!
        </div>
      </div>

      <div className={`mt-8 mb-4`}>
        {newMemberWorkedWith && (
          <>
            <div
              className={`my-2 text-center text-lg font-medium uppercase text-neutral-700`}
            >
              Tell Us about your experience with @
              {newMemberWorkedWith.member.discordName}
            </div>
            <EndorseMemberCard
              member={newMemberWorkedWith.member}
              project={newMemberWorkedWith.project}
              topSkills={newMemberWorkedWith.topSkills}
              collaboration={newMemberWorkedWith.collaboration}
              onSelected={handleSelectMember}
            />
          </>
        )}
      </div>
    </div>
  );
};
