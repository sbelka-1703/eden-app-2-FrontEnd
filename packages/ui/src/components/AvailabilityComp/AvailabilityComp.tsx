export interface IAvailabilityCompProps {
  timePerWeek?: number;
  seed?: string;
}

export const AvailabilityComp = ({
  timePerWeek = 0,
  seed = "N/A",
}: IAvailabilityCompProps) => {
  return (
    <div>
      <div className="text-sm font-semibold tracking-widest subpixel-antialiased">
        AVAILABILITY
      </div>
      <div className="text-md mt-4">
        <div className={`flex flex-row font-normal tracking-wide`}>
          <span>⏳ {`${timePerWeek} hrs\\week`}</span>
        </div>
        <div className={`flex flex-row py-1 font-normal tracking-wide`}>
          <span>💰 {`${seed} $SEED`}</span>
        </div>
      </div>
    </div>
  );
};
