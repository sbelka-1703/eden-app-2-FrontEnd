import { Maybe, Members } from "@eden/package-graphql/generated";
import { MemberInfo, Modal } from "@eden/package-ui";

export interface IMemberModalProps {
  member?: Maybe<Members>;
  percentage?: number;
  open?: boolean;
  onClose?: () => void;
}

export const MemberModal = ({
  member,
  percentage,
  open,
  onClose,
}: IMemberModalProps) => {
  if (!member) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <MemberInfo member={member} percentage={percentage} />
      </div>
    </Modal>
  );
};
