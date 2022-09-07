import { useState, useRef } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { Button } from "ui";
import { MdEditCalendar } from "react-icons/md";
export interface ICalendarProps {
  label?: string;
  onlyMonthPicker?: boolean;
  onlyYearPicker?: boolean;
  timePicker?: boolean;
  onChange?: (data: DateObject) => void;
  onOpen?: () => void;
  onClose?: () => void;
  minDate?: DateObject;
  maxDate?: DateObject;
  numberOfMonths?: number;
  currentDate?: DateObject;
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
}: ICalendarProps) => {
  const [inputValue, setInputValue] = useState("");
  const datePickerRef: any = useRef();

  const onSelectDate = (dateValue: DateObject) => {
    let dateAssign = dateValue?.toDate().toLocaleDateString().toString();
    setInputValue(dateAssign);
    if (onChange) {
      onChange(dateValue);
    }
  };

  const ButtonCal = () => {
    return (
      <Button
        onClick={() => datePickerRef?.current?.openCalendar()}
        radius="pill"
      >
        <div className="flex flex-row content-center items-center justify-between p-1">
          <div className="mr-2">
            <MdEditCalendar color="#BCBCBC" />
          </div>
          {inputValue ? (
            <div className="font-light text-slate-600">{inputValue}</div>
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
        plugins={timePicker ? [<TimePicker position="right" />] : []}
      />
    </div>
  );
};
