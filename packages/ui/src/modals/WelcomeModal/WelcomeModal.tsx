import { Button, Modal, TextBody, TextHeading3 } from "@eden/package-ui";

export interface IWelcomeModalProps {
  image?: string;
  profilePercentage?: number;
  canSeeProjects?: boolean;
  canProjectsSee?: boolean;
  openModal: boolean;
  onNext: () => void;
  text?: string;
}

export const WelcomeModal = ({
  image,
  openModal,
  onNext,
  text = "projects",
}: IWelcomeModalProps) => {
  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div className={`mb-4`} id="modal__welcome">
        <TextHeading3 className={``}>
          Welcome to Eden! I’ll find the right {text} for YOU 💫
        </TextHeading3>
        <TextBody className={`text-zinc-500`}>
          I’ll ask you questions and my AI will find the best {text} for you!
        </TextBody>
      </div>
      <div className={`flex w-full justify-center`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={``} className={``} />
      </div>
      <div className={`justify-center pl-20 pr-12 pb-10`}>
        <div className={`mt-auto flex w-full justify-start`}>
          <div></div>
        </div>
      </div>
      <div className="flex justify-between">
        {/* <div>
            <Button radius="rounded" variant={`secondary`} onClick={onSkip}>
              Skip
            </Button>
          </div> */}
        <Button
          className="ml-auto"
          radius="rounded"
          variant={`secondary`}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </Modal>
  );
};
