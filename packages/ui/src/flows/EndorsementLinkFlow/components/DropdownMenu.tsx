import React, { useEffect } from "react";
import Select from "react-select";

type Option = {
  _id: string;
  name: string;
  node: string;
  selected: null;
  subNodes: [];
  __typename: string;
};

type Props = {
  options: Option[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (option: Option | null) => void;
};

const formatOptions = (options: Option[]) => {
  return options.map((option) => ({
    value: option._id,
    label: option.name,
  }));
};

export const DropdownMenu: React.FC<Props> = ({ options, onSelect }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const formattedOptions = formatOptions(options);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: 15,
      borderColor: state.isFocused ? "#4a5568" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 3px #cbd5e0" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#4a5568" : provided.borderColor,
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#cbd5e0" : provided.backgroundColor,
      "&:hover": {
        backgroundColor: "#cbd5e0",
      },
    }),
  };

  const handleSelect = (option: any) => {
    console.log("option", option);
    onSelect(option);
  };

  if (!isMounted) return null;
  return (
    <Select
      options={formattedOptions}
      isSearchable={true}
      styles={customStyles}
      placeholder="Select an Skill"
      onChange={handleSelect}
    />
  );
};

export default DropdownMenu;
