export interface IAvailabilityCompProps {
  timePerWeek?: number;
  seed?: string;
}

export const AvailabilityComp = ({
  timePerWeek = 0,
  seed = "0",
}: IAvailabilityCompProps) => {
  return (
    <div>
      <div className="text-sm font-semibold tracking-widest subpixel-antialiased">
        AVAILABILITY
      </div>
      <div className="my-2 mt-2 p-2 text-xl">
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
