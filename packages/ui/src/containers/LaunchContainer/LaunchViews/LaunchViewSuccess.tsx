import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

export const LaunchViewSuccess = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    setWidth(ref.current?.clientWidth || 0);
    // @ts-ignore
    setHeight(ref.current?.clientHeight - 40 || 0);
  }, []);

  return (
    <div className={`h-full w-full`} ref={ref}>
      <div
        className={`text-darkGreen z-50 mt-56 text-center text-4xl font-bold`}
      >
        YOU DID IT!
      </div>
      <Confetti width={width} height={height} />
    </div>
  );
};
