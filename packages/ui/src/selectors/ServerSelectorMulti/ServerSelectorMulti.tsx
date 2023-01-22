import { UserContext } from "@eden/package-context";
import { ServerTemplate } from "@eden/package-graphql/generated";
import { Avatar, CommonServerAvatarList } from "@eden/package-ui";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import { Fragment, useContext, useEffect, useState } from "react";

export interface IServerSelectorMultiProps {
  disabled?: boolean;
  value?: string[];
  btnBGcolor?: string;
  defaultValues: ServerTemplate[];
  onChange?: React.Dispatch<React.SetStateAction<string[]>>;
  inputRef?: any; // TODO: fix this, need to use forwardRef
}

export const ServerSelectorMulti = ({
  disabled,
  value,
  btnBGcolor = "bg-gray-200",
  defaultValues,
  onChange,
  inputRef,
}: IServerSelectorMultiProps) => {
  const [selected, setSelected] = useState<Array<ServerTemplate>>(
    defaultValues || []
  );
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const { memberServers } = useContext(UserContext);

  const btnClasses = clsx(
    "relative flex justify-between items-center border border-gray-300 text-center cursor-pointer rounded-2xl py-1 px-3 shadow-lg hover:shadow-sm hover:border-gray-500 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm",
    btnBGcolor,
    {
      "border-green-500": isEmpty(selected),
    }
  );

  useEffect(() => {
    if (selected && selected.length > 0) {
      const ids = selected?.map((item: ServerTemplate) => item._id);

      onChange && onChange(ids as string[]);
      setSelectedId(ids as string[]);
    } else {
      onChange && onChange([]);
      setSelectedId([]);
    }
  }, [selected]);

  useEffect(() => {
    if (value && value.length > 0) {
      const selectedServers = memberServers?.filter((item) =>
        value.includes(item._id as string)
      );

      setSelected(selectedServers);
    }
  }, [value]);

  return (
    <div>
      <div className={`my-4 h-8`}>
        <CommonServerAvatarList size={`xs`} serverID={selectedId} />
      </div>
      <Listbox
        value={selected}
        multiple={true}
        disabled={disabled}
        onChange={setSelected}
      >
        <div className="relative mt-1">
          <Listbox.Button className={btnClasses} ref={inputRef}>
            <span className="mr-2 block truncate">Select Servers</span>
            <ChevronDownIcon width={12} />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="fixed z-50 mt-1 max-h-60 min-w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {memberServers &&
                memberServers.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-green-100 text-green-900" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <div
                          className={`flex truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          <Avatar
                            size={`xs`}
                            src={item.serverAvatar as string}
                          />
                          <div className={`my-auto ml-2`}>{item.name}</div>
                        </div>
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
