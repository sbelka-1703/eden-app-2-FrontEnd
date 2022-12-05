import {
  MatchPercentage,
  Maybe,
  Members,
} from "@eden/package-graphql/generated";
import { MemberInfo, Modal } from "@eden/package-ui";
import { useState } from "react";

export interface IUserDiscoverModalProps {
  member?: Members;
  matchPercentage?: Maybe<MatchPercentage>;
  open?: boolean;
  onClose?: () => void;
}

export const UserDiscoverModal = ({
  member,
  matchPercentage,
  open,
  onClose,
}: IUserDiscoverModalProps) => {
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  if (!member) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <MemberInfo
          member={member}
          percentage={matchPercentage?.totalPercentage || undefined}
          setExperienceOpen={setExperienceOpen!}
          experienceOpen={experienceOpen!}
        />
      </div>
    </Modal>
  );
};
