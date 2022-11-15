import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import { Fragment, useEffect, useState } from "react";

export type SelectBoxProps = {
  caption: string;
  items: string[];
  disabled?: boolean;
  multiple?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (items?: any) => void;
};

export const SelectBox = ({
  caption,
  items,
  multiple,
  disabled,
  onChange,
}: SelectBoxProps) => {
  const [selected, setSelected] = useState(multiple ? [] : "");

  const btnClasses = clsx(
    "relative flex justify-between items-center w-full border border-gray-300 text-center cursor-pointer rounded-2xl bg-gray-200 py-1 px-3 shadow-xl focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm",
    {
      "border-green-500": !isEmpty(selected),
    }
  );

  useEffect(() => {
    onChange && onChange(selected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div>
      <Listbox
        value={selected}
        multiple={multiple}
        disabled={disabled}
        onChange={setSelected}
      >
        <div className="relative mt-1">
          <Listbox.Button className={btnClasses}>
            <span className="mr-2 block truncate">{caption}</span>
            <ChevronDownIcon width={12} />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="fixed z-50 mt-1 max-h-60 min-w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, index) => (
                <Listbox.Option
                  key={item + index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-green-100 text-green-900" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectBox;
