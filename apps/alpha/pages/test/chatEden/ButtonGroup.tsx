type ButtonGroupProps = {
  selectedOption: string | null;
  // eslint-disable-next-line no-unused-vars
  handleButtonClick: (option: string) => void;
};

function ButtonGroup({ selectedOption, handleButtonClick }: ButtonGroupProps) {
  return (
    <div className="flex justify-center space-x-2">
      <button
        className={`${
          selectedOption === "option1"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } rounded-md px-2 py-1 font-medium shadow-sm focus:outline-none`}
        onClick={() => handleButtonClick("option1")}
      >
        AI 1.0 - Simple
      </button>
      <button
        className={`${
          selectedOption === "option2"
            ? "bg-green-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } rounded-md px-2 py-1 font-medium shadow-sm focus:outline-none`}
        onClick={() => handleButtonClick("option2")}
      >
        AI 2.0 - Sort,Long Memory
      </button>
      <button
        className={`${
          selectedOption === "option3"
            ? "bg-purple-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } rounded-md px-2 py-1 font-medium shadow-sm focus:outline-none`}
        onClick={() => handleButtonClick("option3")}
      >
        AI 3.0 - ChatGPT + Sort Memory
      </button>
    </div>
  );
}

export default ButtonGroup;
