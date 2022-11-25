import { BatteryStepper, Button, Modal } from "@eden/package-ui";

export interface ProjectsMatchesModalProps {
  openModal?: boolean;
  // eslint-disable-next-line no-unused-vars
  batteryPercentageBefore?: number;
  numMatchesBefore?: number;
  batteryPercentageAfter?: number;
  numMatchesAfter?: number;
  matchType?: string;
  onSubmit?: () => void;
}

export const ProjectsMatchesModal = ({
  openModal,
  matchType = "People",
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
          <p className="text-2xl ">Looking for someone?</p>
        </div>
        <div>
          <p className="tracking-wider">Let me help you find them!</p>
        </div>
      </div>
      <div className="my-4 flex justify-center space-x-6 px-6">
        <div className="flex h-60 w-60 justify-center rounded-md border-2">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div>{"We have"}</div>
            <div className="mx-4">
              <BatteryStepper
                batteryPercentage={batteryPercentageBefore}
                numMatches={numMatchesBefore}
                size={"sm"}
                text={matchType}
              />
            </div>
            <div>{"active on Eden today."}</div>
          </div>
        </div>
        <div className="flex h-60 w-60 justify-center rounded-md border-2">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div> {"I’ll help you find the"}</div>
            <div className="mx-4">
              <BatteryStepper
                batteryPercentage={batteryPercentageAfter}
                numMatches={numMatchesAfter}
                size={"sm"}
                text={matchType}
              />
            </div>
            <div>{"for you to talk to!"}</div>
          </div>
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
