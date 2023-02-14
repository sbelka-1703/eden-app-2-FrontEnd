import { Button } from "@eden/package-ui";
import { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdEditCalendar } from "react-icons/md";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export interface ICalendarProps {
  label?: string;
  onlyMonthPicker?: boolean;
  onlyYearPicker?: boolean;
  timePicker?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (data: DateObject) => void;
  onOpen?: () => void;
  onClose?: () => void;
  minDate?: any; // new Date()
  maxDate?: any;
  numberOfMonths?: number;
  currentDate?: DateObject;
  buttonClassName?: string;
  containerClassName?: string;
}

export const Calendar = ({
  label,
  onlyMonthPicker,
  onlyYearPicker,
  timePicker,
  onChange,
  onOpen,
  onClose,
  minDate,
  maxDate,
  numberOfMonths,
  currentDate,
  buttonClassName,
  containerClassName,
}: ICalendarProps) => {
  const [inputValue, setInputValue] = useState("");
  const datePickerRef: any = useRef();

  const onSelectDate = (dateValue: DateObject) => {
    const dateAssign = dateValue?.toDate().toLocaleDateString().toString();

    setInputValue(dateAssign);
    if (onChange) {
      onChange(dateValue);
    }
  };

  const ButtonCal = () => {
    return (
      <Button
        className={buttonClassName}
        onClick={() => datePickerRef?.current?.openCalendar()}
        radius="pill"
      >
        <div className="flex flex-row content-center items-center justify-between p-1">
          <div className="mr-2">
            <MdEditCalendar color="#BCBCBC" />
          </div>
          {inputValue ? (
            <>
              <div className="font-light text-slate-600">{inputValue}</div>
              <div className="ml-2" onClick={() => setInputValue("")}>
                <AiFillCloseCircle />
              </div>
            </>
          ) : (
            <div className="font-light text-slate-400">{label}</div>
          )}
        </div>
      </Button>
    );
  };

  return (
    <div>
      <DatePicker
        containerClassName={containerClassName}
        onlyMonthPicker={onlyMonthPicker}
        onlyYearPicker={onlyYearPicker}
        className="green"
        ref={datePickerRef}
        render={<ButtonCal />}
        onChange={onSelectDate}
        minDate={minDate}
        numberOfMonths={numberOfMonths}
        currentDate={currentDate}
        maxDate={maxDate}
        onOpen={onOpen}
        onClose={onClose}
        plugins={
          timePicker ? [<TimePicker position="right" key="timepicker" />] : []
        }
      />
    </div>
  );
};
