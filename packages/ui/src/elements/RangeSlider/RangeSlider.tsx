import "./styles.css";

import { TextLabel } from "@eden/package-ui";
import { useCallback, useEffect, useState } from "react";

export type RangeSliderProps = {
  max?: number;
  min?: number;
  step?: number;
  className?: string;
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
  className,
  showNumbers,
  disabled = false,
  defaultValue = 0,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleValue = useCallback(
    (val: number) => {
      if (val <= max) {
        setValue(val);
      }
    },
    [max]
  );

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={`${className} relative w-full`}>
      <input
        min={min}
        type="range"
        step={step}
        value={value}
        id="small-range"
        disabled={disabled}
        required={required}
        onChange={(e) => handleValue(+e.target.value)}
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
          {max < 100 && (
            <div
              className="pointer-events-none
              absolute
              z-10
              h-0.5
              w-full
              cursor-pointer
              bg-gray-400
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
              style={{
                top: "16px",
                left: max + "%",
                width: 100 - max + "%",
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RangeSlider;
