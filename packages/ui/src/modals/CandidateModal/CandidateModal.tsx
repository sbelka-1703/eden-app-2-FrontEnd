import { useQuery } from "@apollo/client";
import { FIND_MEMBER_INFO } from "@eden/package-graphql";
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
  const { data: dataMemberInfo } = useQuery(FIND_MEMBER_INFO, {
    variables: {
      fields: {
        _id: memberId,
      },
    },
    skip: !memberId || !open,
  });

  const findMember = dataMemberInfo?.findMember;

  if (!memberId) return null;
  // if (!findMember) return null;

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <CandidateInfo
          member={findMember}
          percentage={percentage}
          summaryQuestions={summaryQuestions}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </Modal>
  );
};
