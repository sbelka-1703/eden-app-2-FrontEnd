import { MatchSkillsToProjectsOutput } from "@eden/package-graphql/generated";
import { Modal, ProjectNodeMatchInfo } from "@eden/package-ui";

export interface IProjectNodeMatchModalProps {
  matchedProject: MatchSkillsToProjectsOutput;
  open?: boolean;
  onClose?: () => void;
}

export const ProjectNodeMatchModal = ({
  matchedProject,
  open,
  onClose,
}: IProjectNodeMatchModalProps) => {
  if (!matchedProject) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <ProjectNodeMatchInfo matchedProject={matchedProject} />
      </div>
    </Modal>
  );
};
