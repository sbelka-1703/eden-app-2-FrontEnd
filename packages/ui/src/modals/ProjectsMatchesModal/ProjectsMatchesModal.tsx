import { BatteryStepper, Button, Modal } from "@eden/package-ui";

export interface ProjectsMatchesModalProps {
  openModal?: boolean;
  // eslint-disable-next-line no-unused-vars
  batteryPercentageBefore?: number;
  numMatchesBefore?: number;
  batteryPercentageAfter?: number;
  numMatchesAfter?: number;
  onSubmit?: () => void;
}

export const ProjectsMatchesModal = ({
  openModal,
  batteryPercentageBefore = 10,
  numMatchesBefore = 212,
  batteryPercentageAfter = 80,
  numMatchesAfter = 8,
  onSubmit,
}: ProjectsMatchesModalProps) => (
  <>
    <Modal open={openModal} closeOnEsc={false}>
      <div className="space-y-4 pl-4">
        <div>
          <p className="text-2xl ">
            Looking for someone? <br />
            Let me help you find them!{" "}
          </p>
        </div>
        <div>
          <p className="tracking-wider">
            We have 210 people active on Eden today. I’ll help you find the 8
            for you to talk to!
          </p>
        </div>
      </div>
      <div className="my-4 flex justify-center space-x-6 px-6">
        <div className="flex h-60 w-60 justify-center rounded-md border-2">
          <p className="flex flex-col items-center justify-center space-y-2">
            <div>{"We have"}</div>
            <div className="mx-4">
              <BatteryStepper
                batteryPercentage={batteryPercentageBefore}
                numMatches={numMatchesBefore}
                size={"sm"}
              />
            </div>
            <div>{"in Eden today"}</div>
          </p>
        </div>
        <div className="flex h-60 w-60 justify-center rounded-md border-2">
          <p className="flex flex-col items-center justify-center space-y-2">
            <div> {"AI will find the best"}</div>
            <div className="mx-4">
              <BatteryStepper
                batteryPercentage={batteryPercentageAfter}
                numMatches={numMatchesAfter}
                size={"sm"}
              />
            </div>
            <div>{"for you to choose from"}</div>
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          radius="rounded"
          variant={`secondary`}
          onClick={() => onSubmit!()}
        >
          Next
        </Button>
      </div>
    </Modal>
  </>
);
