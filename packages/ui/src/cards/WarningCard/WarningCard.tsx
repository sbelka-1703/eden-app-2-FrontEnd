import { Button, Card } from "@eden/package-ui";
import { ExclamationIcon } from "@heroicons/react/solid";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export interface WarningCardProps {
  profilePercentage: number | null | undefined;
  onClickCompleteProfile?: () => void;
}

export const WarningCard = ({
  // eslint-disable-next-line no-unused-vars
  profilePercentage,
  onClickCompleteProfile,
}: WarningCardProps) => {
  return (
    <Card shadow className="w-full border-[2px] bg-white p-10 font-semibold">
      <div className="flex flex-col content-center items-center justify-center justify-items-center tracking-wide">
        <div className="mt-3">
          <ExclamationIcon color="#ff9c59" width={100} />
        </div>
        <div className="justify-center pb-10">
          <div className="mt-auto mb-2 flex items-center justify-start pt-5 pb-2">
            <div className="mr-6">
              <FaCheck size={32} color={"#74FA6D"} />
            </div>
            <p className="text-lg">You can see projects</p>
          </div>
          <div className="mt-auto flex w-full items-center justify-start pb-2">
            <div className="mr-6">
              <ImCross size={32} color={"FF7E5C"} />
            </div>
            <div>
              <p className="text-lg">{`Projects can't see you`}</p>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Button
            variant="primary"
            radius="default"
            size="md"
            onClick={onClickCompleteProfile}
          >
            Finish your profile
          </Button>
        </div>
      </div>
    </Card>
  );
};
