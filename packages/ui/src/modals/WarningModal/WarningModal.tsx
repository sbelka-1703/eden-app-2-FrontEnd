import { Button, Modal, TextHeading1, TextHeading3 } from "@eden/package-ui";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoIosWarning } from "react-icons/io";

export interface WarningModalProps {
  profilePercentage: number;
  canSeeProjects: boolean;
  canProjectsSee: boolean;
  openModal: boolean;
  onSkip: () => void;
  onNext: () => void;
}

export const WarningModal = ({
  profilePercentage,
  canSeeProjects,
  canProjectsSee,
  onSkip,
  openModal,
  onNext,
}: WarningModalProps) => {
  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div>
        <div className="justify-between">
          <div className="pb-3">
            <TextHeading1>Danger Zone!</TextHeading1>
          </div>
          <div className="pl-2">
            <TextHeading3>
              {
                "Don't forget to finish your profile later to become visible on Eden platform. We only show profiles that are 60%+ complete!"
              }
            </TextHeading3>
          </div>
        </div>
        <div className="">
          <div className="mt-auto flex w-full justify-center">
            <IoIosWarning size={70} color={"FF7E5C"} />
          </div>
          <div className="mt-auto flex w-full justify-center">
            <TextHeading3>
              {`At this stage your profile is ${profilePercentage}% complete.`}
            </TextHeading3>
          </div>
        </div>
        <div className="justify-center pl-20 pb-10">
          <div className="mt-auto flex w-full justify-start pt-5">
            <div className="pr-10 pt-2">
              {canSeeProjects ? (
                <FaCheck size={40} color={"#74FA6D"} />
              ) : (
                <ImCross size={40} color={"FF7E5C"} />
              )}
            </div>
            <TextHeading3>{`You ${
              canSeeProjects ? "can" : "can't"
            } see projects & bounties.`}</TextHeading3>
          </div>
          <div className="mt-auto flex w-full justify-start ">
            <div className="pr-10 pt-2">
              {canProjectsSee ? (
                <FaCheck size={40} color={"#74FA6D"} />
              ) : (
                <ImCross size={40} color={"FF7E5C"} />
              )}
            </div>
            <div>
              <TextHeading3>{`Projects ${
                canProjectsSee ? "can" : "can't"
              } see you.`}</TextHeading3>
              <TextHeading3>
                {`You ${
                  canProjectsSee ? "can" : "can't"
                } apply to the project & bounties`}
              </TextHeading3>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <Button radius="rounded" variant={`secondary`} onClick={onSkip}>
              Skip
            </Button>
          </div>
          <Button radius="rounded" variant={`secondary`} onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};
