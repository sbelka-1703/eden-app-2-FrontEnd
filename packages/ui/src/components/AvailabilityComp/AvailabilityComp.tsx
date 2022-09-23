export interface IAvailabilityCompProps {
  timePerWeek?: number;
  seed?: string;
}

export const AvailabilityComp = ({
  timePerWeek = 0,
}: // seed = "0",
IAvailabilityCompProps) => {
  return (
    <div>
      <div className="text-sm font-semibold tracking-widest subpixel-antialiased">
        AVAILABILITY
      </div>
      <div className="text-md mt-4">
        <div className={`flex flex-row font-normal tracking-wide`}>
          <span>⏳ {`${timePerWeek} hrs\\week`}</span>
        </div>
        {/* <div className={`flex flex-row p-1 font-normal tracking-wide`}>
          <div>💰</div>
          <div>{`${seed} $SEED`}</div>
        </div> */}
      </div>
    </div>
  );
};
