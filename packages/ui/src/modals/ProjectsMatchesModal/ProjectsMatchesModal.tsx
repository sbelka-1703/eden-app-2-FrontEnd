import { BatteryStepper, Button, Modal } from "@eden/package-ui";

export interface ProjectsMatchesModalProps {
  openModal?: boolean;
  // eslint-disable-next-line no-unused-vars
  batteryPercentageBefore?: number;
  numMatchesBefore?: number;
  batteryPercentageAfter?: number;
  numMatchesAfter?: number;
}

export const ProjectsMatchesModal = ({
  openModal,
  batteryPercentageBefore = 10,
  numMatchesBefore = 212,
  batteryPercentageAfter = 80,
  numMatchesAfter = 8,
}: ProjectsMatchesModalProps) => (
  <>
    <Modal open={openModal} closeOnEsc={false}>
      <div>
        <p className="text-2xl ">Welcome to Eden!</p>
      </div>
      <div className="my-8 flex flex-col">
        <p className="flex items-center justify-center">
          {"We have"}
          <div className="mx-4">
            <BatteryStepper
              batteryPercentage={batteryPercentageBefore}
              numMatches={numMatchesBefore}
              size={"sm"}
            />
          </div>
          {"projects in Eden today"}
        </p>
        <p className="flex items-center justify-center">
          {"Let's teach AI to find the best"}
          <div className="mx-4">
            <BatteryStepper
              batteryPercentage={batteryPercentageAfter}
              numMatches={numMatchesAfter}
              size={"sm"}
            />
          </div>
          {"projects for you."}
        </p>
      </div>
      <div className="flex justify-end">
        <Button
          radius="rounded"
          variant={`secondary`}
          //   onClick={() => onSubmit()}
        >
          Next
        </Button>
      </div>
    </Modal>
  </>
);
