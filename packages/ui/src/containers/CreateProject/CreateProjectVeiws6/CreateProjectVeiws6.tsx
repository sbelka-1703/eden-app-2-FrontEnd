import { BatteryStepper, Button, Card, TextHeading3 } from "@eden/package-ui";
import { useState } from "react";

export interface CreateProjectVeiws6Props {
  onBack: () => void;
  onNext: () => void;
  onLaunch: () => void;
  onNewPosition: () => void;
}

export const CreateProjectVeiws6 = ({
  onBack,
  onNext,
  onLaunch,
  onNewPosition,
}: CreateProjectVeiws6Props) => {
  const [skipped, setSkipped] = useState(false);

  return (
    <Card shadow className="pt-3 pb-6">
      <div
        style={{ minHeight: "65vh" }}
        className="flex flex-col justify-between"
      >
        <div>
          <TextHeading3 className="ml-8 mb-4">
            Complete your profile:
          </TextHeading3>
          <div className="flex justify-end px-7">
            <BatteryStepper size="sm" batteryPercentage={100} />
          </div>
          {!skipped ? (
            <div className="px-7">
              <TextHeading3>
                Open position has been succesfully added!
              </TextHeading3>
              <TextHeading3>Do you want to open another position?</TextHeading3>
              <div className="mt-4 flex justify-center gap-7">
                <Button variant="secondary" onClick={() => setSkipped(true)}>
                  Skip
                </Button>
                <Button variant="secondary" onClick={() => onNewPosition()}>
                  Add New Position
                </Button>
              </div>
            </div>
          ) : (
            <div className="mb-4 mt-16 bg-green-100 p-7">
              <TextHeading3>
                All done! Review and launch your project!
              </TextHeading3>
              <div className="mt-4 flex justify-center">
                <Button variant="primary" onClick={onLaunch}>
                  Launch My Project
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between px-7">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button variant="secondary" onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};
