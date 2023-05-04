import { useQuery } from "@apollo/client";
import { FIND_MEMBER_INFO } from "@eden/package-graphql";
import { Maybe, Members } from "@eden/package-graphql/generated";
import { CandidateInfo, Modal } from "@eden/package-ui";

export interface ICandidateModalProps {
  member?: Maybe<Members>;
  percentage?: number;
  open?: boolean;
  onClose?: () => void;
}

export const CandidateModal = ({
  member,
  percentage,
  open,
  onClose,
}: ICandidateModalProps) => {
  const { data: dataMemberInfo } = useQuery(FIND_MEMBER_INFO, {
    variables: {
      fields: {
        _id: member?._id,
      },
    },
    skip: !member?._id || !open,
  });

  const findMember = dataMemberInfo?.findMember;

  if (!member) return null;
  // if (!findMember) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <CandidateInfo member={findMember || member} percentage={percentage} />
      </div>
    </Modal>
  );
};
