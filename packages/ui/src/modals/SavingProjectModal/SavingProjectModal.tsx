import { Modal, TextHeading2 } from "@eden/package-ui";

export interface SavingProjectModalProps {
  openModal?: boolean;
}

export const SavingProjectModal = ({ openModal }: SavingProjectModalProps) => {
  return (
    <Modal open={openModal} closeOnEsc={false}>
      <TextHeading2>Saving project...</TextHeading2>
    </Modal>
  );
};
