import { Members } from "@eden/package-graphql/generated";
import { Button } from "@eden/package-ui";
import { RiEmotionSadLine } from "react-icons/ri";

interface IEndorsementView4Props {
  member?: Members;
  onNext: () => void;
  onClose: () => void;
}

export const EndorsementView4 = ({
  //   member,
  onNext,
  onClose,
}: IEndorsementView4Props) => {
  return (
    <div>
      <div className={`flex flex-col text-center`}>
        <div className={`mx-auto`}>
          <RiEmotionSadLine
            className={`bg-soilBlue/40 h-32 w-32 rounded-full p-2 text-zinc-700`}
          />
        </div>
        <div className={`text-2xl font-medium text-neutral-800`}>
          {`Looks Like You Don't Have a Profile on Eden`}
        </div>
      </div>

      <div className={`my-8`}>
        <div>
          <span
            className={`bg-soilYellow/60 mx-auto my-2 flex justify-center rounded-full text-xl font-medium uppercase text-neutral-700`}
          >
            Join Eden Network to Post Your Endorsement
          </span>
        </div>

        <div
          className={`text-center font-medium uppercase text-zinc-600`}
        >{`we'll save this endorsement as a draft`}</div>
      </div>
      <div className={`flex w-full justify-center`}>
        <span
          className={`bg-soilYellow/50 flex flex-col rounded-full p-4 text-center text-lg font-semibold text-zinc-800`}
        >
          <span>Potential</span>
          <span>Reward</span>
          <span>
            $<span className={`text-3xl text-yellow-500`}>55</span>
          </span>
        </span>
      </div>

      <div className={`my-2 flex w-full justify-between`}>
        <Button type={`button`} onClick={onClose} className={`uppercase`}>
          {`exit & lose`}
          <span className={`ml-4 text-yellow-500`}>$55</span>
        </Button>
        <button
          type={`button`}
          onClick={onNext}
          className={`border-soilYellow rounded-md border-2 px-3 py-1 font-semibold uppercase text-zinc-800`}
        >
          create a profile
        </button>
      </div>
    </div>
  );
};
