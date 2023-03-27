import { Members, Project } from "@eden/package-graphql/generated";
import { membersWorkedWithMockArray } from "@eden/package-mock";
import { Modal } from "@eden/package-ui";
import { useCallback, useEffect, useState } from "react";

import {
  ReviewMemberCard,
  ReviewModalView1,
  ReviewModalView2,
  ReviewModalView3,
} from "./";

export interface IChatMessages {
  user?: string;
  message?: string;
}

interface IReviewContainerProps {}

export const ReviewMemberContainer = ({}: IReviewContainerProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [memberSelected, setMemberSelected] = useState<Members>();
  const [projectSelected, setProjectSelected] = useState<Project>();
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [membersWorkedWith, setMembersWorkedWith] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<IChatMessages[]>([]);

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
      setChatMessages([]);
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
        <ReviewMemberCard
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
          <ReviewModalView1
            member={memberSelected}
            project={projectSelected}
            onNext={handleNext}
            rating={currentRating}
            onRatingChange={setCurrentRating}
            chatMessages={chatMessages}
            onChatMessagesChange={setChatMessages}
          />
        )}
        {memberSelected && step === 1 && (
          <ReviewModalView2
            member={memberSelected}
            project={projectSelected}
            onNext={handleNext}
            rating={currentRating}
            onRatingChange={setCurrentRating}
            chatMessages={chatMessages}
          />
        )}
        {memberSelected && step === 2 && (
          <ReviewModalView3
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
