import { Float } from "@headlessui-float/react";
import { FC, useRef, useState } from "react";

function useHover(delay = 150) {
  const [show, setShow] = useState(false);
  const timer = useRef<number | null>(null);

  function open() {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  function delayClose() {
    timer.current = setTimeout(() => {
      setShow(false);
    }, delay) as any;
  }

  return { show, setShow, timer, open, close, delayClose };
}
// Ref: https://headlessui-float.vercel.app/react/floatingui-options.html#placement

type PopoverOnHoverProps = {
  children: React.ReactNode;
  Content: () => JSX.Element;
  size?: "sm" | "md" | "lg";
  ubication?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
};

export const PopoverOnHover: FC<PopoverOnHoverProps> = ({
  children,
  Content,
  size = "md",
  ubication = "top",
}) => {
  const { show, open, delayClose } = useHover();

  return (
    <Float show={show} placement={ubication} offset={15} arrow={5}>
      <div
        className={`px-5 py-2 rounded-md`}
        onMouseEnter={open}
        onMouseLeave={delayClose}
      >
        {children}
      </div>

      <div
        className={`p-4 w-${
          size === "sm" ? "36" : size === "md" ? "48" : "80"
        } bg-white border border-gray-200 rounded-md shadow-lg`}
        onMouseEnter={open}
        onMouseLeave={delayClose}
      >
        <Float.Arrow className="absolute bg-white w-5 h-5 rotate-45 border border-gray-200" />

        <div className="relative h-full bg-white rounded-md overflow-hidden p-2">
          {<Content />}
        </div>
      </div>
    </Float>
  );
};
