export interface IAvailabilityCompProps {
  timePerWeek?: number;
  seed?: string;
}

export const AvailabilityComp = ({
  timePerWeek,
  seed,
}: IAvailabilityCompProps) => {
  return (
    <div>
      <div className="text-sm font-semibold tracking-widest subpixel-antialiased">
        AVAILABILITY
      </div>
      <div className="text-md mt-4">
        <div className={`flex flex-row font-normal tracking-wide`}>
          <span>
            ⏳ {timePerWeek ? `${timePerWeek} hrs\\week` : "unavailable"}
          </span>
        </div>
        <div className={`flex flex-row py-1 font-normal tracking-wide`}>
          <span>💰 {seed ? `${seed} $SEED` : "N/A"}</span>
        </div>
      </div>
    </div>
  );
};
