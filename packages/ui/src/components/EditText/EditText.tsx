import { useEffect, useRef, useState } from "react";

// import { useOutsideAlerter } from "../../../utils/useOutsideAlerter";

export interface IEditTextProps {
  text: string;
  idx?: number;
  setter?: any;
  onClick?: any;
  questions?: string[];
  onEnter: any;
  // isActive?: boolean
  width?: string;
  placeholder?: string;
  refreshInputOnEnter?: boolean;
}

export const EditText = ({
  text,
  idx,
  setter = () => {
    console.log("empty");
  },
  onClick,
  questions,
  onEnter,
  width = "11/12",
  placeholder = "Type your question here.",
  refreshInputOnEnter = false,
}: IEditTextProps) => {
  const editTextRef = useRef<HTMLInputElement>(null);
  // const [disabled, setDisabled] = useState<boolean>(isActive ? true : false);
  const [inputMessage, setInputMessage] = useState(text);

  // const SetDisabled = () => {
  //     console.log("elements/edit text: running SetDisabled()")
  //     if (disabled) setDisabled(false);
  //     else setDisabled(true);
  // }

  // const onClickOutsideActiveField = () => {
  //     onEnter(editTextRef.current!.value, idx)
  //     SetDisabled()
  // }

  // useOutsideAlerter(editTextRef, !disabled, onClickOutsideActiveField);

  // useEffect(() => {
  //     console.log(`ELEMENTS/EDIT TEXT: updated disabled. disabled = ${disabled}`)
  // }, [disabled])

  useEffect(() => {
    console.log(`ELEMENTS/EDIT TEXT: updated questions.`);
    console.log(questions);
  }, [JSON.stringify(questions)]);

  return (
    <input
      ref={editTextRef}
      onClick={onClick}
      className={`w-${width} rounded-3xl border border-solid border-black bg-transparent px-4 py-2 hover:cursor-pointer`}
      // readOnly={disabled}
      placeholder={placeholder}
      type="text"
      value={inputMessage}
      onChange={(e: any) => setInputMessage(e.target.value)}
      onKeyUp={(e) => {
        if (e.code == "Enter") {
          onEnter(inputMessage, idx, setter);
          if (refreshInputOnEnter) setInputMessage("");
        }
      }}
      // onClick={(e) => {
      //     console.log("IVE BEEN CLICKED.")
      //     console.log(e)
      //     SetDisabled()
      // }}
    />
  );
};
