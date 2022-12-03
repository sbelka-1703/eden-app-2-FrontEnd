import { Button, Modal, TextHeading3 } from "@eden/package-ui";
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
  // eslint-disable-next-line no-unused-vars
  profilePercentage,
  canSeeProjects,
  canProjectsSee,
  // eslint-disable-next-line no-unused-vars
  onSkip,
  openModal,
  onNext,
}: WarningModalProps) => {
  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div>
        <div className="justify-between">
          <div className="mb-4">
            <TextHeading3 className="text-center">
              Your profile is not visible to the Eden network!
            </TextHeading3>
          </div>
        </div>
        <div className="mb-6">
          <div className="mt-auto flex w-full justify-center">
            <IoIosWarning size={70} color={"FF7E5C"} />
          </div>
          <div className="mt-auto flex w-full justify-center text-slate-400">
            <p>{`Your profile has to be 50% + complete`}</p>
          </div>
        </div>
        <div className="justify-center pl-20 pr-12 pb-10">
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
              <TextHeading3>
                {`You ${
                  canProjectsSee ? "can" : "can't"
                } apply to a project & projects ${
                  canProjectsSee ? "can" : "can't"
                } see your profile`}
              </TextHeading3>
            </div>
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
      </div>
    </Modal>
  );
};
