// import { gql, useMutation } from "@apollo/client";
// import { UserContext } from "@eden/package-context";
import { Project } from "@eden/package-graphql/generated";
import { Modal, ProjectInfo } from "@eden/package-ui";
// import { useContext, useState } from "react";
// import { toast } from "react-toastify";

export interface IProjectModalProps {
  project?: Project;
  open?: boolean;
  onClose?: () => void;
}

export const ProjectModal = ({
  project,
  open,
  onClose,
}: IProjectModalProps) => {
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

  if (!project) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        {/* {isApplying ? (
          <Loading title={`Redirecting...`} />
        ) : ( */}
        <ProjectInfo project={project} />
        {/* )} */}
      </div>
    </Modal>
  );
};
