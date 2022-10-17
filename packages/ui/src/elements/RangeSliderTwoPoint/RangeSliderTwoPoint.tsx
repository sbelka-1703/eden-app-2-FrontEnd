import { Handles, Rail, Slider, Tracks } from "react-compound-slider";

export interface RangeSliderTwoPointProps {
  step?: number;
  values: number[];
  domain: number[];
  rootStyle?: React.CSSProperties;
  // eslint-disable-next-line no-unused-vars
  onUpdate?: ((values: readonly number[]) => void) | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange?: ((values: readonly number[]) => void) | undefined;
}

export const RangeSliderTwoPoint = ({
  domain,
  values,
  step = 1,
  onChange,
  onUpdate,
  rootStyle,
}: RangeSliderTwoPointProps) => {
  if (domain.length === 0) return <div />;

  return (
    <Slider
      mode={3}
      step={step}
      domain={domain}
      rootStyle={rootStyle}
      onUpdate={onUpdate}
      onChange={onChange}
      values={values}
    >
      <Rail>
        {({ getRailProps }) => {
          return (
            <>
              <div
                className={`absolute -top-3 h-6 w-full cursor-pointer`}
                {...getRailProps()}
              />
              <div
                className={`pointer-events-none absolute h-0.5 w-full bg-black`}
              />
            </>
          );
        }}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle) => (
              <div
                key={handle.id}
                role="slider"
                aria-valuemin={domain[0]}
                aria-valuemax={domain[1]}
                aria-valuenow={handle.value}
                style={{ left: `${handle.percent}%` }}
                className={`absolute z-10 -ml-1 -mt-1.5 h-3 w-3 cursor-pointer rounded-full bg-black`}
                {...getHandleProps(handle.id)}
              />
            ))}
          </div>
        )}
      </Handles>
      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div className="slider-tracks">
            {tracks.map(({ id, source, target }) => (
              <div key={id}>
                <div
                  className={`pointer-events-none absolute z-10 h-0.5 bg-black`}
                  style={{
                    left: `${source.percent}%`,
                    width: `${target.percent - source.percent}%`,
                  }}
                />
                <div
                  className={`absolute -top-1.5 h-3 cursor-pointer`}
                  style={{
                    left: `${source.percent}%`,
                    width: `${target.percent - source.percent}%`,
                  }}
                  {...getTrackProps()}
                />
              </div>
            ))}
          </div>
        )}
      </Tracks>
    </Slider>
  );
};
