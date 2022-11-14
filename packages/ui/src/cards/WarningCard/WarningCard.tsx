import { Button, Card } from "@eden/package-ui";
import { ExclamationIcon } from "@heroicons/react/solid";

export interface WarningCardProps {
  profilePercentage: number | null | undefined;
  onClickCompleteProfile?: () => void;
}

export const WarningCard = ({
  profilePercentage,
  onClickCompleteProfile,
}: WarningCardProps) => {
  return (
    <Card
      shadow
      className=" h-full w-full border-[2px] bg-white p-10 font-semibold"
    >
      <div className="flex flex-col content-center items-center justify-center justify-items-center tracking-wide">
        <div className="text-lg">Give it a second thought!</div>
        <div className="mt-2 flex flex-col content-center items-center justify-center justify-items-center">
          <p>Please complete your profile</p>
          <p>{`We will not display it in Eden, unless it's 60% completed.`}</p>
        </div>
        <div className="mt-3">
          <ExclamationIcon color="#ff9c59" width={100} />
        </div>
        <div className="mt-2 text-slate-400">{`Your profile right now is at ${profilePercentage}%`}</div>
        <div className="mt-3">
          <Button
            variant="primary"
            radius="default"
            size="md"
            onClick={onClickCompleteProfile}
          >
            Finist your profile
          </Button>
        </div>
      </div>
    </Card>
  );
};
