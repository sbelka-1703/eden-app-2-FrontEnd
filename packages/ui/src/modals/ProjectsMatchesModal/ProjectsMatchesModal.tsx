import { Button, Modal } from "@eden/package-ui";

export interface ProjectsMatchesModalProps {
  openModal?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (val?: any) => void;
  // eslint-disable-next-line no-unused-vars
  setBio?: (val?: any) => void;
  // eslint-disable-next-line no-unused-vars
  setDescription?: (val?: any) => void;
  // eslint-disable-next-line no-unused-vars
  setLinks?: (val?: any) => void;
}

export const ProjectsMatchesModal = ({
  openModal,
}: ProjectsMatchesModalProps) => {
  return (
    <>
      <Modal open={openModal} closeOnEsc={false}></Modal>
    </>
  );
};
