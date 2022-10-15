import "./styles.css";

import { TextLabel } from "@eden/package-ui";
import { useEffect, useState } from "react";

export type RangeSliderProps = {
  max?: number;
  min?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  showNumbers?: boolean;
  defaultValue?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (val: number) => void;
};

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  required,
  onChange,
  step = 1,
  max = 100,
  showNumbers,
  disabled = false,
  defaultValue = 0,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  return (
    <div className={`relative w-full`}>
      <input
        min={min}
        max={max}
        type="range"
        step={step}
        value={value}
        id="small-range"
        disabled={disabled}
        required={required}
        onChange={(e) => setValue(+e.target.value)}
        className="rangeSlider
        relative
        z-10
        mb-6 h-0.5
        w-full cursor-pointer
        rounded-lg
        bg-black
        before:absolute
        before:top-2/4
        before:left-0
        before:-z-10
        before:h-2
        before:w-2
        before:-translate-y-2/4
        before:rounded-full
        before:bg-inherit
        after:absolute
        after:top-2/4
        after:right-0
        after:-z-10
        after:h-2
        after:w-2
        after:-translate-y-2/4
        after:rounded-full
        after:bg-inherit"
      />
      {showNumbers && (
        <>
          <TextLabel className="absolute left-0 -top-1.5">0</TextLabel>
          <div
            className="absolute -top-3"
            style={{ left: value + "%", transform: `translateX(-${value}%)` }}
          >
            <TextLabel>{value}</TextLabel>
          </div>
          <TextLabel className="absolute right-0 -top-1.5">100</TextLabel>
        </>
      )}
    </div>
  );
};

export default RangeSlider;
