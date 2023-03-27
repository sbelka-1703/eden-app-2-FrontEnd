import { Members, Project } from "@eden/package-graphql/generated";
import { membersWorkedWithMockArray } from "@eden/package-mock";
import { Modal } from "@eden/package-ui";
import { useCallback, useEffect, useState } from "react";

import {
  EndorseMemberCard,
  EndorsementModalView1,
  EndorsementModalView2,
  EndorsementModalView3,
} from "./";

interface IEndorsementMemberContainerProps {}

export const EndorsementMemberContainer =
  ({}: IEndorsementMemberContainerProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [memberSelected, setMemberSelected] = useState<Members>();
    const [projectSelected, setProjectSelected] = useState<Project>();
    const [currentRating, setCurrentRating] = useState<number>(0);
    const [membersWorkedWith, setMembersWorkedWith] = useState<any[]>([]);

    const [step, setStep] = useState(0);

    const handleNext = useCallback(() => {
      if (step === 2) {
        setIsModalOpen(false);
        setStep(0);
      } else setStep((prev) => prev + 1);
    }, [step]);

    useEffect(() => {
      setMembersWorkedWith(membersWorkedWithMockArray(15) as any);
    }, []);

    const handleSelectMember = useCallback(
      (member: Members, project: Project) => {
        setStep(0);
        setCurrentRating(0);
        setMemberSelected(member);
        setProjectSelected(project);
        setIsModalOpen(true);
      },
      []
    );

    const handleModalClose = useCallback(() => {
      setIsModalOpen(false);
    }, []);

    return (
      <div className={`grid gap-5 pt-2 pb-6 lg:grid-cols-2`}>
        {membersWorkedWith?.map((member, index) => (
          <EndorseMemberCard
            key={index}
            member={member.member}
            project={member.project}
            topSkills={member.topSkills}
            collaboration={member.collaboration}
            onSelected={handleSelectMember}
          />
        ))}
        <Modal open={isModalOpen} onClose={handleModalClose}>
          {memberSelected && step === 0 && (
            <EndorsementModalView1
              member={memberSelected}
              project={projectSelected}
              onNext={handleNext}
              rating={currentRating}
              onRatingChange={setCurrentRating}
            />
          )}
          {memberSelected && step === 1 && (
            <EndorsementModalView2
              member={memberSelected}
              project={projectSelected}
              onNext={handleNext}
              rating={currentRating}
              onRatingChange={setCurrentRating}
            />
          )}
          {memberSelected && step === 2 && (
            <EndorsementModalView3
              member={memberSelected}
              project={projectSelected}
              onNext={handleNext}
              handleSelectMember={handleSelectMember}
            />
          )}
        </Modal>
      </div>
    );
  };
