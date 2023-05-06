import { CandidateInfo, Modal } from "@eden/package-ui";

export interface ICandidateModalProps {
  memberId: string;
  percentage: number | null;
  open?: boolean;
  handleCloseModal: () => void;
  summaryQuestions: any;
}

export const CandidateModal = ({
  memberId,
  percentage,
  summaryQuestions,
  open,
  handleCloseModal,
}: ICandidateModalProps) => {
  if (!memberId) return null;
  // if (!findMember) return null;

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <CandidateInfo
          memberID={memberId}
          percentage={percentage}
          summaryQuestions={summaryQuestions}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </Modal>
  );
};
