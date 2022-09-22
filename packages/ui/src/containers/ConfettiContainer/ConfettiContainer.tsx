import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

export interface IConfettiContainerProps {
  children?: React.ReactNode;
}

export const ConfettiContainer = ({ children }: IConfettiContainerProps) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    setWidth(ref.current?.clientWidth || 0);
    // @ts-ignore
    setHeight(ref.current?.clientHeight || 0);
  }, []);

  return (
    <div className={`scrollbar-hide h-screen w-full overflow-hidden`} ref={ref}>
      {children}
      <Confetti width={width} height={height} />
    </div>
  );
};
