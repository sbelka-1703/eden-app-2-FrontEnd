import { Button, Modal, TextArea, TextBody, TextHeading3 } from "ui";

export interface ProjectInfoModalProps {
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

export const ProjectInfoModal = ({
  openModal,
  onSubmit,
}: ProjectInfoModalProps) => {
  return (
    <>
      <Modal open={openModal} closeOnEsc={false}>
        <TextHeading3 className="col-span-2 mb-4 text-center">
          Let’s finish up your project profile before we launch it!
        </TextHeading3>
        <div className={`h-6/10 relative grid grid-cols-2 gap-2 py-1`}>
          <section className="col-span-1">
            <TextBody className="mb-1">One liner:</TextBody>
            <TextArea
              className="mb-4"
              name="bio"
              placeholder="Start typing here"
              required
              rows={1}
              maxLength={100}
              debounceTime={0}
              onChange={() => {
                /**/
              }}
            />
            <TextBody className="mb-1">Short description:</TextBody>
            <TextArea
              className="mb-4"
              name="description"
              placeholder="Start typing here"
              required
              maxLength={100}
              debounceTime={0}
              onChange={() => {
                /**/
              }}
            />
          </section>
          <div className={`absolute bottom-2  flex w-full justify-center`}>
            <Button
              variant={`primary`}
              onClick={() => {
                onSubmit();
              }}
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
