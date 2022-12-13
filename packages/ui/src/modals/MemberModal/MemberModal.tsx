import { Maybe, Members } from "@eden/package-graphql/generated";
import { MemberInfo, Modal } from "@eden/package-ui";
import { useState } from "react";

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
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  if (!member) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <MemberInfo
          member={member}
          percentage={percentage}
          setExperienceOpen={setExperienceOpen!}
          experienceOpen={experienceOpen!}
        />
      </div>
    </Modal>
  );
};
