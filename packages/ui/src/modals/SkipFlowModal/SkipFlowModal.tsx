import { BatteryStepper, Button, Modal, TextHeading3 } from "@eden/package-ui";

export interface SkipFlowModalProps {
  openModal?: boolean;
  percentage?: number;
  onSkipStep: () => void;
  onSkipFlow: () => void;
}

export const SkipFlowModal = ({
  openModal,
  onSkipStep,
  onSkipFlow,
  percentage = 0,
}: SkipFlowModalProps) => {
  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div>
        <div className="flex justify-between">
          <div className="flex-1">
            <TextHeading3>
              ⚠️ Do you wanna skip this step or entire flow?
            </TextHeading3>
          </div>
        </div>
        <section className="my-4 flex flex-col justify-center">
          <TextHeading3>AI is not at it’s best ☹️</TextHeading3>
          <TextHeading3 className="mb-8">
            Add more data to get relevant matches!
          </TextHeading3>

          <BatteryStepper batteryPercentage={percentage} />
        </section>
        <div className="flex justify-between">
          <div>
            <Button radius="rounded" variant={`secondary`} onClick={onSkipFlow}>
              Skip this flow
            </Button>
          </div>
          <Button radius="rounded" variant={`secondary`} onClick={onSkipStep}>
            Skip this step
          </Button>
        </div>
      </div>
    </Modal>
  );
};
