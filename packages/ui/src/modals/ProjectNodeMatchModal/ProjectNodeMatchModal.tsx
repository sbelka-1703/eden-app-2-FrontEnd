// import { gql, useMutation } from "@apollo/client";
// import { UserContext } from "@eden/package-context";
import {
  MatchSkillsToProjectsOutput,
  // Project,
} from "@eden/package-graphql/generated";
import { Modal, ProjectNodeMatchInfo } from "@eden/package-ui";
// import { useContext, useState } from "react";
// import { toast } from "react-toastify";

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
  //   const { currentUser } = useContext(UserContext);
  //   const [isApplying, setIsApplying] = useState(false);

  // eslint-disable-next-line no-unused-vars
  //   const [applyGrant] = useMutation(APPLY_GRANT, {
  //     onCompleted({ applyGrant }: Mutation) {
  //       if (!applyGrant) console.log("applyGrant is null");
  //       toast.success("Successfully Applied to Grant");
  //       setIsApplying(false);
  //     },
  //   });

  if (!matchedProject) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        {/* {isApplying ? (
          <Loading title={`Redirecting...`} />
        ) : ( */}
        {/* <ProjectInfo project={project} /> */}
        <ProjectNodeMatchInfo matchedProject={matchedProject} />
        {/* )} */}
      </div>
    </Modal>
  );
};
