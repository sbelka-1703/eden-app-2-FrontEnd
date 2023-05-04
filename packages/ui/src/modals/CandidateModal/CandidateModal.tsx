import { useQuery } from "@apollo/client";
import { FIND_MEMBER_INFO } from "@eden/package-graphql";
import { CandidateInfo, Modal } from "@eden/package-ui";

export interface ICandidateModalProps {
  memberId: string;
  percentage: number | null;
  open?: boolean;
  onClose?: () => void;
}

export const CandidateModal = ({
  memberId,
  percentage,
  open,
  onClose,
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
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <CandidateInfo member={findMember} percentage={percentage} />
      </div>
    </Modal>
  );
};
