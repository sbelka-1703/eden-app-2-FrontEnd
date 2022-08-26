// import { useRouter } from "next/router";

export interface IAvailabilityCompProps {
  timePerWeek?: 10;
  seed?: 1700;
}

export const AvailabilityComp = ({
  timePerWeek,
  seed,
}: IAvailabilityCompProps) => {
  return (
    <div>
      <div className="text-lg font-semibold tracking-widest subpixel-antialiased">
        AVAILABILITY
      </div>
      <div className="my-2 mt-2 p-2 text-2xl">
        <div className={`flex flex-row p-1 font-normal tracking-wide`}>
          <div>⏳</div>
          <div>{`${timePerWeek} hrs\\week`}</div>
        </div>
        <div className={`flex flex-row p-1 font-normal tracking-wide`}>
          <div>💰</div>
          <div>{`${seed} $SEED`}</div>
        </div>
      </div>
    </div>
  );
};
