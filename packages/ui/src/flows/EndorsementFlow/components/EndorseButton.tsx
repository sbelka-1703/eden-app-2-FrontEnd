import { BsCoin } from "react-icons/bs";

interface IEndorseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const EndorseButton = ({ ...props }: IEndorseButtonProps) => {
  return (
    <button
      {...props}
      className={`rounded-full border-2 bg-[#D7D7FF] py-1 px-4 font-semibold uppercase text-neutral-700 hover:shadow-sm hover:shadow-indigo-300`}
    >
      Endorse <BsCoin className={`ml-2 inline-block h-4 w-4 text-yellow-500`} />
    </button>
  );
};
